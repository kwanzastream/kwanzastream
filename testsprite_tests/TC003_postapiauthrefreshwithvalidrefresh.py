"""TC003 — POST /api/auth/refresh with valid refresh token"""
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
    session = requests.Session()
    r = session.post(f"{BASE_URL}/api/auth/register", json=payload, timeout=TIMEOUT)
    assert r.status_code == 201, f"Register failed: {r.status_code}: {r.text}"
    reg_data = r.json()["data"]

    r2 = session.post(f"{BASE_URL}/api/auth/login", json={"identifier": email, "password": password}, timeout=TIMEOUT)
    assert r2.status_code == 200, f"Login failed: {r2.status_code}: {r2.text}"
    login_data = r2.json()["data"]
    return session, login_data

def test_postapiauthrefreshwithvalidrefresh():
    session, login_data = _register_and_login()
    refresh_token = login_data.get("refreshToken")
    assert refresh_token, "No refreshToken in login response"

    # Refresh using body (works even without cookies)
    resp = session.post(
        f"{BASE_URL}/api/auth/refresh",
        json={"refreshToken": refresh_token},
        timeout=TIMEOUT
    )
    assert resp.status_code == 200, f"Esperado 200, recebeu {resp.status_code}: {resp.text}"
    json_data = resp.json()
    assert json_data.get("success") is True, f"Expected success True: {json_data}"
    data = json_data.get("data")
    assert isinstance(data, dict), f"Missing data wrapper: {json_data}"
    assert "accessToken" in data, f"Missing new accessToken: {data.keys()}"

if __name__ == "__main__":
    test_postapiauthrefreshwithvalidrefresh()
