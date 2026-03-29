import requests

BASE_URL = "http://localhost:5000"


def test_getapisearchnoresults():
    params = {
        "q": "zzzznonexistent12345xyz",
        "type": "all"
    }
    try:
        resp = requests.get(f"{BASE_URL}/api/search", params=params, timeout=30)
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    assert resp.status_code == 200, f"Expected status code 200 but got {resp.status_code}"

    try:
        data = resp.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    # The description says users and streams results must be empty or zero
    # Since the schema says GET /api/search returns { results: [...] } with matching channels and VODs,
    # check that results array is empty or contains no user/streams data
    # We relax assumption to results empty array

    results = data.get("results")
    assert results is not None, "Missing 'results' key in response JSON"
    assert isinstance(results, list), "'results' should be a list"

    # Assert results is empty or contains no users/streams - usually empty for nonexistent query
    assert len(results) == 0 or all(
        (not ("user" in r or "stream" in r)) for r in results
    ), "Results should be empty or contain no user/stream entries for nonexistent query"


test_getapisearchnoresults()