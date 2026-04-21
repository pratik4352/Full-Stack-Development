# QUICK START GUIDE - Student Feedback Review System

## ⚡ Quick Setup (5 minutes)

### Step 1: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGODB_URI=mongodb://localhost:27017/student-feedback
JWT_SECRET=super_secret_key_12345
PORT=5000
```

Start backend:

```bash
npm run dev
```

✅ Backend running on http://localhost:5000

### Step 2: Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm start
```

✅ Frontend running on http://localhost:3000

## 🧪 Testing the Application

### Test Account 1 - Student

- Email: `student@example.com`
- Password: `password123`
- Role: Student

### Test Account 2 - Instructor

- Email: `instructor@example.com`
- Password: `password123`
- Role: Instructor

## 📋 Key Features to Test

1. **Register** - Create new account
2. **Submit Feedback** - Submit your first feedback
3. **View Feedbacks** - Browse all student feedbacks
4. **Dashboard** - Check your statistics
5. **Anonymous Feedback** - Test anonymous submission
6. **Filter Feedbacks** - Try filtering by category/status

## 🛠️ MongoDB Setup

### Option 1: Local MongoDB

```bash
# Install MongoDB locally and start it
mongod
```

### Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

## 📂 File Structure Overview

- **backend/server.js** - Main Express server
- **backend/models/** - MongoDB schemas
- **backend/routes/** - API endpoints
- **frontend/src/App.js** - Main React component
- **frontend/src/pages/** - Page components
- **frontend/src/components/** - Reusable components

## 🚀 Common Commands

### Backend

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

### Frontend

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests
npm test
```

## 📱 Application Routes

**Public Routes:**

- `/` - Home page
- `/login` - Login page
- `/register` - Registration page
- `/feedbacks` - View all feedbacks

**Protected Routes (Login Required):**

- `/dashboard` - User dashboard
- `/submit-feedback` - Submit new feedback

## 🔑 User Roles

| Role           | Permissions                                   |
| -------------- | --------------------------------------------- |
| **Student**    | Submit feedback, view all, track own          |
| **Instructor** | All student + review feedback, approve/reject |
| **Admin**      | Full system access                            |

## ❓ FAQ

**Q: How to change MongoDB database?**
A: Update `MONGODB_URI` in `backend/.env`

**Q: Port 3000 or 5000 already in use?**
A: Change PORT in `.env` or run `PORT=3001 npm start`

**Q: How to reset all data?**
A: Delete the MongoDB database and restart

**Q: Can I deploy this online?**
A: Yes! Use Heroku (backend), Vercel (frontend), and MongoDB Atlas (database)

## 📞 Need Help?

Check `README.md` for detailed documentation or review code comments.

---

Happy coding! 🎉
