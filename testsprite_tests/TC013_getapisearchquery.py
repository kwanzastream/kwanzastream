import requests

def test_get_api_search_query():
    base_url = "http://localhost:5000"
    endpoint = "/api/search"
    params = {"q": "test"}  # Removed 'type' param to align with PRD
    headers = {
        "Accept": "application/json"
    }
    timeout = 30

    try:
        response = requests.get(f"{base_url}{endpoint}", params=params, headers=headers, timeout=timeout)
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

    assert response.status_code == 200, f"Expected status code 200 but got {response.status_code}"

    try:
        json_data = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    # Validate that response JSON contains 'results' key that should be a list (per PRD)
    assert "results" in json_data, "'results' key not present in response JSON"
    results = json_data["results"]
    assert isinstance(results, list), f"'results' key is not a list, got type {type(results).__name__}"

test_get_api_search_query()
