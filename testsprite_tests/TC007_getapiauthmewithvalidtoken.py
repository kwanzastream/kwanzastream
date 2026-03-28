"""TC007 — GET /api/auth/me with valid token"""
import requests
import time
import random
import os

BASE_URL = os.getenv("API_URL", "http://localhost:5000")
TIMEOUT = 10

def _register_and_login():
    ts = int(time.time())
    rnd = random.randint(1000, 9999)
    email = f"test_{ts}_{rnd}@kwanzastream.com"
    password = "ValidPass123"
    payload = {
        "email": email,
        "phone": f"+244{random.randint(900000000, 999999999)}",
        "username": f"tester_{ts}_{rnd}",
        "password": password
    }
    r = requests.post(f"{BASE_URL}/api/auth/register", json=payload, timeout=TIMEOUT)
    assert r.status_code == 201, f"Register failed: {r.status_code}: {r.text}"

    r2 = requests.post(f"{BASE_URL}/api/auth/login", json={"identifier": email, "password": password}, timeout=TIMEOUT)
    assert r2.status_code == 200, f"Login failed: {r2.status_code}: {r2.text}"
    login_data = r2.json()["data"]
    return email, login_data

def test_getapiauthmewithvalidtoken():
    email, login_data = _register_and_login()
    access_token = login_data["accessToken"]

    resp = requests.get(
        f"{BASE_URL}/api/auth/me",
        headers={"Authorization": f"Bearer {access_token}"},
        timeout=TIMEOUT
    )
    assert resp.status_code == 200, f"Esperado 200, recebeu {resp.status_code}: {resp.text}"
    resp_json = resp.json()
    assert "user" in resp_json, f"Missing 'user' in response: {resp_json}"
    user = resp_json["user"]
    assert isinstance(user, dict)
    assert user.get("email") == email

if __name__ == "__main__":
    test_getapiauthmewithvalidtoken()
