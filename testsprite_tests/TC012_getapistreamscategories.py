"""TC012 — GET /api/streams/categories without auth"""
import requests
import os

BASE_URL = os.getenv("API_URL", "http://localhost:5000")
TIMEOUT = 10

def test_getapistreamscategories():
    resp = requests.get(f"{BASE_URL}/api/streams/categories", timeout=TIMEOUT)
    assert resp.status_code == 200, f"Esperado 200, recebeu {resp.status_code}: {resp.text}"
    data = resp.json()
    assert isinstance(data, (list, dict)), f"Expected list or dict, got {type(data)}"

if __name__ == "__main__":
    test_getapistreamscategories()
