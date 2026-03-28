"""TC004 — POST /api/auth/logout clears session"""
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
    password = "StrongPass1"
    payload = {
        "email": email,
        "phone": f"+244{random.randint(900000000, 999999999)}",
        "username": f"tester_{ts}_{rnd}",
        "password": password
    }
    session = requests.Session()
    r = session.post(f"{BASE_URL}/api/auth/register", json=payload, timeout=TIMEOUT)
    assert r.status_code == 201, f"Register failed: {r.status_code}: {r.text}"

    r2 = session.post(f"{BASE_URL}/api/auth/login", json={"identifier": email, "password": password}, timeout=TIMEOUT)
    assert r2.status_code == 200, f"Login failed: {r2.status_code}: {r2.text}"
    login_data = r2.json()["data"]
    return session, login_data

def test_postapiauthlogoutclearsession():
    session, login_data = _register_and_login()
    refresh_token = login_data.get("refreshToken")

    # Logout
    logout_resp = session.post(f"{BASE_URL}/api/auth/logout", json={"refreshToken": refresh_token}, timeout=TIMEOUT)
    assert logout_resp.status_code == 200, f"Esperado 200, recebeu {logout_resp.status_code}: {logout_resp.text}"
    assert logout_resp.json().get("success") is True

    # Subsequent refresh should fail
    refresh_resp = session.post(f"{BASE_URL}/api/auth/refresh", json={"refreshToken": refresh_token}, timeout=TIMEOUT)
    assert refresh_resp.status_code == 401, f"Esperado 401 após logout, recebeu {refresh_resp.status_code}: {refresh_resp.text}"

if __name__ == "__main__":
    test_postapiauthlogoutclearsession()
