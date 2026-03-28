"""TC015 — GET /api/streams/user/:id"""
import requests
import time
import random
import os

BASE_URL = os.getenv("API_URL", "http://localhost:5000")
TIMEOUT = 10

def test_getapistreamsuserbyid():
    ts = int(time.time())
    rnd = random.randint(1000, 9999)
    payload = {
        "email": f"test_{ts}_{rnd}@kwanzastream.com",
        "phone": f"+244{random.randint(900000000, 999999999)}",
        "username": f"tester_{ts}_{rnd}",
        "password": "Str0ngPass1"
    }
    r = requests.post(f"{BASE_URL}/api/auth/register", json=payload, timeout=TIMEOUT)
    assert r.status_code == 201, f"Register failed: {r.status_code}: {r.text}"
    user = r.json()["data"]["user"]
    user_id = user["id"]

    # GET /api/streams/user/{user_id}
    resp = requests.get(f"{BASE_URL}/api/streams/user/{user_id}", timeout=TIMEOUT)
    assert resp.status_code in (200, 404), f"Esperado 200 ou 404, recebeu {resp.status_code}: {resp.text}"
    assert "application/json" in resp.headers.get("Content-Type", ""), "Response is not JSON"
    resp.json()  # Should not raise

if __name__ == "__main__":
    test_getapistreamsuserbyid()
