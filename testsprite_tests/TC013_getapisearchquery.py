"""TC013 — GET /api/search?q=test (search with results)"""
import requests
import os

BASE_URL = os.getenv("API_URL", "http://localhost:5000")
TIMEOUT = 10

def test_getapisearchquery():
    resp = requests.get(f"{BASE_URL}/api/search", params={"q": "test"}, timeout=TIMEOUT)
    assert resp.status_code == 200, f"Esperado 200, recebeu {resp.status_code}: {resp.text}"
    data = resp.json()
    assert isinstance(data, dict), "Response JSON is not a dict"
    # API returns { results: { users: [], streams: [], totalUsers, totalStreams } }
    assert "results" in data, f"Missing 'results' key: {data.keys()}"
    results = data["results"]
    assert isinstance(results, dict), f"Expected results to be dict, got {type(results)}"
    assert "users" in results, f"Missing 'users' in results: {results.keys()}"
    assert "streams" in results, f"Missing 'streams' in results: {results.keys()}"
    assert isinstance(results["users"], list)
    assert isinstance(results["streams"], list)

if __name__ == "__main__":
    test_getapisearchquery()
