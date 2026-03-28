"""TC016 — GET /api/search with no results"""
import requests
import os

BASE_URL = os.getenv("API_URL", "http://localhost:5000")
TIMEOUT = 10

def test_getapisearchnoresults():
    resp = requests.get(f"{BASE_URL}/api/search", params={"q": "zzzznonexistent12345xyz"}, timeout=TIMEOUT)
    assert resp.status_code == 200, f"Esperado 200, recebeu {resp.status_code}: {resp.text}"
    data = resp.json()
    assert isinstance(data, dict), "Response is not a dict"
    # API returns { results: { users: [], streams: [], totalUsers: 0, totalStreams: 0 } }
    assert "results" in data, f"Missing 'results' key: {data.keys()}"
    results = data["results"]
    assert isinstance(results, dict), f"Expected dict, got {type(results)}"
    assert len(results.get("users", [])) == 0, f"Expected empty users, got {len(results.get('users', []))}"
    assert len(results.get("streams", [])) == 0, f"Expected empty streams, got {len(results.get('streams', []))}"

if __name__ == "__main__":
    test_getapisearchnoresults()
