import requests
import httpx
import os

BASE_URL = "http://localhost:8000"
IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Melanoma.jpg/320px-Melanoma.jpg"
TEST_IMAGE_FILE = "test_image.jpg"
TEST_TXT_FILE = "test.txt"

def test_health():
    print("Testing /health endpoint...")
    try:
        # Using httpx for a simple GET request
        response = httpx.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✅ Health check passed\n")
        else:
            print(f"❌ Health check failed (Status {response.status_code})\n")
    except Exception as e:
        print(f"❌ Health check failed with error: {e}\n")

def test_predict():
    print("Testing /predict endpoint...")
    # Download image using requests
    try:
        img_data = requests.get(IMAGE_URL).content
        with open(TEST_IMAGE_FILE, 'wb') as handler:
            handler.write(img_data)
    except Exception as e:
        print(f"❌ Failed to download test image: {e}")
        return

    try:
        with open(TEST_IMAGE_FILE, 'rb') as f:
            # Using requests for multipart file upload
            files = {'file': ('test_image.jpg', f, 'image/jpeg')}
            response = requests.post(f"{BASE_URL}/predict", files=files)
            
            try:
                data = response.json()
                print("JSON Response:")
                print(data)
                
                required_fields = ["disease", "confidence", "description", "severity", "recommendation"]
                if all(field in data for field in required_fields):
                    print("✅ Predict endpoint working\n")
                else:
                    print("❌ Missing fields in response\n")
            except Exception:
                print(f"❌ Failed to parse JSON. Response: {response.text}\n")
    except Exception as e:
        print(f"❌ Predict endpoint failed with error: {e}\n")
    finally:
        # Cleanup
        if os.path.exists(TEST_IMAGE_FILE):
            os.remove(TEST_IMAGE_FILE)

def test_error_handling():
    print("Testing error handling with .txt file...")
    # Create dummy text file
    with open(TEST_TXT_FILE, 'w') as f:
        f.write("This is a text file, not an image.")
        
    try:
        with open(TEST_TXT_FILE, 'rb') as f:
            files = {'file': ('test.txt', f, 'text/plain')}
            response = requests.post(f"{BASE_URL}/predict", files=files)
            
            if response.status_code == 400:
                print("✅ Error handling works\n")
            else:
                print(f"❌ Error handling failed (Expected 400, got {response.status_code})\n")
    except Exception as e:
        print(f"❌ Error handling failed with exception: {e}\n")
    finally:
        # Cleanup
        if os.path.exists(TEST_TXT_FILE):
            os.remove(TEST_TXT_FILE)

if __name__ == "__main__":
    test_health()
    test_predict()
    test_error_handling()
