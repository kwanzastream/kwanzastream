"""TC011 — GET /api/streams/live without auth"""
import requests
import os

BASE_URL = os.getenv("API_URL", "http://localhost:5000")
TIMEOUT = 10

def test_getapistreamslive():
    # Correct route is /api/streams/live (not /api/streams?status=live)
    resp = requests.get(f"{BASE_URL}/api/streams/live", timeout=TIMEOUT)
    assert resp.status_code == 200, f"Esperado 200, recebeu {resp.status_code}: {resp.text}"
    data = resp.json()
    assert isinstance(data, dict), f"Expected dict, got {type(data)}"
    assert "streams" in data, f"Missing 'streams' key: {data.keys()}"
    assert isinstance(data["streams"], list), f"Expected list, got {type(data['streams'])}"

if __name__ == "__main__":
    test_getapistreamslive()
