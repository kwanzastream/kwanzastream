import requests

def test_postapiauthrequestpasswordresetwithvalidemail():
    base_url = "http://localhost:3001"
    endpoint = "/api/auth/request-password-reset"
    url = base_url + endpoint

    # Valid email for password reset request - this email should exist in the system for a meaningful test
    payload = {
        "email": "validuser@example.com"
    }

    headers = {
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

        # The response should return a generic success message without disclosing account existence
        json_resp = response.json()
        # Generic success message could vary; assert presence of success or message key
        assert isinstance(json_resp, dict), "Response is not a JSON object"
        # Look for generic success indication: either 'success' key or a 'message' key customary in API responses
        assert (
            "success" in json_resp and isinstance(json_resp["success"], bool)
        ) or ("message" in json_resp and isinstance(json_resp["message"], str)), \
            "Response JSON does not contain expected success message keys"

    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

test_postapiauthrequestpasswordresetwithvalidemail()