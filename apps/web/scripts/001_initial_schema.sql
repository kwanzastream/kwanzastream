-- Kwanza Stream Database Schema
-- Initial setup with all core tables

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  province TEXT, -- Luanda, Benguela, Huambo, etc.
  is_creator BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  is_suspended BOOLEAN DEFAULT false,
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  total_earnings DECIMAL(15,2) DEFAULT 0,
  total_spent DECIMAL(15,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- Creator Profile
CREATE TABLE IF NOT EXISTS public.creator_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  bio TEXT,
  category TEXT, -- Gaming, Música, Comédia, Educação
  monthly_earnings DECIMAL(15,2) DEFAULT 0,
  total_viewers INTEGER DEFAULT 0,
  avg_viewers INTEGER DEFAULT 0,
  verification_status TEXT DEFAULT 'pending', -- pending, verified, rejected
  bank_account TEXT,
  bank_name TEXT,
  payment_method TEXT, -- multicaixa, unitel_money, bank
  go_live_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- User Followers
CREATE TABLE IF NOT EXISTS public.followers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- ============================================
-- WALLET & PAYMENTS
-- ============================================

CREATE TABLE IF NOT EXISTS public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  balance DECIMAL(15,2) DEFAULT 0,
  total_earned DECIMAL(15,2) DEFAULT 0,
  total_spent DECIMAL(15,2) DEFAULT 0,
  currency TEXT DEFAULT 'KZ',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Transactions
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_id UUID NOT NULL REFERENCES public.wallets(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- income, expense, deposit, withdrawal, refund
  description TEXT,
  amount DECIMAL(15,2) NOT NULL,
  reference_id TEXT, -- salo_id, stream_id, etc.
  status TEXT DEFAULT 'completed', -- pending, completed, failed, cancelled
  payment_method TEXT, -- multicaixa, unitel_money, bank, salo
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- STREAMING
-- ============================================

CREATE TABLE IF NOT EXISTS public.streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- Gaming, Música, Comédia, etc.
  thumbnail_url TEXT,
  stream_key TEXT UNIQUE,
  rtmp_url TEXT,
  hls_url TEXT,
  status TEXT DEFAULT 'offline', -- offline, live, ended
  mode TEXT DEFAULT 'video', -- video, radio
  viewer_count INTEGER DEFAULT 0,
  peak_viewers INTEGER DEFAULT 0,
  total_earned DECIMAL(15,2) DEFAULT 0,
  duration_minutes INTEGER DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Stream Analytics
CREATE TABLE IF NOT EXISTS public.stream_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stream_id UUID NOT NULL REFERENCES public.streams(id) ON DELETE CASCADE,
  minute_index INTEGER,
  viewer_count INTEGER DEFAULT 0,
  new_viewers INTEGER DEFAULT 0,
  revenue DECIMAL(15,2) DEFAULT 0,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- SALO SYSTEM (Virtual Gifts)
-- ============================================

CREATE TABLE IF NOT EXISTS public.salo_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE, -- Pãozinho, Gasosa, Cerveja, Rei
  emoji TEXT,
  price DECIMAL(15,2) NOT NULL,
  color TEXT, -- hex color
  tier INTEGER NOT NULL, -- 1-4
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Salos Sent
CREATE TABLE IF NOT EXISTS public.salos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salo_type_id UUID NOT NULL REFERENCES public.salo_types(id),
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  stream_id UUID NOT NULL REFERENCES public.streams(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  total_amount DECIMAL(15,2) NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Salo Rankings
CREATE TABLE IF NOT EXISTS public.salo_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stream_id UUID NOT NULL REFERENCES public.streams(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  total_spent DECIMAL(15,2) DEFAULT 0,
  salo_count INTEGER DEFAULT 0,
  rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(stream_id, sender_id)
);

-- ============================================
-- CHAT & MESSAGING
-- ============================================

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stream_id UUID NOT NULL REFERENCES public.streams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT false,
  is_deleted BOOLEAN DEFAULT false,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- CONTENT & POSTS
-- ============================================

CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  image_urls TEXT[],
  video_url TEXT,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Post Likes
CREATE TABLE IF NOT EXISTS public.post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Post Comments
CREATE TABLE IF NOT EXISTS public.post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- MODERATION & REPORTS
-- ============================================

CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  stream_id UUID REFERENCES public.streams(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  message_id UUID REFERENCES public.chat_messages(id) ON DELETE CASCADE,
  reason TEXT NOT NULL, -- harassment, spam, illegal, explicit, etc.
  description TEXT,
  status TEXT DEFAULT 'pending', -- pending, reviewing, resolved, dismissed
  action_taken TEXT, -- warning, suspend, ban, none
  moderator_id UUID REFERENCES public.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- salo, live, follow, comment, like, milestone
  title TEXT,
  message TEXT,
  actor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  related_stream_id UUID REFERENCES public.streams(id) ON DELETE SET NULL,
  related_post_id UUID REFERENCES public.posts(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- ADMIN & SETTINGS
-- ============================================

CREATE TABLE IF NOT EXISTS public.admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID NOT NULL REFERENCES public.users(id),
  action TEXT NOT NULL,
  target_type TEXT, -- user, stream, post, report, etc.
  target_id TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.platform_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  updated_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_is_creator ON public.users(is_creator);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_streams_creator_id ON public.streams(creator_id);
CREATE INDEX IF NOT EXISTS idx_streams_status ON public.streams(status);
CREATE INDEX IF NOT EXISTS idx_streams_started_at ON public.streams(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_streams_category ON public.streams(category);

CREATE INDEX IF NOT EXISTS idx_followers_follower ON public.followers(follower_id);
CREATE INDEX IF NOT EXISTS idx_followers_following ON public.followers(following_id);

CREATE INDEX IF NOT EXISTS idx_transactions_wallet ON public.transactions(wallet_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON public.transactions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_chat_messages_stream ON public.chat_messages(stream_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user ON public.chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_posts_creator ON public.posts(creator_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_salos_stream ON public.salos(stream_id);
CREATE INDEX IF NOT EXISTS idx_salos_sender ON public.salos(sender_id);
CREATE INDEX IF NOT EXISTS idx_salos_created_at ON public.salos(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(is_read);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Users can view public user profiles
CREATE POLICY "Users can view public profiles" ON public.users
  FOR SELECT USING (
    NOT is_suspended OR auth.uid() = id OR 
    EXISTS(SELECT 1 FROM public.users WHERE id = auth.uid() AND is_creator = true)
  );

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Wallets are private
CREATE POLICY "Wallets are private" ON public.wallets
  FOR SELECT USING (auth.uid() = user_id);

-- Chat messages are readable in streams
CREATE POLICY "Chat messages are readable" ON public.chat_messages
  FOR SELECT USING (true);

-- Users can insert their own messages
CREATE POLICY "Users can insert own messages" ON public.chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Notifications are private
CREATE POLICY "Notifications are private" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- INSERT DEFAULT SALO TYPES
-- ============================================

INSERT INTO public.salo_types (name, emoji, price, color, tier, description) VALUES
  ('Pãozinho', '🍞', 50, '#FFD700', 1, 'Apoio inicial - Pãozinho de apoio'),
  ('Gasosa', '🥤', 500, '#FF6B6B', 2, 'Apoio forte - Gasosa gelada'),
  ('Cerveja', '🍺', 2000, '#FFA500', 3, 'Grande apoio - Cerveja Premium'),
  ('Rei', '👑', 20000, '#FFD700', 4, 'Apoio máximo - Rei da Noite')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- COMMIT & DONE
-- ============================================

COMMIT;
