import requests
import sys
import json
from datetime import datetime

class BakeryAPITester:
    def __init__(self, base_url="https://manis-shop-site.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if response.status_code != 204:  # No content
                    try:
                        response_data = response.json()
                        if isinstance(response_data, list):
                            print(f"   Response: List with {len(response_data)} items")
                        elif isinstance(response_data, dict):
                            print(f"   Response keys: {list(response_data.keys())}")
                    except:
                        print(f"   Response: {response.text[:100]}...")
            else:
                self.failed_tests.append({
                    "test": name,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "url": url,
                    "response": response.text[:200]
                })
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")

            return success, response.json() if success and response.status_code != 204 else {}

        except requests.RequestException as e:
            self.failed_tests.append({
                "test": name,
                "error": str(e),
                "url": url
            })
            print(f"❌ Failed - Network Error: {str(e)}")
            return False, {}
        except Exception as e:
            self.failed_tests.append({
                "test": name,
                "error": f"Unexpected error: {str(e)}",
                "url": url
            })
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_seed_data(self):
        """Test seeding initial data"""
        return self.run_test("Seed Data", "POST", "seed", 200)

    def test_get_products(self):
        """Test getting products"""
        return self.run_test("Get Products", "GET", "products", 200)

    def test_get_testimonials(self):
        """Test getting testimonials"""
        return self.run_test("Get Testimonials", "GET", "testimonials", 200)

    def test_create_order(self):
        """Test creating an order"""
        order_data = {
            "customer_name": "Test Customer",
            "phone": "+6281234567890",
            "email": "test@example.com",
            "product_name": "Croissant Premium",
            "quantity": 2,
            "notes": "Test order",
            "pickup_date": "2024-12-31"
        }
        return self.run_test("Create Order", "POST", "orders", 200, order_data)

    def test_get_orders(self):
        """Test getting orders"""
        return self.run_test("Get Orders", "GET", "orders", 200)

    def test_create_contact(self):
        """Test contact form submission"""
        contact_data = {
            "name": "Test User",
            "email": "testuser@example.com",
            "phone": "+6281234567890",
            "message": "This is a test message from the bakery contact form."
        }
        return self.run_test("Create Contact", "POST", "contact", 200, contact_data)

    def test_create_testimonial(self):
        """Test creating testimonials"""
        testimonial_data = {
            "name": "Test Reviewer",
            "message": "Amazing bread quality!",
            "rating": 5
        }
        return self.run_test("Create Testimonial", "POST", "testimonials", 200, testimonial_data)

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Test POST status
        status_data = {"client_name": "test_client"}
        success1, response1 = self.run_test("Create Status Check", "POST", "status", 200, status_data)
        
        # Test GET status
        success2, response2 = self.run_test("Get Status Checks", "GET", "status", 200)
        
        return success1 and success2

def main():
    print("="*60)
    print("🍞 Roti Manis Bakery API Testing")
    print("="*60)
    
    tester = BakeryAPITester()
    
    # Run all tests in sequence
    print("\n📡 Testing API Connectivity...")
    tester.test_root_endpoint()
    
    print("\n🌱 Testing Data Seeding...")
    tester.test_seed_data()
    
    print("\n📊 Testing Data Retrieval...")
    tester.test_get_products()
    tester.test_get_testimonials()
    
    print("\n📝 Testing Order Management...")
    tester.test_create_order()
    tester.test_get_orders()
    
    print("\n💌 Testing Contact System...")
    tester.test_create_contact()
    
    print("\n⭐ Testing Testimonials...")
    tester.test_create_testimonial()
    
    print("\n🔍 Testing Status System...")
    tester.test_status_endpoints()

    # Print summary
    print("\n" + "="*60)
    print("📊 TEST RESULTS SUMMARY")
    print("="*60)
    print(f"✅ Tests Passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"❌ Tests Failed: {len(tester.failed_tests)}")
    
    if tester.failed_tests:
        print("\n🚨 FAILED TESTS:")
        for i, failure in enumerate(tester.failed_tests, 1):
            print(f"\n{i}. {failure['test']}")
            print(f"   URL: {failure.get('url', 'N/A')}")
            if 'expected' in failure:
                print(f"   Expected: {failure['expected']}, Got: {failure['actual']}")
            if 'error' in failure:
                print(f"   Error: {failure['error']}")
            if 'response' in failure:
                print(f"   Response: {failure['response']}")
    
    success_rate = (tester.tests_passed / tester.tests_run) * 100 if tester.tests_run > 0 else 0
    print(f"\n🎯 Success Rate: {success_rate:.1f}%")
    
    if success_rate >= 80:
        print("🎉 Backend API is working well!")
        return 0
    else:
        print("⚠️  Backend needs attention - multiple endpoints failing")
        return 1

if __name__ == "__main__":
    sys.exit(main())