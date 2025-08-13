# API Specification

This document outlines the API endpoints for the FraudAI application.

## Authentication

All endpoints require authentication via a JWT token provided in the `Authorization` header as a Bearer token.

`Authorization: Bearer <token>`

---

### Sign In

- **Method:** `POST`
- **Endpoint:** `/v1/auth/sign-in`
- **Description:** Authenticates a user and returns a JWT token.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response Body:**

```json
{
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "Test User"
  },
  "token": "your.jwt.token"
}
```

**Example:**

```bash
curl -X POST https://api.fraud.ai/api/v1/auth/sign-in \\
-H "Content-Type: application/json" \\
-d '{
  "email": "user@example.com",
  "password": "yourpassword"
}'
```

---

### Sign Up

- **Method:** `POST`
- **Endpoint:** `/v1/auth/sign-up`
- **Description:** Creates a new user and returns a JWT token.

**Request Body:**

```json
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "strongpassword"
}
```

**Response Body:**

```json
{
  "user": {
    "id": "2",
    "email": "newuser@example.com",
    "name": "New User"
  },
  "token": "new.jwt.token"
}
```

**Example:**

```bash
curl -X POST https://api.fraud.ai/api/v1/auth/sign-up \\
-H "Content-Type: application/json" \\
-d '{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "strongpassword"
}'
```

---

### Get Current User

- **Method:** `GET`
- **Endpoint:** `/v1/auth/me`
- **Description:** Retrieves the profile of the currently authenticated user. This endpoint requires an `Authorization` header with a Bearer token.

**Response Body:**

```json
{
  "id": "1",
  "email": "user@example.com",
  "name": "Test User"
}
```

**Example:**

```bash
curl -X GET https://api.fraud.ai/api/v1/auth/me \\
-H "Authorization: Bearer your.jwt.token"
```

---

## Future API Endpoints

The following features are currently mocked in the frontend application and will require dedicated API endpoints in the future.

### API Key Management

Endpoints for managing API keys will be needed.

- `GET /v1/api-keys`: List all API keys for the user.
- `POST /v1/api-keys`: Create a new API key.
- `DELETE /v1/api-keys/{key_id}`: Revoke an API key.

### Model Inference (Playground)

An endpoint for running model inference will be needed for the playground.

- `POST /v1/inference`: Runs a fraud detection model on the given input data. The request body will depend on the selected model, and the response will contain the model's prediction.
