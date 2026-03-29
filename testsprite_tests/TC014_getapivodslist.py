import requests

def test_getapivodslist():
    base_url = "http://localhost:5000"
    url = f"{base_url}/api/vods"
    headers = {
        "Accept": "application/json"
    }
    try:
        response = requests.get(url, headers=headers, timeout=30)
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        json_data = response.json()
        assert isinstance(json_data, (list, dict)), f"Expected response type list or dict, got {type(json_data)}"
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

test_getapivodslist()