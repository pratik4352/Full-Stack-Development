# Student Feedback Review System

A full-stack web application for collecting, reviewing, and managing student feedback on courses, instructors, and facilities. Built with React.js, Express.js, and MongoDB.

## Features

### For Students

- **Submit Feedback**: Share feedback on courses, instructors, facilities, and curriculum
- **Rating System**: Rate experiences on a scale of 1-5
- **Anonymous Submissions**: Option to submit feedback anonymously
- **Track Feedback Status**: Monitor the status of submitted feedback (pending, under-review, resolved, rejected)
- **View All Feedbacks**: Browse feedback from the entire student community

### For Instructors

- **Review Feedbacks**: Review and respond to student feedback
- **Approve/Reject**: Approve or reject feedback for quality control
- **Provide Feedback**: Add detailed comments and action descriptions
- **Track Reviews**: Monitor all reviews created

### For Admins

- **Full Access**: View and manage all feedbacks and reviews
- **User Management**: Oversee all users in the system
- **System Administration**: Overall system management

## Technology Stack

### Frontend

- **React.js** - User interface library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Styling and responsive design

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication & authorization
- **bcryptjs** - Password hashing

## Project Structure

```
Assignment 7/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT authentication
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Feedback.js        # Feedback schema
│   │   └── Review.js          # Review schema
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication endpoints
│   │   ├── feedbackRoutes.js  # Feedback CRUD endpoints
│   │   └── reviewRoutes.js    # Review endpoints
│   ├── server.js              # Express server
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── FeedbackForm.js
│   │   │   ├── FeedbackList.js
│   │   │   └── ReviewList.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── SubmitFeedback.js
│   │   │   └── ViewFeedbacks.js
│   │   ├── services/
│   │   │   └── api.js         # API client
│   │   ├── styles/            # CSS files
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`
   - Update MongoDB URI and JWT secret

   ```
   MONGODB_URI=mongodb://localhost:27017/student-feedback
   JWT_SECRET=your_secure_jwt_secret_key
   PORT=5000
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

   - Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env`

   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   - Application runs on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Feedback

- `POST /api/feedbacks` - Create feedback (requires auth)
- `GET /api/feedbacks` - Get all feedbacks with filters
- `GET /api/feedbacks/:id` - Get feedback by ID
- `PUT /api/feedbacks/:id` - Update feedback (requires auth)
- `DELETE /api/feedbacks/:id` - Delete feedback (requires auth)
- `GET /api/feedbacks/user/:userId` - Get feedbacks by user

### Reviews

- `POST /api/reviews` - Create review (instructor/admin only)
- `GET /api/reviews` - Get all reviews with pagination
- `GET /api/reviews/feedback/:feedbackId` - Get reviews for specific feedback
- `GET /api/reviews/reviewer/:reviewerId` - Get reviews by reviewer (requires auth)
- `PUT /api/reviews/:id` - Update review (requires auth)
- `DELETE /api/reviews/:id` - Delete review (requires auth)

## Database Schema

### User

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/instructor/admin),
  enrolledCourses: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Feedback

```javascript
{
  title: String,
  description: String,
  category: String (course-content/instructor/facilities/curriculum/other),
  rating: Number (1-5),
  submittedBy: ObjectId (ref: User),
  course: String,
  instructor: String,
  anonymous: Boolean,
  status: String (pending/under-review/resolved/rejected),
  createdAt: Date,
  updatedAt: Date
}
```

### Review

```javascript
{
  feedback: ObjectId (ref: Feedback),
  reviewedBy: ObjectId (ref: User),
  comment: String,
  action: String (approved/rejected/needs-revision),
  actionDescription: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Guide

### For Students

1. **Register/Login**
   - Create account with name, email, and password
   - Select "Student" as role
   - Login with credentials

2. **Submit Feedback**
   - Click "Submit Feedback" from dashboard
   - Fill in feedback details
   - Select category and rating
   - Optionally submit anonymously
   - Submit feedback

3. **View Feedbacks**
   - Browse all feedbacks from students
   - Filter by category or status
   - View ratings and comments

4. **Track Status**
   - Check dashboard for feedback statistics
   - Monitor pending, resolved, and rejected feedback

### For Instructors

1. **Register as Instructor**
   - Create account and select "Instructor" role

2. **Review Feedbacks**
   - Access review section from dashboard
   - Review student feedback
   - Provide detailed comments
   - Approve, reject, or mark for revision

3. **Track Reviews**
   - Monitor all reviews created
   - See feedback status changes

## Security Features

- **Password Hashing**: Passwords hashed with bcryptjs
- **JWT Authentication**: Secure token-based authentication
- **Authorization**: Role-based access control
- **Validation**: Input validation on both frontend and backend
- **CORS**: Configured for safe cross-origin requests

## Error Handling

- Comprehensive error messages
- Validation feedback for forms
- HTTP status codes for API responses
- Try-catch blocks for async operations

## Future Enhancements

- Real-time notifications using WebSockets
- Advanced analytics and reporting
- Email notifications
- Two-factor authentication
- Feedback categories customization
- Automated response templates
- Export feedback to PDF/Excel
- Automated email reports to instructors
- Mobile app version

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running locally or check connection string for cloud instance
- Verify `MONGODB_URI` in `.env` file

### CORS Error

- Check that both backend and frontend are running on correct ports
- Verify `REACT_APP_API_URL` matches backend URL

### JWT Token Issues

- Clear browser localStorage
- Login again to get new token
- Check `JWT_SECRET` is set in backend `.env`

### Port Already in Use

- Backend: Change PORT in `.env` file
- Frontend: Run `PORT=3001 npm start` for different port

## Contributing

Feel free to fork, modify, and improve this project. Submit pull requests for new features or fixes.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue or contact the development team.

---

**Created**: April 2026
**Status**: Production Ready
