"""TC005 — POST /api/auth/request-password-reset with valid email"""
import requests
import os

BASE_URL = os.getenv("API_URL", "http://localhost:5000")
TIMEOUT = 10

def test_postapiauthrequestpasswordresetwithvalidemail():
    url = f"{BASE_URL}/api/auth/request-password-reset"
    payload = {"email": "validuser@example.com"}

    response = requests.post(url, json=payload, timeout=TIMEOUT)
    assert response.status_code == 200, f"Esperado 200, recebeu {response.status_code}: {response.text}"
    resp_json = response.json()
    assert isinstance(resp_json, dict), "Response JSON is not a dict"
    # Generic success — no email enumeration
    assert resp_json.get("success") is True or "message" in resp_json, f"Unexpected response: {resp_json}"

if __name__ == "__main__":
    test_postapiauthrequestpasswordresetwithvalidemail()
