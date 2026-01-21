-- Função Postgres para transações SALO atômicas
-- Execute este script no Supabase SQL Editor
-- 
-- Esta função garante atomicidade financeira ao processar transações SALO
-- Debitando do sender, creditando no receiver e registrando a transação
-- em uma única operação transacional.

create or replace function send_salo(
  sender_id uuid,
  receiver_id uuid,
  stream_id uuid,
  amount numeric,
  platform_fee numeric,
  creator_amount numeric
)
returns void
language plpgsql
as $$
declare
  sender_wallet_id uuid;
  receiver_wallet_id uuid;
begin
  -- Obter wallet IDs
  select id into sender_wallet_id from wallets where user_id = sender_id;
  select id into receiver_wallet_id from wallets where user_id = receiver_id;

  -- Debitar do sender
  update wallets
  set balance = balance - amount,
      total_spent = total_spent + amount,
      updated_at = now()
  where user_id = sender_id;

  -- Creditar para receiver
  update wallets
  set balance = balance + creator_amount,
      total_earned = total_earned + creator_amount,
      updated_at = now()
  where user_id = receiver_id;

  -- Registrar transação do sender (debit)
  insert into transactions (
    wallet_id,
    type,
    description,
    amount,
    reference_id,
    status,
    payment_method,
    metadata,
    created_at
  ) values (
    sender_wallet_id,
    'expense',
    'Salo enviado',
    amount,
    stream_id::text,
    'completed',
    'salo',
    jsonb_build_object(
      'receiver_id', receiver_id,
      'stream_id', stream_id,
      'platform_fee', platform_fee,
      'creator_amount', creator_amount
    ),
    now()
  );

  -- Registrar transação do receiver (credit)
  insert into transactions (
    wallet_id,
    type,
    description,
    amount,
    reference_id,
    status,
    payment_method,
    metadata,
    created_at
  ) values (
    receiver_wallet_id,
    'income',
    'Salo recebido',
    creator_amount,
    stream_id::text,
    'completed',
    'salo',
    jsonb_build_object(
      'sender_id', sender_id,
      'stream_id', stream_id,
      'platform_fee', platform_fee,
      'total_amount', amount
    ),
    now()
  );
end;
$$;
