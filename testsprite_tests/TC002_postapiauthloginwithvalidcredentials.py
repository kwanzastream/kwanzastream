"""TC002 — POST /api/auth/login with valid credentials"""
import requests
import time
import random
import os

BASE_URL = os.getenv("API_URL", "http://localhost:5000")
TIMEOUT = 10

def _create_user():
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
    return email, password

def test_postapiauthloginwithvalidcredentials():
    email, password = _create_user()

    login_payload = {"identifier": email, "password": password}
    resp = requests.post(f"{BASE_URL}/api/auth/login", json=login_payload, timeout=TIMEOUT)
    assert resp.status_code == 200, f"Esperado 200, recebeu {resp.status_code}: {resp.text}"
    json_data = resp.json()
    assert json_data.get("success") is True, f"Expected success True: {json_data}"
    data = json_data.get("data")
    assert isinstance(data, dict), f"Missing 'data' wrapper: {json_data}"
    # BUG-C1 fix: accessToken MUST be in response
    assert "accessToken" in data, f"accessToken missing in login response data: {data.keys()}"
    assert data["accessToken"] is not None, "accessToken is None"
    assert "refreshToken" in data, f"refreshToken missing in login response data: {data.keys()}"
    user = data.get("user")
    assert isinstance(user, dict), "User object missing"
    assert user.get("email") == email

if __name__ == "__main__":
    test_postapiauthloginwithvalidcredentials()
