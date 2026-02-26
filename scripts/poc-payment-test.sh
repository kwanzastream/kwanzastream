#!/bin/bash
# ============================================================
# PoC Payment Flow — Kwanza Stream
# ============================================================
# Simulates the full payment flow: deposit → webhook → balance update
# Run with: bash scripts/poc-payment-test.sh
# ============================================================

BASE_URL="${API_URL:-http://localhost:5000}"
WEBHOOK_SECRET="${MULTICAIXA_WEBHOOK_SECRET:-dev-webhook-secret-change-in-production}"

echo "🏦 Kwanza Stream — PoC Payment Test"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "API: $BASE_URL"
echo ""

# ---- Step 1: Login (get a token) ----
echo "📱 Step 1: Request OTP..."
OTP_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/request-otp" \
  -H "Content-Type: application/json" \
  -d '{"phone": "+244911111111"}')
echo "Response: $OTP_RESPONSE"

# In dev mode, the OTP code is returned in the response
OTP_CODE=$(echo "$OTP_RESPONSE" | grep -o '"code":"[^"]*"' | cut -d'"' -f4)
echo "OTP Code: $OTP_CODE"
echo ""

echo "🔐 Step 2: Verify OTP..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/verify-otp" \
  -H "Content-Type: application/json" \
  -d "{\"phone\": \"+244911111111\", \"code\": \"$OTP_CODE\"}")
echo "Response: $LOGIN_RESPONSE"

TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"accessToken":"[^"]*"' | cut -d'"' -f4)
echo "Token: ${TOKEN:0:20}..."
echo ""

# ---- Step 2: Check initial balance ----
echo "💰 Step 3: Check initial balance..."
WALLET=$(curl -s -X GET "$BASE_URL/api/wallet" \
  -H "Authorization: Bearer $TOKEN")
echo "Wallet: $WALLET"
echo ""

# ---- Step 3: Request deposit ----
echo "📥 Step 4: Request deposit (1000 Kz via multicaixa)..."
DEPOSIT=$(curl -s -X POST "$BASE_URL/api/wallet/deposit" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"amount": 1000, "paymentMethod": "multicaixa"}')
echo "Deposit: $DEPOSIT"

REFERENCE=$(echo "$DEPOSIT" | grep -o '"reference":"[^"]*"' | cut -d'"' -f4)
echo "Reference: $REFERENCE"
echo ""

# ---- Step 4: Simulate webhook (signed) ----
echo "🔔 Step 5: Simulate signed webhook callback..."
WEBHOOK_PAYLOAD="{\"transaction_id\":\"MCX-TEST-$(date +%s)\",\"reference\":\"$REFERENCE\",\"status\":\"COMPLETED\",\"amount\":1000}"
SIGNATURE=$(echo -n "$WEBHOOK_PAYLOAD" | openssl dgst -sha256 -hmac "$WEBHOOK_SECRET" | awk '{print $2}')

echo "Payload: $WEBHOOK_PAYLOAD"
echo "HMAC: $SIGNATURE"

WEBHOOK_RESULT=$(curl -s -X POST "$BASE_URL/api/webhooks/multicaixa" \
  -H "Content-Type: application/json" \
  -H "x-multicaixa-signature: $SIGNATURE" \
  -d "$WEBHOOK_PAYLOAD")
echo "Webhook: $WEBHOOK_RESULT"
echo ""

# ---- Step 5: Check updated balance ----
echo "💰 Step 6: Check updated balance..."
WALLET_AFTER=$(curl -s -X GET "$BASE_URL/api/wallet" \
  -H "Authorization: Bearer $TOKEN")
echo "Wallet: $WALLET_AFTER"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ PoC Payment Flow complete!"
echo ""
echo "Expected: Balance should have increased by 1000 Kz (100000 centimos)"
echo ""
echo "To test HMAC rejection, try without signature:"
echo "  curl -X POST $BASE_URL/api/webhooks/multicaixa -H 'Content-Type: application/json' -d '{\"reference\":\"test\"}'"
echo "Expected: 401 Invalid signature"
