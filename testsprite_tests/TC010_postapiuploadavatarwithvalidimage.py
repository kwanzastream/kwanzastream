import requests
from io import BytesIO

BASE_URL = "http://localhost:5000"
TIMEOUT = 30

def test_postapiuploadavatarwithvalidimage():
    session = requests.Session()

    # Step 1: Register user
    register_data = {
        "email": "testuser_tc010@example.com",
        "phone": "+244912345678",
        "username": "testuser_tc010",
        "password": "Aa12345678"
    }
    resp = session.post(f"{BASE_URL}/api/auth/register", json=register_data, timeout=TIMEOUT)
    assert resp.status_code == 201, f"Register failed: {resp.text}"
    resp_json = resp.json()
    assert resp_json.get("success") is True
    user = resp_json.get("user")
    assert user is not None

    try:
        # Step 2: Login user
        login_data = {
            "identifier": register_data["email"],
            "password": register_data["password"]
        }
        resp = session.post(f"{BASE_URL}/api/auth/login", json=login_data, timeout=TIMEOUT)
        assert resp.status_code == 200, f"Login failed: {resp.text}"
        resp_json = resp.json()
        assert resp_json.get("success") is True
        # Authorization via session cookies automatically handled by session

        # Step 3: Upload avatar with small valid JPEG < 5MB
        jpeg_bytes = (
            b"\xff\xd8\xff\xe0"  # SOI + APP0 marker
            b"\x00\x10JFIF\x00\x01\x01\x01\x00H\x00H\x00\x00"
            b"\xff\xdb\x00C\x00" + b"\x08" * 64 +  # Quantization Table
            b"\xff\xc0\x00\x11\x08\x00\x01\x00\x01\x03\x01\"\x00\x02\x11\x01\x03\x11\x01"
            b"\xff\xda\x00\x0c\x03\x01\x00\x02\x11\x03\x11\x00?\x00\xd2\xcf \xff\xd9"  # Minimal valid JPEG
        )
        files = {
            "file": ("avatar.jpg", BytesIO(jpeg_bytes), "image/jpeg")
        }
        resp = session.post(f"{BASE_URL}/api/upload/avatar", files=files, timeout=TIMEOUT)
        assert resp.status_code == 200, f"Avatar upload failed: {resp.text}"
        resp_json = resp.json()
        assert resp_json.get("success") is True
        avatar_url = resp_json.get("avatarUrl")
        assert isinstance(avatar_url, str) and len(avatar_url) > 0
        # avatarUrl may be relative path starting with /uploads, no http required
        assert avatar_url.startswith("/") or avatar_url.startswith("uploads") or avatar_url.startswith("/uploads")

    finally:
        # Cleanup: Delete the created user if possible
        # No delete user endpoint mentioned in PRD, so skipping actual delete.
        pass

test_postapiuploadavatarwithvalidimage()