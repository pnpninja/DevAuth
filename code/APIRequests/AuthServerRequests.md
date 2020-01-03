{
	"info": {
		"_postman_id": "dc77f01d-db14-4929-afe7-c44e7f464f43",
		"name": "AuthServer",
		"description": "NetSec project. Mobile phone based Federated System",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "Register_App",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"name\":\"XYZ\",\n\t\"scope\":\"email,location\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://127.0.0.1:8000/apps/register",
					"protocol": "https",
					"host": [
						"127",
						"0",
						"0",
						"1"
					],
					"port": "8000",
					"path": [
						"apps",
						"register"
					]
				}
			},
			"response": []
		},
		{
			"name": "APP:Retrieve Token",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"name\":\"XYZ\"\t\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://127.0.0.1:8000/apps/retrieveToken",
					"protocol": "https",
					"host": [
						"127",
						"0",
						"0",
						"1"
					],
					"port": "8000",
					"path": [
						"apps",
						"retrieveToken"
					]
				}
			},
			"response": []
		},
		{
			"name": "User Register",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"email\" : \"johndoe@xyz.com\",\n\t\"password\" : \"limpbizcut1234\",\n\t\"device_id\" : \"549843asdfew89752135484d\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://127.0.0.1:8000/user/register",
					"protocol": "http",
					"host": [
						"127",
						"0",
						"0",
						"1"
					],
					"port": "8000",
					"path": [
						"user",
						"register"
					]
				}
			},
			"response": []
		},
		{
			"name": "LoginRequest(AuthServer)",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/json",
						"type": "text"
					}
				],
				"body": {
					"mode": "raw",
					"raw": "{\n\t\"request_id\" : \"123456789\",\n    \"app_token\" : \"c3c8101e-6944-43c0-ba2a-5b0492678efc\",\n    \"redirect_url\" : \"http://127.0.0.1/abc/abc\",\n    \"scope\" : \"email,profile\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://127.0.0.1:8000/apps/loginRequest",
					"protocol": "http",
					"host": [
						"127",
						"0",
						"0",
						"1"
					],
					"port": "8000",
					"path": [
						"apps",
						"loginRequest"
					]
				}
			},
			"response": []
		}
	],
	"protocolProfileBehavior": {}
}