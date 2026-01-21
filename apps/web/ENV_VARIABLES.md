# Variáveis de Ambiente Necessárias

Configure as seguintes variáveis no arquivo `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=SEU_ANON_KEY

# ⚠️ Service Role Key só no backend. Nunca use no frontend.
SUPABASE_SERVICE_ROLE_KEY=SEU_SERVICE_ROLE_KEY

# Site URL (opcional)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Streaming Server (opcional)
NEXT_PUBLIC_STREAMING_SERVER=stream.kwanzastream.ao
```

## Como obter as chaves do Supabase

1. Acesse o [Dashboard do Supabase](https://app.supabase.com)
2. Selecione seu projeto
3. Vá em **Settings** > **API**
4. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ NUNCA exponha no frontend)

## Importante

- `SUPABASE_SERVICE_ROLE_KEY` deve ser usado APENAS em API routes (backend)
- Nunca exponha a Service Role Key no código do frontend
- Adicione `.env.local` ao `.gitignore` para não commitar credenciais
