# 🎯 QUICK REFERENCE CHECKLIST

**Print this page and check off each item as you complete it!**

---

## BEFORE YOU START

- [ ] Node.js installed (check: `node --version` should show version)
- [ ] npm installed (check: `npm --version` should show version)
- [ ] Chrome browser open
- [ ] Assignment 5 folder open

---

## STEP 1: CREATE MONGODB ATLAS (5 min)

### Create Account

- [ ] Go to: https://www.mongodb.com/cloud/atlas
- [ ] Click "Start free"
- [ ] Sign up with email
- [ ] Verify email
- [ ] Login

### Create Cluster

- [ ] Click "Create" → "Build a Cluster"
- [ ] Select: Shared (Free)
- [ ] Select: Region nearest to you
- [ ] Click "Create Cluster"
- [ ] **WAIT 5-10 MINUTES** (Green checkmark = ready)

### Create Database User

- [ ] Left menu: "Database Access"
- [ ] Click "+ Add New Database User"
- [ ] Username: `travelhub`
- [ ] Password: `Travel@123`
- [ ] Role: `Atlas Admin`
- [ ] Click "Add User"
- [ ] Status: `ACTIVE`

### Allow Network Access

- [ ] Left menu: "Network Access"
- [ ] Click "+ Add IP Address"
- [ ] Click "Allow Access from Anywhere"
- [ ] Click "Confirm"
- [ ] Status: `ACTIVE`

### Get Connection String

- [ ] Go to: Clusters → Click "Connect"
- [ ] Choose: "Connect your application"
- [ ] Driver: Node.js
- [ ] Version: 4.1 or later
- [ ] Find in yellow box:
  ```
  mongodb+srv://travelhub:Travel@123@cluster0.mongodb.net/travel_agency?retryWrites=true&w=majority
  ```
- [ ] **COPY THIS STRING!**

**✓ MongoDB Ready!**

---

## STEP 2: UPDATE .env FILE (1 min)

- [ ] Open: `Assignment 5\.env`
- [ ] Find line: `MONGODB_URI=...`
- [ ] Replace with your connection string:
  ```
  MONGODB_URI=mongodb+srv://travelhub:Travel@123@cluster0.mongodb.net/travel_agency?retryWrites=true&w=majority
  ```
- [ ] Save file (Ctrl+S)

**✓ Configuration Ready!**

---

## STEP 3: START SERVER (2 min)

- [ ] Open PowerShell in `Assignment 5` folder
- [ ] Run: `npm start`
- [ ] Wait for this message:
  ```
  ✓ MongoDB Connected Successfully
  ✓ Server running on http://localhost:3000
  ```
- [ ] **KEEP THIS WINDOW OPEN!** (Do not close)

**✓ Server Running!**

---

## STEP 4: ADD SAMPLE DATA (1 min)

- [ ] Open **NEW** PowerShell (keep previous one running!)
- [ ] Run: `npm run seed`
- [ ] Wait for:
  ```
  ✓ 6 packages added to database
  ```
- [ ] Close this PowerShell

**✓ Data Added!**

---

## STEP 5: TEST WEBSITE (2 min)

### Open Website

- [ ] Open Chrome
- [ ] Go to: `http://localhost:3000`
- [ ] Press Enter

### Verify Page Loads

- [ ] Page loads without error
- [ ] See "✈️ TravelHub" logo
- [ ] See hero banner
- [ ] See 6 package cards

**✓ Website Live!**

---

## STEP 6: TEST BOOKING (1 min)

### Book Package

- [ ] Scroll down to packages
- [ ] Click "Book Now" on any package
- [ ] Enter prompts:
  - Name: `John Doe`
  - Email: `john@example.com`
  - Phone: `9876543210`
  - People: `2`
  - Date: `2024-06-15`
- [ ] See success message:
  ```
  ✓ Booking Successful!
  Booking ID: [shows ID]
  ```

**✓ Booking Works!**

---

## STEP 7: TEST CONTACT FORM (1 min)

### Fill Form

- [ ] Scroll to bottom
- [ ] Find "Get in Touch" section
- [ ] Fill form:
  - Name: `Test User`
  - Email: `test@example.com`
  - Subject: `Test Message`
  - Message: `This is a test`
- [ ] Click "Send Message"
- [ ] See success message:
  ```
  ✓ Thank you for contacting us
  ```

**✓ Contact Form Works!**

---

## STEP 8: VERIFY DATA IN MONGODB (1 min)

### Check MongoDB Atlas

- [ ] Open Chrome
- [ ] Go to: https://www.mongodb.com/cloud/atlas
- [ ] Login with your account
- [ ] Click "Clusters" → Your Database
- [ ] Click "Collections"
- [ ] See folders:
  - [ ] packages (6 items)
  - [ ] bookings (your booking)
  - [ ] contacts (your message)

**✓ Data Saved!**

---

## STEP 9: TEST API ENDPOINTS (1 min)

### Test 1: Packages

- [ ] Open new Chrome tab
- [ ] Go to: `http://localhost:3000/api/packages`
- [ ] See: JSON array with 6 packages

### Test 2: Browser Console

- [ ] Press F12 (Developer Tools)
- [ ] Click "Console" tab
- [ ] No red error messages
- [ ] Books or contacts messages appear

**✓ APIs Working!**

---

## ✅ FINAL VERIFICATION

Check ALL of these:

- [ ] MongoDB Atlas account created
- [ ] .env file updated with correct MongoDB URI
- [ ] npm install completed
- [ ] npm start - server running
- [ ] npm run seed - sample data added
- [ ] Website loads: http://localhost:3000
- [ ] All 6 packages display
- [ ] Can book packages
- [ ] Bookings save to MongoDB
- [ ] Can submit contact form
- [ ] Contact saves to MongoDB
- [ ] API endpoints work
- [ ] No console errors
- [ ] All documentation files present

**If ALL checked: ✅ YOU'RE DONE!**

---

## 🚨 QUICK TROUBLESHOOTING

| Problem                       | Solution                                   |
| ----------------------------- | ------------------------------------------ |
| "MongoDB connection refused"  | Check .env file MongoDB_URI correct        |
| "No packages showing"         | Run: `npm run seed`                        |
| "Cannot reach localhost:3000" | Check if server is running                 |
| "Port 3000 already in use"    | Run: `npm start -- --port 3001`            |
| "Packages not loading"        | Check MongoDB Atlas cluster (green check?) |
| "Contact form not working"    | Check browser console F12 for errors       |

---

## 📞 HELP

- Read: `TROUBLESHOOTING.md` (most issues solved here)
- Read: `MONGODB_CHROME_GUIDE.md` (MongoDB setup help)
- Read: `README.md` (complete guide)

---

## 🎉 SUBMISSION

When everything works:

1. Keep screenshot of website
2. Keep screenshot of MongoDB Collections showing data
3. Keep this checklist marked ✓
4. Submit assignment!

---

**TOTAL TIME: ~15-20 minutes** ⏱️

**Work Start Time:** ****\_\_\_****
**Expected Finish Time:** ****\_\_\_****

Good luck! 🚀✈️
