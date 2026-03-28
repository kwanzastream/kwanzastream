"""TC001 — POST /api/auth/register with valid data"""
import requests
import time
import random
import os

BASE_URL = os.getenv("API_URL", "http://localhost:5000")
TIMEOUT = 10

def test_postapiauthregisterwithvaliddata():
    ts = int(time.time())
    rnd = random.randint(1000, 9999)
    url = f"{BASE_URL}/api/auth/register"
    payload = {
        "email": f"test_{ts}_{rnd}@kwanzastream.com",
        "phone": f"+244{random.randint(900000000, 999999999)}",
        "username": f"tester_{ts}_{rnd}",
        "password": "StrongP4ssword"
    }

    response = requests.post(url, json=payload, timeout=TIMEOUT)
    assert response.status_code == 201, f"Esperado 201, recebeu {response.status_code}: {response.text}"
    json_data = response.json()
    assert json_data.get("success") is True, f"Expected success True, got {json_data}"
    data = json_data.get("data")
    assert isinstance(data, dict), f"Missing 'data' wrapper: {json_data}"
    assert "accessToken" in data, f"Missing accessToken in data: {data.keys()}"
    assert "refreshToken" in data, f"Missing refreshToken in data: {data.keys()}"
    user = data.get("user")
    assert isinstance(user, dict), "User object missing or not a dict"
    for field in ["id", "email", "username"]:
        assert field in user, f"User object missing field '{field}'"

if __name__ == "__main__":
    test_postapiauthregisterwithvaliddata()
