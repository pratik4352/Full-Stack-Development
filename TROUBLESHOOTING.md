# 🆘 Troubleshooting Checklist

Use this checklist if something isn't working.

---

## ✅ Pre-Setup Checks

### Node.js Installed?

```bash
node --version
npm --version
```

Both should show version numbers (e.g., v18.0.0)

**❌ If not showing version:**

- Download from: https://nodejs.org/
- Install Node.js LTS version
- Restart PowerShell after installation

---

## ✅ MongoDB Atlas Setup Checks

### ✓ Account Created?

- [ ] Email verified
- [ ] Account activated
- [ ] Able to login to https://www.mongodb.com/cloud/atlas

### ✓ Cluster Created?

- [ ] In MongoDB Atlas dashboard
- [ ] Go to "Clusters"
- [ ] You should see "Cluster0" with GREEN checkmark
- [ ] If still showing loading icon, wait 10 more minutes

### ✓ Database User Created?

- [ ] Go to "Database Access"
- [ ] Should see a user listed (username: travelhub)
- [ ] Status should be "ACTIVE"

### ✓ Network Access Configured?

- [ ] Go to "Network Access"
- [ ] Should see IP address "0.0.0.0/0" listed
- [ ] Status should be "ACTIVE"

### ✓ Connection String Retrieved?

- [ ] Go to Clusters → Click "Connect"
- [ ] Choose "Connect your application"
- [ ] Select Node.js
- [ ] You see connection string
- [ ] String includes: `mongodb+srv://travelhub:Travel@123@...`

---

## ✅ .env File Checks

### Is .env File Exists?

In your project folder, check:

- [ ] File named `.env` exists (check in VS Code or folder)

### Connection String Correct?

Open `.env` file and verify:

- [ ] Starts with: `mongodb+srv://`
- [ ] Contains your USERNAME (or travelhub)
- [ ] Contains your PASSWORD (or Travel@123)
- [ ] Contains your CLUSTER name (or cluster0)
- [ ] Ends with: `?retryWrites=true&w=majority`

**Example:**

```
MONGODB_URI=mongodb+srv://travelhub:Travel@123@cluster0.mongodb.net/travel_agency?retryWrites=true&w=majority
```

---

## ✅ Project Files Checks

### Are All Files Created?

In `Assignment 5` folder, check:

- [ ] `server.js` exists
- [ ] `seedData.js` exists
- [ ] `package.json` exists
- [ ] `.env` exists
- [ ] Folder `models/` exists with 3 files
- [ ] Folder `routes/` exists with 3 files
- [ ] Folder `public/` exists with 3 files
- [ ] Folder `node_modules/` exists (auto-generated)

---

## ✅ Dependencies Installed?

In PowerShell, check:

- [ ] `node_modules` folder is large (not empty)
- [ ] Run: `npm list` - should show all packages
- [ ] Should include: express, mongoose, dotenv, cors

---

## ✅ Server Starting Checks

### Run This Command:

```bash
npm start
```

### Expected Output:

```
✓ MongoDB Connected Successfully
✓ Server running on http://localhost:3000
Press Ctrl+C to stop the server
```

### ❌ If You See Different Messages:

**Message: "MongoDB connection refused"**

1. Check .env MongoDB_URI
2. Verify Network Access in MongoDB Atlas (0.0.0.0/0)
3. Check username/password correct
4. Make sure cluster is created (green check)

**Message: "Port 3000 already in use"**

1. Another application using port 3000
2. Kill other process or use different port:
   ```bash
   npm start -- --port 3001
   ```

**Message: "Cannot find module 'express'"**

1. Dependencies not installed
2. Run: `npm install`
3. Wait for completion
4. Try `npm start` again

**Message: "Error: Cannot find module '.env'"**

1. .env file not found
2. Check if `.env` file exists in project folder
3. If not, create it with correct MongoDB URI

---

## ✅ Website Loading Checks

### Open Chrome Browser:

Type: `http://localhost:3000`

### Should See:

- [ ] Page loads without error
- [ ] Title shows "Travel Agency Website"
- [ ] Navigation bar visible (TravelHub logo)
- [ ] Hero section with banner
- [ ] 6 travel packages displayed
- [ ] Contact form at bottom

### ❌ If Website Not Loading:

**"Cannot reach http://localhost:3000"**

1. Check if server is running (terminal should show "Server running...")
2. Check for errors in terminal
3. Try: http://localhost:3000/api/packages (should show packages JSON)

**"Packages not displaying"**

1. Run: `npm run seed` (in new terminal)
2. Wait for "packages added" message
3. Refresh website (F5 in Chrome)
4. Check MongoDB Atlas Collections (packages should have 6 items)

**"Get in style.css Error (404)"**

1. Check if `public/style.css` file exists
2. If not, recreate from this project files
3. Refresh webpage (Ctrl+Shift+R for full refresh)

---

## ✅ Functionality Checks

### Test Book Package:

1. [ ] Click "Book Now" button
2. [ ] Enter name, email, phone, number, date when prompted
3. [ ] Get confirmation message "✓ Booking Successful!"
4. [ ] Booking ID shown in alert

### Test Contact Form:

1. [ ] Fill name, email, subject, message
2. [ ] Click "Send Message"
3. [ ] Get confirmation "✓ Thank you for contacting us..."
4. [ ] Form clears after submission

### Check Database Saved:

1. [ ] Open MongoDB Atlas in Chrome
2. [ ] Go to Collections
3. [ ] Click "bookings" - see your booking
4. [ ] Click "contacts" - see your message

---

## ✅ API Testing Checks

### Test 1: Get All Packages

```
Open Chrome: http://localhost:3000/api/packages
Should see: JSON array with 6 packages
```

### Test 2: Check Console Logs

```bash
Press F12 in Chrome
Click "Console" tab
Submit booking
Should see: "Booking created successfully" message
```

### Test 3: Check Network Requests

```bash
Press F12 in Chrome
Click "Network" tab
Click "Book Now" button
In Network tab, click POST request to /api/bookings
Check:
- Status should be 201 (Created)
- Response shows booking with ID
- Request body shows your data
```

---

## 🔧 Common Fix Commands

### Reset Everything and Start Fresh:

```bash
# Stop server (Ctrl+C if running)
# Then run:
rm -r node_modules
npm install
npm run seed
npm start
```

### Clear Browser Cache:

- Chrome: Ctrl+Shift+Delete
- Select "Cookies and other site data"
- Click "Clear data"

### Test MongoDB Connection Directly:

```bash
# In PowerShell, test connection string:
node -e "require('mongoose').connect('your_mongodb_uri_here').then(() => console.log('Connected')).catch(e => console.log('Error:', e.message))"
```

### Restart Everything:

1. Close all PowerShell terminals (Ctrl+C)
2. Close all Chrome tabs with localhost
3. Open new PowerShell
4. Run: `npm start`
5. Open Chrome: http://localhost:3000

---

## 📋 Before Submission

Make sure ALL these work:

- [ ] npm start - server runs successfully
- [ ] Website loads: http://localhost:3000
- [ ] 6 packages display
- [ ] Can book packages
- [ ] Booking saves to MongoDB
- [ ] Can submit contact form
- [ ] Contact saves to MongoDB
- [ ] API endpoints respond (test in address bar)
- [ ] Chrome DevTools shows successful requests

---

## 📞 Still Stuck?

1. **Read the guides:**
   - README.md (complete guide)
   - PROJECT_SUMMARY.md (overview)
   - MONGODB_CHROME_GUIDE.md (MongoDB steps)

2. **Check error messages:**
   - Terminal (where server runs)
   - Browser Console (F12)
   - MongoDB Atlas logs

3. **Verify:**
   - All files created
   - .env file correct
   - MongoDB cluster created
   - Network access enabled
   - Dependencies installed

4. **Try reset:**
   - Delete node_modules
   - Run: npm install
   - Run: npm run seed
   - Run: npm start

---

**Remember:** Most issues are:

1. Wrong MongoDB URI in .env
2. MongoDB cluster not created yet (wait for green check)
3. Network access not allowed (set to 0.0.0.0/0)
4. Dependencies not installed (run npm install)
5. Port already in use (use different port)

Good luck! 🎉
