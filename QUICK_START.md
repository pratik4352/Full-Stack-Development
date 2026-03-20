# ⚡ Quick Start Guide (5 Minutes)

## 🎯 What You Need to Do

### **1️⃣ Get MongoDB Connection String**

- Go to: https://www.mongodb.com/cloud/atlas
- Sign up (free) → Create cluster → Get connection string
- String looks like: `mongodb+srv://USERNAME:PASSWORD@cluster0.mongodb.net/dbname?retryWrites=true&w=majority`

### **2️⃣ Update .env File**

Replace `MONGODB_URI` value with your connection string:

```
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/travel_agency?retryWrites=true&w=majority
```

### **3️⃣ Start Server**

In project folder (PowerShell/Terminal):

```bash
npm start
```

Wait for: `✓ MongoDB Connected Successfully`

### **4️⃣ Add Sample Data**

In new terminal (keep previous running):

```bash
npm run seed
```

### **5️⃣ Open Website**

Chrome address bar: `http://localhost:3000`

---

## ✅ You're Done!

The website has:

- ✅ 6 travel packages from MongoDB
- ✅ Book packages (saves to database)
- ✅ Contact form (saves to database)
- ✅ Beautiful UI
- ✅ API endpoints

---

## 🔍 Test It

1. **View Packages**: Scroll down on website
2. **Book Package**: Click "Book Now" → Fill details
3. **Submit Contact**: Scroll down → Fill contact form
4. **Check Database**: MongoDB Atlas → Collections → packages/bookings/contacts

---

## 📞 If Stuck

### Connection Error?

- Check .env file (MongoDB_URI)
- Verify username/password correct
- Check Network Access in MongoDB Atlas (allow 0.0.0.0/0)

### No Packages Showing?

- Run: `npm run seed`
- Check MongoDB Atlas

### Port 3000 Already Used?

- Run: `npm start -- --port 3001`

---

**Full guides in:**

- `README.md` - Complete setup
- `MONGODB_CHROME_GUIDE.md` - MongoDB detailed steps
