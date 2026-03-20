# 🎓 Assignment 5: Travel Website with Node.js + MongoDB

## ✅ Project Status: READY TO RUN

Your complete travel agency website is ready! All files have been created and dependencies installed.

---

## 📁 Project Structure

```
Assignment 5/
│
├── 📄 server.js                    # Main Express application
├── 📄 seedData.js                  # Script to populate MongoDB with sample data
├── 📄 package.json                 # Node.js dependencies (npm packages)
├── 📄 .env                         # Environment variables (MongoDB connection)
│
├── 📁 models/                      # MongoDB Schemas
│   ├── Package.js                  # Travel package schema
│   ├── Booking.js                  # Booking schema
│   └── Contact.js                  # Contact form schema
│
├── 📁 routes/                      # API Endpoints
│   ├── packages.js                 # GET/POST/PUT/DELETE packages
│   ├── bookings.js                 # GET/POST/PUT/DELETE bookings
│   └── contact.js                  # GET/POST contact messages
│
├── 📁 public/                      # Frontend (Client-side)
│   ├── index.html                  # Website HTML
│   ├── style.css                   # Styling
│   └── script.js                   # JavaScript logic & API calls
│
├── 📚 Documentation:
│   ├── README.md                   # Complete setup guide
│   ├── MONGODB_CHROME_GUIDE.md     # MongoDB + Chrome detailed steps
│   └── QUICK_START.md              # 5-minute quick start
│
└── 📁 node_modules/                # Installed packages (auto-generated)
```

---

## 🚀 Step-by-Step Execution

### **STEP 1: Create MongoDB Online (15 minutes)**

**Open Chrome and do this:**

1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Start free" → Sign up
3. Create cluster (Shared/Free tier)
4. In "Database Access" → Add user:
   - Username: `travelhub`
   - Password: `Travel@123`
5. In "Network Access" → Add IP:
   - Allow Access from Anywhere (0.0.0.0/0)
6. Go to Clusters → Click "Connect" → Get connection string
   - Copy the string (looks like below):
   ```
   mongodb+srv://travelhub:Travel@123@cluster0.mongodb.net/travel_agency?retryWrites=true&w=majority
   ```

### **STEP 2: Update .env File**

Edit the `.env` file in your project folder:

```
PORT=3000
MONGODB_URI=mongodb+srv://travelhub:Travel@123@cluster0.mongodb.net/travel_agency?retryWrites=true&w=majority
NODE_ENV=development
```

**⚠️ IMPORTANT:**

- Replace `travelhub` with YOUR username
- Replace `Travel@123` with YOUR password
- Replace `cluster0` with YOUR cluster name
- Keep everything else the same

### **STEP 3: Start the Server**

Open PowerShell in your project folder and run:

```bash
npm start
```

**Expected output:**

```
✓ MongoDB Connected Successfully
✓ Server running on http://localhost:3000
Press Ctrl+C to stop the server
```

### **STEP 4: Add Sample Data**

Open a NEW PowerShell (keep the previous one running) and run:

```bash
npm run seed
```

**Expected output:**

```
✓ MongoDB connected
✓ Cleared existing packages
✓ 6 packages added to database
Packages added:
  - Paris Romance (Paris, France) - ₹50000
  - Venice Adventure (Venice, Italy) - ₹45000
  - Bangkok Delight (Bangkok, Thailand) - ₹30000
  - Swiss Alpine (Switzerland) - ₹70000
  - Tokyo Culture (Tokyo, Japan) - ₹55000
  - Dubai Luxury (Dubai, UAE) - ₹40000
```

### **STEP 5: Open Website in Chrome**

1. Open Chrome
2. Type: `http://localhost:3000`
3. Press Enter

**You should see:**

- Navigation bar "✈️ TravelHub"
- Hero section with banner
- 6 travel packages displayed
- Contact form at bottom

---

## 🧪 Testing the Website

### **Test 1: View Packages**

1. On website, scroll down
2. See all 6 travel packages with details
3. ✅ Success if packages appear

### **Test 2: Book a Package**

1. Click "Book Now" on any package
2. Enter:
   - Name: John Doe
   - Email: john@email.com
   - Phone: 9876543210
   - Number of people: 2
   - Departure date: 2024-06-15
3. You'll see: "✓ Booking Successful! Booking ID: xxxxx"
4. ✅ Success if message appears

### **Test 3: Submit Contact Form**

1. Scroll to "Get in Touch" section
2. Fill form:
   - Name: Jane Doe
   - Email: jane@email.com
   - Subject: Trip Inquiry
   - Message: I want more details
3. Click "Send Message"
4. You'll see: "✓ Thank you for contacting us..."
5. ✅ Success if message appears

### **Test 4: Check MongoDB Data**

1. Open MongoDB Atlas: https://www.mongodb.com/cloud/atlas
2. Go to Clusters → Database → Collections
3. Click "bookings" collection → see your booking data
4. Click "contacts" collection → see your contact message
5. ✅ Success if data appears in MongoDB

---

## 🔍 Monitor API Calls (For Submission Proof)

### **Method 1: Chrome DevTools**

1. On website, press `F12` (open Developer Tools)
2. Click "Network" tab
3. Click "Book Now" button
4. In Network tab, you'll see POST request to `/api/bookings`
5. Click it to see:
   - Request headers
   - Request body (your data)
   - Response data (booking ID)
   - Status 201 (Created)

### **Method 2: Direct API Test**

1. Open Chrome address bar
2. Type: `http://localhost:3000/api/packages`
3. Press Enter
4. You'll see all packages in JSON format (proof of database connection)

### **Method 3: Server Console**

1. In PowerShell where server is running
2. Every request shows:
   - GET /api/packages
   - POST /api/bookings
   - POST /api/contact
3. ✅ Proof that requests are being processed

---

## 📊 Database Schema

### **Packages Collection**

```
{
  "_id": ObjectId,
  "name": "Paris Romance",
  "destination": "Paris, France",
  "duration": 5,
  "price": 50000,
  "description": "Experience the city of love...",
  "activities": ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
  "createdAt": Date,
  "updatedAt": Date
}
```

### **Bookings Collection**

```
{
  "_id": ObjectId,
  "customerName": "John Doe",
  "email": "john@email.com",
  "phone": "9876543210",
  "packageId": ObjectId,
  "numberOfPeople": 2,
  "departureDate": Date,
  "totalPrice": 100000,
  "status": "Pending",
  "createdAt": Date
}
```

### **Contacts Collection**

```
{
  "_id": ObjectId,
  "name": "Jane Doe",
  "email": "jane@email.com",
  "subject": "Trip Inquiry",
  "message": "I want more details",
  "createdAt": Date
}
```

---

## 🛠️ Available Commands

```bash
## Start server (development mode)
npm start

## Seed database with sample packages
npm run seed

## Stop server
Ctrl + C
```

---

## ✨ Features Implemented

✅ **Frontend**

- Beautiful responsive UI
- Navigation bar
- Hero section with call-to-action
- Travel packages grid display
- Contact form
- Client-side validation

✅ **Backend - API Endpoints**

- GET /api/packages - Get all packages
- GET /api/packages/:id - Get single package
- POST /api/packages - Create package (admin)
- PUT /api/packages/:id - Update package (admin)
- DELETE /api/packages/:id - Delete package (admin)
- GET /api/bookings - Get all bookings
- POST /api/bookings - Create booking
- PUT /api/bookings/:id - Update booking status
- DELETE /api/bookings/:id - Cancel booking
- GET /api/contact - Get all contact messages
- POST /api/contact - Submit contact form

✅ **Database - MongoDB**

- Package management
- Booking management
- Contact form storage
- Automatic timestamps
- Data relationships (FK: packageId in bookings)

✅ **Security & Best Practices**

- Environment variables (.env)
- CORS enabled
- Error handling
- Input validation
- RESTful API design

---

## 🐛 Troubleshooting

### ❌ "MongoDB Connection Error"

**Fix:**

1. Check `.env` file MongoDB_URI
2. Verify credentials (username/password) are correct
3. In MongoDB Atlas, check Network Access (allow 0.0.0.0/0)
4. Make sure cluster is created (green check)
5. Restart server

### ❌ "Cannot GET /api/packages"

**Fix:**

1. Check if server is running (should show "Server running...")
2. Check if MongoDB is connected (should show "MongoDB Connected...")
3. Open Chrome DevTools (F12) → Console tab
4. Look for error messages

### ❌ "No packages display on website"

**Fix:**

1. Run: `npm run seed`
2. Check MongoDB Atlas Collections (packages collection should have 6 items)
3. Refresh website (F5 in Chrome)

### ❌ "Port 3000 already in use"

**Fix:**

1. Stop other application using port 3000
2. Or run server on different port: `npm start -- --port 3001`

### ❌ "Connection string format error"

**Fix:**

1. Copy connection string from MongoDB Atlas again
2. Ensure it contains:
   - `mongodb+srv://` (not `mongodb://`)
   - Your username and password
   - Correct cluster name
   - Database name at end

---

## 📈 Submission Checklist

- [ ] MongoDB Atlas account created with online database
- [ ] .env file configured with correct MongoDB URI
- [ ] All npm packages installed
- [ ] Server runs without errors: `npm start`
- [ ] Sample data added: `npm run seed`
- [ ] Website accessible: http://localhost:3000
- [ ] Packages display correctly
- [ ] Can book packages (creates booking in database)
- [ ] Can submit contact form (saves to database)
- [ ] Can view all data in MongoDB Atlas Collections
- [ ] API endpoints respond correctly
- [ ] Chrome DevTools shows successful API calls

---

## 📚 Documentation Files

- **README.md** - Complete detailed setup guide
- **MONGODB_CHROME_GUIDE.md** - Step-by-step MongoDB setup with Chrome
- **QUICK_START.md** - 5-minute quick start reference

---

## 🎯 Project Complete!

**All files created:**

- ✅ server.js
- ✅ 3 models (Package, Booking, Contact)
- ✅ 3 route files (packages, bookings, contact)
- ✅ Frontend (index.html, style.css, script.js)
- ✅ seedData.js
- ✅ .env
- ✅ package.json

**Next steps:**

1. Update .env with MongoDB connection string
2. Run `npm start`
3. Run `npm run seed`
4. Open http://localhost:3000
5. Test all features
6. Submit

---

## 💬 Quick Questions Answered

**Q: Can I use different website theme (college/insurance)?**
A: Yes! Modify `seedData.js` with your data, change colors in `style.css`

**Q: How do I deploy this online?**
A: Use Heroku (free tier available), just push code to GitHub

**Q: Can I add more features?**
A: Yes! Add authentication, payments, email notifications, etc.

**Q: What if I lose data?**
A: MongoDB Atlas keeps backups automatically

**Q: How long does MongoDB Atlas setup take?**
A: Usually 5-10 minutes to create cluster

---

**🎉 You're all set! Good luck with your assignment!**
