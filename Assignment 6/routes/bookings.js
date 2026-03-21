const express = require('express');
const router = express.Router();
const { db } = require('../db');

router.get('/', async (req, res) => {
  try {
    const bookings = (db.data.bookings || []).map((booking) => {
      const item = (db.data.items || []).find((i) => i._id === booking.item);
      return {
        ...booking,
        item: item
          ? { _id: item._id, title: item.title, category: item.category, price: item.price }
          : null,
      };
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
