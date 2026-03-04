# Runbook: Degradação de Stream

> **Severidade:** ALTA  
> **On-call:** DevOps / Content Moderator  
> **SLA:** Resolução em 30min

---

## Sintomas
- Viewers reportam buffering excessivo
- Stream congela/pixela intermitentemente
- Painel admin mostra `viewerCount` a cair rapidamente
- RTMP server não aceita novas conexões

## Diagnóstico

### 1. Verificar RTMP server
```bash
# Verificar se o processo está activo
curl http://localhost:5000/api/health/detailed

# Verificar streams activas
curl http://localhost:8000/api/streams # node-media-server admin
```

### 2. Verificar métricas do servidor
```bash
# CPU e memória
top -p $(pgrep -f "node dist/index")

# Conexões de rede activas
netstat -an | grep :1935 | wc -l  # RTMP connections
netstat -an | grep :5000 | wc -l  # API connections
```

### 3. Verificar Cloudflare Stream (se migrado)
```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/stream" \
  -H "Authorization: Bearer $CF_API_TOKEN"
```

### 4. Verificar Socket.io
```bash
# Número de conexões WebSocket activas (via Redis)
redis-cli keys "socket.io:*" | wc -l
```

## Resolução por Cenário

### A: RTMP server sobrecarregado
1. Verificar número de streams simultâneos
2. Se > 10 streams em servidor single-instance:
   - Limitar novas streams temporariamente
   - Notificar streamers via `notification:new` event
3. Considerar escalar horizontalmente (k8s HPA)

### B: Bandwidth insuficiente
1. Reduzir qualidade de transcoding:
   ```env
   # Reduzir bitrate no .env
   RTMP_TRANS_BITRATE=1500k  # era 2500k
   ```
2. Activar modo "low bandwidth" para viewers:
   - Forçar resolução 480p como default

### C: Stream específica a causar problemas
```bash
# Identificar stream problemática
curl http://localhost:8000/api/streams | jq '.[] | select(.bitrate > 5000000)'
```

Acções:
1. Contactar streamer para reduzir bitrate
2. Se recusar: `POST /api/admin/streams/{id}/end` com motivo

### D: Socket.io connection storm
```bash
# Redis: verificar taxa de eventos
redis-cli monitor | head -100
```

Se >1000 msg/seg por sala:
1. Activar slow mode no chat: e emitir `chat:slow_mode` event
2. Aumentar rate limit temporariamente no Redis

## Mitigação Rápida
```bash
# Reiniciar apenas o media server (sem afectar API)
# Se PM2:
pm2 restart media-server

# Se Docker:
docker restart kwanza-media-server
```

## Pós-Incidente
- [ ] Rever logs do RTMP server
- [ ] Verificar se transcoding está optimizado
- [ ] Avaliar necessidade de CDN para HLS segments
- [ ] Documentar métricas de pico para capacity planning
