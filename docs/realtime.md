# Socket.io Realtime Contract — Kwanza Stream

> **Source of truth:** `packages/shared-types/events.ts`

---

## Room Naming Convention

| Room Pattern | Description | Example |
|-------------|-------------|---------|
| `stream:{id}` | All events for a specific stream (chat, donations, viewers) | `stream:abc-123` |
| `user:{id}` | Private events for a specific user (notifications) | `user:def-456` |
| `global` | Platform-wide events (new streams going live) | `global` |

## Events

### Client → Server

| Event | Room | Payload | Rate Limit |
|-------|------|---------|------------|
| `chat:message` | `stream:{id}` | `{ message: string }` | 20/min |
| `chat:reaction` | `stream:{id}` | `{ emoji: string }` | 2/sec |
| `chat:typing` | `stream:{id}` | `{}` | 1/3sec |
| `viewer:join` | `stream:{id}` | `{}` | — |
| `viewer:leave` | `stream:{id}` | `{}` | — |

### Server → Client (Broadcast)

| Event | Room | Payload | Trigger |
|-------|------|---------|---------|
| `chat:message` | `stream:{id}` | `ChatMessagePayload` | User sends message |
| `chat:reaction` | `stream:{id}` | `ChatReactionPayload` | User reacts |
| `donation:alert` | `stream:{id}` | `DonationAlertPayload` | Salo donated |
| `viewer:count` | `stream:{id}` | `{ count, peakCount }` | Viewer joins/leaves |
| `chat:slow_mode` | `stream:{id}` | `{ enabled, intervalSeconds }` | Moderator toggles |
| `chat:user_banned` | `stream:{id}` | `{ userId, reason }` | Moderator bans |
| `stream:start` | `global` | `StreamStartPayload` | Streamer goes live |
| `stream:end` | `global` | `StreamEndPayload` | Stream ends |

### Server → Client (Private)

| Event | Room | Payload | Trigger |
|-------|------|---------|---------|
| `notification:new` | `user:{id}` | `NotificationPayload` | Any notification |
| `notification:count` | `user:{id}` | `{ unreadCount }` | Count changes |

## Rate Limiting (Server-Enforced)

| Event | Limit | Window | Method |
|-------|-------|--------|--------|
| `chat:message` | 20 messages | 60 seconds | Redis sliding window |
| `chat:reaction` | 2 reactions | 1 second | In-memory counter |
| `chat:typing` | 1 event | 3 seconds | In-memory throttle |

## Authentication

Socket.io connections are authenticated via httpOnly cookies. The server verifies the `access_token` cookie on connection and extracts the user identity.

```typescript
// Client-side setup
import { io } from 'socket.io-client';

const socket = io(API_URL, {
    withCredentials: true,  // sends cookies
    transports: ['websocket', 'polling'],
});
```

## Anti-Spam

1. **Message dedup:** Server maintains 5s window for duplicate message detection
2. **Rate limit response:** Client receives `error` event with `code: 'RATE_LIMITED'`
3. **Auto-timeout:** User exceeding rate limits 3x gets 60s timeout
4. **Banned users:** Cannot send messages; receive `chat:user_banned` event
