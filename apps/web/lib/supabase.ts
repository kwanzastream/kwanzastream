import { createClient } from '@supabase/supabase-js'

// Cliente backend com SERVICE_ROLE_KEY (só para API routes)
// ⚠️ Service Role Key só no backend. Nunca use no frontend.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Cliente frontend (para uso em componentes React)
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
