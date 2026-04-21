# API Documentation - Student Feedback Review System

## Table of Contents

1. [Authentication](#authentication)
2. [Feedback Endpoints](#feedback-endpoints)
3. [Review Endpoints](#review-endpoints)
4. [Error Handling](#error-handling)
5. [Examples](#examples)

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <JWT_TOKEN>
```

### Register User

**Endpoint:** `POST /api/auth/register`
**Access:** Public
**Body:**

```json
{
  "name": "John Student",
  "email": "student@example.com",
  "password": "password123",
  "role": "student"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Student",
    "email": "student@example.com",
    "role": "student"
  }
}
```

### Login User

**Endpoint:** `POST /api/auth/login`
**Access:** Public
**Body:**

```json
{
  "email": "student@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Student",
    "email": "student@example.com",
    "role": "student"
  }
}
```

### Get Current User

**Endpoint:** `GET /api/auth/me`
**Access:** Protected (requires JWT)
**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response:**

```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Student",
    "email": "student@example.com",
    "role": "student",
    "createdAt": "2026-04-21T10:00:00Z"
  }
}
```

---

## Feedback Endpoints

### Create Feedback

**Endpoint:** `POST /api/feedbacks`
**Access:** Protected (requires JWT)
**Body:**

```json
{
  "title": "Course Content is Excellent",
  "description": "The course material is well-structured and easy to understand",
  "category": "course-content",
  "rating": 5,
  "course": "Web Development 101",
  "instructor": "Prof. Smith",
  "anonymous": false
}
```

**Response:**

```json
{
  "message": "Feedback submitted successfully",
  "feedback": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Course Content is Excellent",
    "description": "The course material is well-structured...",
    "category": "course-content",
    "rating": 5,
    "status": "pending",
    "submittedBy": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Student"
    },
    "createdAt": "2026-04-21T10:00:00Z"
  }
}
```

### Get All Feedbacks

**Endpoint:** `GET /api/feedbacks`
**Access:** Public
**Query Parameters:**

- `category` - Filter by category (course-content, instructor, facilities, curriculum, other)
- `status` - Filter by status (pending, under-review, resolved, rejected)
- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)

**Example:** `GET /api/feedbacks?category=course-content&status=pending&page=1&limit=10`

**Response:**

```json
{
  "feedbacks": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Course Content is Excellent",
      "description": "The course material is well-structured...",
      "category": "course-content",
      "rating": 5,
      "status": "pending",
      "submittedBy": {
        "name": "John Student",
        "email": "student@example.com"
      },
      "createdAt": "2026-04-21T10:00:00Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

### Get Feedback by ID

**Endpoint:** `GET /api/feedbacks/:id`
**Access:** Public
**Params:** `id` - Feedback ID
**Response:**

```json
{
  "feedback": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Course Content is Excellent",
    "description": "The course material is well-structured...",
    "category": "course-content",
    "rating": 5,
    "status": "pending",
    "submittedBy": {
      "name": "John Student",
      "email": "student@example.com"
    },
    "createdAt": "2026-04-21T10:00:00Z"
  }
}
```

### Update Feedback

**Endpoint:** `PUT /api/feedbacks/:id`
**Access:** Protected (Only owner or admin can update)
**Params:** `id` - Feedback ID
**Body:**

```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "status": "under-review"
}
```

**Response:**

```json
{
  "message": "Feedback updated",
  "feedback": {
    /* updated feedback object */
  }
}
```

### Delete Feedback

**Endpoint:** `DELETE /api/feedbacks/:id`
**Access:** Protected (Only owner or admin can delete)
**Params:** `id` - Feedback ID
**Response:**

```json
{
  "message": "Feedback deleted successfully"
}
```

### Get Feedbacks by User

**Endpoint:** `GET /api/feedbacks/user/:userId`
**Access:** Public
**Params:** `userId` - User ID
**Response:**

```json
{
  "feedbacks": [
    {
      /* feedback objects */
    }
  ]
}
```

---

## Review Endpoints

### Create Review

**Endpoint:** `POST /api/reviews`
**Access:** Protected (Only instructor or admin can create)
**Body:**

```json
{
  "feedbackId": "507f1f77bcf86cd799439012",
  "comment": "Thank you for the feedback. We will improve the course material.",
  "action": "approved",
  "actionDescription": "Course curriculum will be updated accordingly"
}
```

**Response:**

```json
{
  "message": "Review created successfully",
  "review": {
    "_id": "507f1f77bcf86cd799439013",
    "feedback": {
      /* feedback object */
    },
    "reviewedBy": {
      "_id": "507f1f77bcf86cd799439014",
      "name": "Prof. Smith"
    },
    "comment": "Thank you for the feedback...",
    "action": "approved",
    "createdAt": "2026-04-21T11:00:00Z"
  }
}
```

### Get All Reviews

**Endpoint:** `GET /api/reviews`
**Access:** Public
**Query Parameters:**

- `page` - Page number (default: 1)
- `limit` - Results per page (default: 10)

**Response:**

```json
{
  "reviews": [
    {
      /* review objects */
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

### Get Reviews for Specific Feedback

**Endpoint:** `GET /api/reviews/feedback/:feedbackId`
**Access:** Public
**Params:** `feedbackId` - Feedback ID
**Response:**

```json
{
  "reviews": [
    {
      /* review objects */
    }
  ]
}
```

### Get Reviews by Reviewer

**Endpoint:** `GET /api/reviews/reviewer/:reviewerId`
**Access:** Protected
**Params:** `reviewerId` - Reviewer (User) ID
**Response:**

```json
{
  "reviews": [
    {
      /* review objects */
    }
  ]
}
```

### Update Review

**Endpoint:** `PUT /api/reviews/:id`
**Access:** Protected (Only reviewer or admin can update)
**Params:** `id` - Review ID
**Body:**

```json
{
  "comment": "Updated comment",
  "action": "approved",
  "actionDescription": "Updated action description"
}
```

### Delete Review

**Endpoint:** `DELETE /api/reviews/:id`
**Access:** Protected (Only reviewer or admin can delete)
**Params:** `id` - Review ID

---

## Error Handling

### Standard Error Response

```json
{
  "message": "Error description",
  "error": "Detailed error information"
}
```

### Common HTTP Status Codes

- `200` - OK (Successful GET/PUT)
- `201` - Created (Successful POST)
- `400` - Bad Request (Validation error)
- `401` - Unauthorized (Missing or invalid token)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found (Resource doesn't exist)
- `409` - Conflict (Duplicate email)
- `500` - Internal Server Error

---

## Examples

### Using cURL

#### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Student",
    "email": "student@example.com",
    "password": "password123",
    "role": "student"
  }'
```

#### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "password123"
  }'
```

#### Submit Feedback (with token)

```bash
curl -X POST http://localhost:5000/api/feedbacks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Great Course",
    "description": "Very informative course",
    "category": "course-content",
    "rating": 5,
    "anonymous": false
  }'
```

#### Get All Feedbacks

```bash
curl http://localhost:5000/api/feedbacks?category=course-content&page=1
```

#### Create Review (as instructor)

```bash
curl -X POST http://localhost:5000/api/reviews \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "feedbackId": "FEEDBACK_ID",
    "comment": "Thank you for feedback",
    "action": "approved",
    "actionDescription": "We will implement this"
  }'
```

### Using JavaScript (Fetch API)

```javascript
// Register
const registerUser = async (userData) => {
  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Login
const loginUser = async (credentials) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return response.json();
};

// Submit Feedback (with token)
const submitFeedback = async (feedbackData, token) => {
  const response = await fetch("http://localhost:5000/api/feedbacks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(feedbackData),
  });
  return response.json();
};
```

---

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding it in production.

## API Versioning

No versioning implemented yet. The API is v1 (current).

## Authentication Flow

1. User registers/logs in
2. Server returns JWT token
3. Client stores token in localStorage
4. Client sends token with each protected request
5. Server validates token and processes request

---

**Last Updated:** April 2026
