import requests

def test_get_api_streams_categories():
    url = "http://localhost:5000/api/streams/categories"
    headers = {
        "Accept": "application/json"
    }
    try:
        response = requests.get(url, headers=headers, timeout=30)
        assert response.status_code == 200, f"Expected status code 200 but got {response.status_code}"
        data = response.json()
        assert isinstance(data, (list, dict)), f"Expected response data to be list or dict but got {type(data)}"
    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

test_get_api_streams_categories()