import requests

def test_get_api_streams_live_no_auth():
    base_url = "http://localhost:5000"
    url = f"{base_url}/api/streams/live"
    try:
        response = requests.get(url, timeout=30)
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        json_data = response.json()
        # The response should be JSON array or JSON object containing list of streams or empty array.
        # Based on PRD descriptions, likely an object with list or empty list.
        # Accept either an array or an object containing a list
        if isinstance(json_data, list):
            # Accept empty or filled list
            assert True
        elif isinstance(json_data, dict):
            # Try to find a key containing streams, fallback accept empty dict
            streams = json_data.get("streams")
            assert streams is not None, "Response JSON should contain 'streams' key"
            assert isinstance(streams, list), "'streams' should be a list"
        else:
            assert False, "Response JSON is neither list nor dict"
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

test_get_api_streams_live_no_auth()