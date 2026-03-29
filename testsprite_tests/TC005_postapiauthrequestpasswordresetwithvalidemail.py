import requests

def test_post_api_auth_request_password_reset_with_valid_email():
    base_url = "http://localhost:5000"
    url = f"{base_url}/api/auth/request-password-reset"
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    # Use a valid email format; since no user creation is required for this test, 
    # and the API should not enumerate, any valid email format is acceptable.
    payload = {
        "email": "testuser@example.com"
    }

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)
        # Expect HTTP 200 regardless of email existence for generic success message
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

        # Response body should be generic success message, 
        # but not revealing email existence (no enumeration)
        # So assert that 'success' or a similar generic field is present and true or message contains generic text
        json_data = response.json()
        # Accept any JSON object but should not include error
        # Typical generic success might be {"message": "..."} or {"success": true}
        # We just ensure it does not indicate email non-existence
        # Example: check if any keys like 'success', 'message' exist and that message does not reveal enumeration
        # Let's assert at least one key exists and no error key

        # This is a generic check for presence of success indicators without revealing enumeration
        allowed_keys = {"success", "message", "status"}
        has_key = any(k in json_data for k in allowed_keys)
        assert has_key, "Response JSON does not contain expected generic success keys"

        # No detailed error message or indication that email is invalid should be present
        error_indicators = ["error", "not found", "invalid", "does not exist", "no account"]
        response_text_lower = response.text.lower()
        for phrase in error_indicators:
            assert phrase not in response_text_lower, f"Response text contains enumeration indicator: {phrase}"

    except requests.RequestException as e:
        assert False, f"Request failed: {e}"

test_post_api_auth_request_password_reset_with_valid_email()