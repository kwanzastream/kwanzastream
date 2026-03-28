"""TC008 — PUT /api/users/me update profile"""
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
    password = "Aa1234567"
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
    return login_data

def test_putapiusersmeupdateprofile():
    login_data = _register_and_login()
    token = login_data["accessToken"]
    headers = {"Authorization": f"Bearer {token}"}

    ts = int(time.time())
    rnd = random.randint(1000, 9999)
    update_payload = {
        "displayName": "Nome Actualizado",
        "username": f"updated_{ts}_{rnd}",
        "bio": "Bio de teste actualizada."
    }
    resp = requests.put(f"{BASE_URL}/api/users/me", json=update_payload, headers=headers, timeout=TIMEOUT)
    assert resp.status_code == 200, f"Esperado 200, recebeu {resp.status_code}: {resp.text}"
    resp_json = resp.json()
    user = resp_json.get("user")
    assert user is not None, f"Missing 'user' in response: {resp_json}"
    assert user.get("displayName") == update_payload["displayName"]
    assert user.get("username") == update_payload["username"]
    assert user.get("bio") == update_payload["bio"]

if __name__ == "__main__":
    test_putapiusersmeupdateprofile()
