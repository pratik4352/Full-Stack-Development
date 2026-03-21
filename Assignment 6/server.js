const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { initDB } = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const itemsRouter = require('./routes/items');
const bookingsRouter = require('./routes/bookings');

app.use('/api/items', itemsRouter);
app.use('/api/bookings', bookingsRouter);

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

initDB()
  .then(() => {
    console.log('Using local JSON DB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('DB initialization error:', error);
    process.exit(1);
  });
