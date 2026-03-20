# Travel Agency Website - Complete Setup Guide

## 🚀 Project Overview

This is a full-stack web application built with:

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js + Express
- **Database**: MongoDB (NoSQL)
- **Architecture**: REST API

---

## 📋 Prerequisites

- ✅ Node.js installed (v14+)
- ✅ npm installed
- ✅ MongoDB Atlas account (free tier available)
- ✅ Internet connection

---

## 🔧 Setup Steps

### **Step 1: MongoDB Atlas Setup (Online)**

1. **Create MongoDB Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Click "Start free"
   - Sign up with Email or Google

2. **Create a Cluster**
   - After login, click "Create" → "Build a Cluster"
   - Choose "Shared Cluster" (Free tier)
   - Select Region closest to you
   - Click "Create Cluster" (wait 5-10 minutes)

3. **Create Database User**
   - Go to "Database Access" (left menu)
   - Click "Add New Database User"
   - **Username**: `travelhub` (or any name)
   - **Password**: `Travel@123` (or strong password)
   - **Built-in Role**: `Atlas Admin`
   - Click "Add User"

4. **Allow Network Access**
   - Go to "Network Access" (left menu)
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Clusters" → Click "Connect" button
   - Choose "Connect your application"
   - Select "Node.js" and Version "4.1 or later"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster0.mongodb.net/dbname?retryWrites=true&w=majority`

---

### **Step 2: Update .env File**

Edit `.env` file and replace with your actual credentials.

If your network is blocked from Atlas +SRV DNS, use local in-memory MongoDB mode (this app auto-uses it):

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ass5
NODE_ENV=development
```

Or Atlas mode as normal:

```
PORT=3000
MONGODB_URI=mongodb+srv://travelhub:Travel@123@cluster0.mongodb.net/travel_agency?retryWrites=true&w=majority
NODE_ENV=development
```

**Important**:

- Replace `travelhub` with your username
- Replace `Travel@123` with your password
- Replace `cluster0` with your cluster name
- Keep the rest of the URL the same

---

### **Step 3: Verify Project Structure**

Your project should have this structure:

```
Assignment 5/
├── node_modules/
├── models/
│   ├── Package.js
│   ├── Booking.js
│   └── Contact.js
├── routes/
│   ├── packages.js
│   ├── bookings.js
│   └── contact.js
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .env
├── server.js
├── seedData.js
└── package.json
```

---

### **Step 4: Start the Server**

Open PowerShell/Terminal in project folder and run:

```bash
npm start
```

You should see:

```
✓ MongoDB Connected Successfully
✓ Server running on http://localhost:3000
```

---

### **Step 5: Add Sample Data**

In a new terminal, run:

```bash
npm run seed
```

This will add 6 sample travel packages to your database.

---

### **Step 6: Test the Website**

1. Open browser: http://localhost:3000
2. You should see:
   - Navigation bar with "TravelHub" logo
   - Hero section with "Explore the World" banner
   - 6 travel packages displayed
   - Contact form

3. **Test Features:**
   - ✅ Click "Browse Packages" - scroll to packages section
   - ✅ Click "Book Now" on any package - follow prompts
   - ✅ Fill contact form and submit
   - ✅ Check MongoDB Atlas for saved data

---

## 🧪 Testing API Endpoints

Use Chrome or Postman to test:

### Get All Packages

```
GET http://localhost:3000/api/packages
```

### Create Booking

```
POST http://localhost:3000/api/bookings
Content-Type: application/json

{
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "packageId": "PASTE_ACTUAL_ID_HERE",
  "numberOfPeople": 2,
  "departureDate": "2024-06-15"
}
```

### Get All Bookings

```
GET http://localhost:3000/api/bookings
```

### Submit Contact

```
POST http://localhost:3000/api/contact
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Trip Inquiry",
  "message": "I want to book Paris package"
}
```

---

## 📱 Using Chrome to Test API

1. Open Chrome Developer Tools (F12)
2. Go to "Network" tab
3. Interact with website
4. Click any request to see:
   - Request headers
   - Request body
   - Response data
   - Status code

---

## ✅ Checklist for Submission

- [ ] MongoDB Atlas account created with online database
- [ ] .env file configured with correct MongoDB URI
- [ ] `npm install` completed successfully
- [ ] `npm start` - server running without errors
- [ ] `npm run seed` - sample data added
- [ ] Website accessible at http://localhost:3000
- [ ] Can view all packages
- [ ] Can book packages (booking saved to database)
- [ ] Can submit contact form (data saved to database)
- [ ] Can view data in MongoDB Atlas

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"

- ❌ Check MongoDB URI in .env
- ❌ Verify username/password is correct
- ❌ Check if IP address is whitelisted (Network Access)
- ❌ Check internet connection

### "Port 3000 already in use"

- Run: `npm start -- --port 3001`

### "Packages not displaying"

- Run: `npm run seed` to add packages
- Check MongoDB Atlas for data

### "Cannot POST /api/bookings"

- Check console (F12) for errors
- Verify MongoDB connection
- Check .env file

---

## 📚 File Descriptions

| File                 | Purpose                             |
| -------------------- | ----------------------------------- |
| `server.js`          | Main Express app & routes setup     |
| `models/Package.js`  | MongoDB schema for travel packages  |
| `models/Booking.js`  | MongoDB schema for bookings         |
| `models/Contact.js`  | MongoDB schema for contact messages |
| `routes/packages.js` | API endpoints for packages          |
| `routes/bookings.js` | API endpoints for bookings          |
| `routes/contact.js`  | API endpoints for contact           |
| `public/index.html`  | Website HTML                        |
| `public/style.css`   | Website styling                     |
| `public/script.js`   | Frontend JavaScript                 |
| `seedData.js`        | Script to add sample packages       |

---

## 🎯 Features Implemented

✅ Display travel packages from database
✅ Book packages with customer details
✅ Contact form submission
✅ RESTful API endpoints
✅ MongoDB Atlas integration
✅ Responsive UI design
✅ Error handling
✅ Data validation

---

## 💡 Customization Ideas

1. **Change website theme**: Edit `style.css`
2. **Add more packages**: Modify `seedData.js`
3. **Add user authentication**: Use JWT tokens
4. **Add payment gateway**: Integrate Stripe/PayPal
5. **Add email notifications**: Use Nodemailer
6. **Deploy on Heroku**: Update connection URL

---

## 📞 Support

If you encounter issues:

1. Check error messages in terminal
2. Check browser console (F12)
3. Review MongoDB Atlas logs
4. Verify all files are created
5. Ensure Node.js is installed correctly

---

**Happy Learning! 🎉**
