"""TC009 — POST /api/users/onboarding complete onboarding"""
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
    r = requests.post(f"{BASE_URL}/api/auth/register", json=payload, timeout=TIMEOUT)
    assert r.status_code == 201, f"Register failed: {r.status_code}: {r.text}"

    r2 = requests.post(f"{BASE_URL}/api/auth/login", json={"identifier": email, "password": password}, timeout=TIMEOUT)
    assert r2.status_code == 200, f"Login failed: {r2.status_code}: {r2.text}"
    login_data = r2.json()["data"]
    return login_data

def test_postapiusersonboardingcompleteonboarding():
    login_data = _register_and_login()
    token = login_data["accessToken"]
    headers = {"Authorization": f"Bearer {token}"}

    ts = int(time.time())
    rnd = random.randint(1000, 9999)
    onboarding_data = {
        "displayName": "Onboard User",
        "username": f"onboard_{ts}_{rnd}",
        "bio": "Bio de onboarding teste.",
        "interests": ["music", "gaming", "cooking"]
    }

    resp = requests.post(f"{BASE_URL}/api/users/onboarding", json=onboarding_data, headers=headers, timeout=TIMEOUT)
    assert resp.status_code == 200, f"Esperado 200, recebeu {resp.status_code}: {resp.text}"
    resp_json = resp.json()
    assert resp_json.get("success") is True, f"Expected success True: {resp_json}"
    user = resp_json.get("user")
    assert user is not None, f"Missing 'user' in response: {resp_json}"
    assert user.get("displayName") == onboarding_data["displayName"]
    assert user.get("username") == onboarding_data["username"]

if __name__ == "__main__":
    test_postapiusersonboardingcompleteonboarding()
