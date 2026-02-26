# 📹 Streaming Technical Plan — Kwanza Stream

## Current State
- **Technology:** `node-media-server` v2.6 (RTMP → HLS via FFmpeg)
- **Limitations:** Single instance, no CDN, no ABR, no VOD/recording, `allow_origin: '*'`

---

## Option A: Managed CDN (Cloudflare Stream / Mux)

### Cloudflare Stream
| Item | Detail |
|------|--------|
| Ingress | RTMP or WebRTC push |
| Encoding | Auto-transcoding + ABR (multiple qualities) |
| CDN | Global Cloudflare network (~300 PoPs) |
| VOD | Automatic recording, ~$5/1000 mins stored |
| Pricing | $1/1000 min encoding + $1/1000 min delivered |
| Latency | ~10s HLS, ~1s WebRTC (LL-HLS) |
| Angola CDN PoP | Yes (Luanda) |

### Mux
| Item | Detail |
|------|--------|
| Ingress | RTMP, SRT, WebRTC |
| Encoding | Auto-ABR, per-title encoding |
| Pricing | $0.00125/sec encoding + $0.00025/sec delivery |
| VOD | Built-in asset management |
| Latency | ~10s HLS, ~3s low-latency HLS |

### Cost Estimate (Managed)
| Scenario | Monthly Cost (Cloudflare) | Monthly Cost (Mux) |
|----------|--------------------------|---------------------|
| 10 streamers, 100 viewers, 4h/day | ~$75 | ~$55 |
| 50 streamers, 1000 viewers, 6h/day | ~$900 | ~$680 |
| 100 streamers, 10000 viewers, 8h/day | ~$8,500 | ~$6,400 |

### Pros
- ✅ Zero ops overhead for streaming infrastructure
- ✅ Global CDN with Angola PoP (low latency)
- ✅ ABR, VOD, clips out of the box
- ✅ Scales to 100K+ concurrent without config changes

### Cons
- ❌ Recurring cost scales with usage
- ❌ Vendor lock-in (API-specific integration)
- ❌ Less control over encoding parameters

---

## Option B: Self-Hosted + Object Storage

### Architecture
```
OBS → RTMP Ingest (nginx-rtmp or MediaMTX)
         ↓
    FFmpeg transcoding (ABR: 360p, 720p, 1080p)
         ↓
    HLS segments → Object Storage (Cloudflare R2 / S3)
         ↓
    CDN (Cloudflare CDN free tier / BunnyCDN)
         ↓
    Client (hls.js)
```

### Cost Estimate (Self-Hosted)
| Item | Monthly Cost |
|------|-------------|
| VPS for ingest (4 vCPU, 8GB RAM) | $40-80 |
| Cloudflare R2 storage (1TB) | $15 |
| Cloudflare CDN (free tier w/ R2) | $0 |
| BunnyCDN (if needed, ~$10/TB) | $10-50 |
| **Total for small scale** | **$65-145** |

### Pros
- ✅ Lower cost at small scale
- ✅ Full control over encoding/quality
- ✅ No vendor lock-in

### Cons
- ❌ Significant ops overhead (FFmpeg, storage, monitoring)
- ❌ Manual horizontal scaling (need load balancer + multiple ingest nodes)
- ❌ Must build VOD/clips/ABR yourself
- ❌ No Angola-specific PoP unless using Cloudflare CDN

---

## Recommendation

**Phase 1 (MVP):** Cloudflare Stream. Minimal integration effort (~2-3 days), immediate global CDN, ABR, and VOD. Cost is manageable at MVP scale ($75-200/month).

**Phase 2 (Scale):** If monthly streaming costs exceed $2,000, evaluate hybrid: self-hosted ingest with CDN-only delivery via R2 + Cloudflare CDN.

### Migration Steps from `node-media-server`
1. Replace `mediaServer.ts` with Cloudflare Stream API client
2. On `prePublish`: create Cloudflare live input, return RTMP URL to streamer
3. On `donePublish`: signal end, Cloudflare auto-creates VOD asset
4. Frontend: swap HLS URL from `localhost:8000` to Cloudflare Stream URL
5. Remove FFmpeg dependency from server
