"""TC006 — POST /api/auth/reset-password with valid token (dev mode)"""
import requests
import time
import random
import os

BASE_URL = os.getenv("API_URL", "http://localhost:5000")
TIMEOUT = 10

def test_postapiauthresetpasswordwithvalidtoken():
    ts = int(time.time())
    rnd = random.randint(1000, 9999)
    email = f"test_{ts}_{rnd}@kwanzastream.com"
    initial_password = "OldPass123"
    new_password = "NewPass456"

    # 1. Register user
    reg_resp = requests.post(f"{BASE_URL}/api/auth/register", json={
        "email": email,
        "phone": f"+244{random.randint(900000000, 999999999)}",
        "username": f"tester_{ts}_{rnd}",
        "password": initial_password
    }, timeout=TIMEOUT)
    assert reg_resp.status_code == 201, f"Register failed: {reg_resp.status_code}: {reg_resp.text}"

    # 2. Request password reset — in dev mode, response includes debugResetToken
    reset_req = requests.post(f"{BASE_URL}/api/auth/request-password-reset",
                              json={"email": email}, timeout=TIMEOUT)
    assert reset_req.status_code == 200, f"Request reset failed: {reset_req.status_code}: {reset_req.text}"
    reset_json = reset_req.json()

    debug_token = reset_json.get("debugResetToken")
    if not debug_token:
        # Not in development mode — skip test gracefully
        print("SKIP: debugResetToken not available (not development mode)")
        return

    # 3. Reset password using the debug token
    reset_resp = requests.post(f"{BASE_URL}/api/auth/reset-password", json={
        "token": debug_token,
        "password": new_password
    }, timeout=TIMEOUT)
    assert reset_resp.status_code == 200, f"Reset password failed: {reset_resp.status_code}: {reset_resp.text}"

    # 4. Verify login with new password works
    login_resp = requests.post(f"{BASE_URL}/api/auth/login", json={
        "identifier": email,
        "password": new_password
    }, timeout=TIMEOUT)
    assert login_resp.status_code == 200, f"Login with new password failed: {login_resp.status_code}: {login_resp.text}"
    assert login_resp.json().get("success") is True

if __name__ == "__main__":
    test_postapiauthresetpasswordwithvalidtoken()
