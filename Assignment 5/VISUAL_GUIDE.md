# 📸 VISUAL GUIDE: What You'll See

This guide shows exactly what you should see at each step.

---

## 🔧 STEP 1: MongoDB Atlas Setup (In Chrome)

### Screen 1: MongoDB Login

```
https://www.mongodb.com/cloud/atlas
↓
Click "Start free" (blue button)
↓
Sign up with email/Google
```

### Screen 2: Create Cluster

```
Dashboard opens
↓
Click "Create" → "Build a Cluster"
↓
Choose: Shared (Free tier) ✓
Select Region: (nearest to you)
↓
Click "Create Cluster"
⏳ Wait 5-10 minutes
✓ Green checkmark appears = READY
```

### Screen 3: Database User

```
Left sidebar: "Database Access"
↓
Click "+ Add New Database User"
↓
Fill:
  Username: travelhub
  Password: Travel@123
  Role: Atlas Admin
↓
Click "Add User"
✓ User created
```

### Screen 4: Network Access

```
Left sidebar: "Network Access"
↓
Click "+ Add IP Address"
↓
Select: "Allow Access from Anywhere"
IP: 0.0.0.0/0
↓
Click "Confirm"
✓ Access allowed
```

### Screen 5: Get Connection String

```
Left sidebar: "Clusters"
↓
Click "Connect" (button next to your cluster)
↓
Select: "Connect your application"
Choose: Node.js
Version: 4.1 or later
↓
You see:
mongodb+srv://travelhub:Travel@123@cluster0.mongodb.net/travel_agency?retryWrites=true&w=majority

📋 COPY THIS!
```

---

## 📝 STEP 2: Update .env File

### If using Atlas (online):

```
PORT=3000
MONGODB_URI=mongodb+srv://travelhub:Travel@123@cluster0.mongodb.net/travel_agency?retryWrites=true&w=majority
NODE_ENV=development
```

### If DNS/SRV is blocked (local mode):

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ass5
NODE_ENV=development
```

> Note: The app also supports local in-memory mode with automatic fallback in server.js (no external Atlas required).
> ✓ Save file (Ctrl+S)

---

## 🖥️ STEP 3: PowerShell Commands

### Terminal Window 1:

```powershell
PS C:\Users\prati\OneDrive\Desktop\full stack development\Assignment 5> npm start

added 123 packages...
✓ MongoDB Connected Successfully
✓ Server running on http://localhost:3000
Press Ctrl+C to stop the server
```

✓ **Keep this window OPEN!**

### Terminal Window 2 (NEW):

```powershell
PS C:\Users\prati\OneDrive\Desktop\full stack development\Assignment 5> npm run seed

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

✓ Close this window (seedData complete)

---

## 🌐 STEP 4: Website in Chrome

### Address Bar:

```
http://localhost:3000
```

### You See:

```
╔════════════════════════════════════════════════════════════════╗
║  ✈️ TravelHub                    Home | Packages | Contact      ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║         Explore the World with Us                              ║
║                                                                ║
║  Discover amazing travel packages and book your dream vacation ║
║                                                                ║
║              [Browse Packages Button]                          ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Our Travel Packages                                           ║
║                                                                ║
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         ║
║  │ParisRomance  │  │VeniceAdventure│ │BangkokDelight│         ║
║  │Paris, France │  │Venice, Italy  │ │Bangkok, Thai │         ║
║  │Duration:5 dy │  │Duration:4 day │ │Duration:6 dy │         ║
║  │Activity List │  │Activity List  │ │Activity List │         ║
║  │₹50,000       │  │₹45,000        │ │₹30,000       │         ║
║  │[Book Now]    │  │[Book Now]     │ │[Book Now]    │         ║
║  └──────────────┘  └──────────────┘  └──────────────┘         ║
║                                                                 ║
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         ║
║  │Swiss Alpine  │  │Tokyo Culture │  │Dubai Luxury  │         ║
║  │Switzerland   │  │Tokyo, Japan  │  │Dubai, UAE    │         ║
║  │Duration:7 dy │  │Duration:5 day │ │Duration:4 day │         ║
║  │Activity List │  │Activity List  │ │Activity List │         ║
║  │₹70,000       │  │₹55,000        │ │₹40,000       │         ║
║  │[Book Now]    │  │[Book Now]     │ │[Book Now]    │         ║
║  └──────────────┘  └──────────────┘  └──────────────┘         ║
║                                                                 ║
╠════════════════════════════════════════════════════════════════╣
║                                                                 ║
║  Get in Touch                                                  ║
║                                                                ║
║  Name        [_________________________]                       ║
║  Email       [_________________________]                       ║
║  Subject     [_________________________]                       ║
║  Message     [_____________________]                           ║
║                                                                ║
║              [Send Message Button]                             ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║  © 2024 TravelHub. All rights reserved.                        ║
╚════════════════════════════════════════════════════════════════╝
```

---

## 📅 STEP 5: Book a Package

### Click "Book Now" on Paris Package:

```
Browser shows prompt:
Enter your name: John Doe
Enter your email: john@example.com
Enter your phone number: 9876543210
Number of travelers: 2
Departure date (YYYY-MM-DD): 2024-06-15
```

### Success Message:

```
✓ Booking Successful!

Booking ID: 507f1f77bcf86cd799439011
Total Price: ₹100,000

We will contact you soon at john@example.com
```

---

## ✉️ STEP 6: Submit Contact Form

### Fill The Fields:

```
Name        [Jane Doe]
Email       [jane@example.com]
Subject     [Trip Inquiry]
Message     [I want more details about Dubai package]

[Send Message Button] ← Click this
```

### Success Message:

```
✓ Thank you for contacting us. We will reply soon!
```

Form automatically clears ✓

---

## 🗄️ STEP 7: Check MongoDB Data

### In MongoDB Atlas:

```
1. Login to: https://www.mongodb.com/cloud/atlas
2. Click "Clusters" → Your database
3. Click "Collections"
4. You see:
   - packages (contains 6 travel packages)
   - bookings (contains your booking)
   - contacts (contains your message)
```

### View Your Booking:

```
Click "bookings" collection
Click your booking document

You see:
{
  "_id": ObjectId("..."),
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "packageId": ObjectId("..."),
  "numberOfPeople": 2,
  "departureDate": "2024-06-15",
  "totalPrice": 100000,
  "status": "Pending",
  "createdAt": "2024-03-20T10:30:00.000Z"
}
```

### View Your Contact Message:

```
Click "contacts" collection
Click your message document

You see:
{
  "_id": ObjectId("..."),
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Trip Inquiry",
  "message": "I want more details about Dubai package",
  "createdAt": "2024-03-20T10:35:00.000Z"
}
```

---

## 🧪 STEP 8: Advanced Testing (Optional)

### Test API in Address Bar:

#### Test 1: Get All Packages

```
URL: http://localhost:3000/api/packages

Shows:
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "Paris Romance",
      "destination": "Paris, France",
      "duration": 5,
      "price": 50000,
      ...
    },
    ...
  ]
}
```

#### Test 2: Get All Bookings

```
URL: http://localhost:3000/api/bookings

Shows all bookings in JSON format
```

#### Test 3: Get All Contacts

```
URL: http://localhost:3000/api/contact

Shows all contact messages in JSON format
```

---

## 🧰 Chrome DevTools Testing

### Open Chrome DevTools (F12)

#### Step 1: Go to Network Tab

```
Press F12
Click "Network" tab
```

#### Step 2: Make a Request

```
On website, click "Book Now"
Enter all details
Submit booking
```

#### Step 3: View Request

```
In Network tab, see: POST /api/bookings
Click it, you see:
- Headers (request details)
- Request Body (your data)
- Response (booking confirmation with ID)
- Status: 201 (Created = Success!)
```

#### Step 4: View Console

```
Click "Console" tab
No red errors = Everything working! ✓
You might see: "Booking created successfully"
```

---

## 🚨 STEP 9: If Something Goes Wrong

### Scenario 1: MongoDB Connection Error

```
Terminal shows:
✗ MongoDB connection refused

Fix:
1. Check .env file
2. Verify MongoDB_URI is correct
3. Check MongoDB Atlas Network Access
4. Wait a few minutes and retry
```

### Scenario 2: No Packages Showing

```
Website shows:
"No packages available"

Fix:
1. In new terminal, run: npm run seed
2. Wait for completion
3. Refresh website (F5)
```

### Scenario 3: Port 3000 in Use

```
Terminal shows:
Error: Port 3000 already in use

Fix:
Run: npm start -- --port 3001
Then visit: http://localhost:3001
```

---

## ✅ VERIFICATION CHECKLIST

Print this page and check as you go:

```
MONGODB SETUP:
[ ] Account created
[ ] Cluster created (green check)
[ ] User created (travelhub)
[ ] Network access enabled (0.0.0.0/0)
[ ] Connection string copied

ENVIRONMENT:
[ ] .env file updated
[ ] MongoDB_URI correct

PROJECT STARTUP:
[ ] npm start - works without errors
[ ] Shows "✓ MongoDB Connected Successfully"
[ ] Shows "✓ Server running on http://localhost:3000"

DATA LOADING:
[ ] npm run seed - completes successfully
[ ] 6 packages added message shown

WEBSITE:
[ ] Website loads: http://localhost:3000
[ ] TravelHub logo visible
[ ] Hero section displays
[ ] 6 packages visible
[ ] Colors and layout look right

BOOKING:
[ ] Click "Book Now" works
[ ] Name/email/phone prompts appear
[ ] Can fill all fields
[ ] Success message appears
[ ] Booking ID shown

CONTACT:
[ ] Contact form visible
[ ] Can fill form fields
[ ] Submit button works
[ ] Success message shows

DATABASE:
[ ] MongoDB Atlas shows data
[ ] bookings collection has booking
[ ] contacts collection has message

API TESTING:
[ ] http://localhost:3000/api/packages → Shows JSON
[ ] http://localhost:3000/api/bookings → Shows JSON

CONSOLE:
[ ] Press F12 → Console tab
[ ] No red errors

READY TO SUBMIT:
[ ] All above checked
[ ] No errors anywhere
[ ] Website fully functional
```

---

## 🎯 SUMMARY

You should see:

1. ✅ Beautiful travel website
2. ✅ 6 travel packages with details
3. ✅ Booking system working
4. ✅ Contact form working
5. ✅ Data saved in MongoDB
6. ✅ Everything functional!

**If you see all this, you're DONE!** 🎉

Submit your assignment with confidence! ✈️
