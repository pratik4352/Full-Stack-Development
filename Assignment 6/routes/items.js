const express = require('express');
const router = express.Router();
const { db } = require('../db');

function buildId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

router.get('/', async (req, res) => {
  try {
    const items = (db.data.items || []).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = (db.data.items || []).find((x) => x._id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, category, condition, price, sellerName, location } = req.body;
    if (!title || !category || !price || !sellerName) {
      return res.status(400).json({ error: 'title, category, price and sellerName are required' });
    }
    const item = {
      _id: buildId(),
      title,
      description: description || '',
      category,
      condition: condition || 'used',
      price: Number(price),
      sellerName,
      location: location || 'Unknown',
      createdAt: new Date().toISOString(),
    };

    db.data.items.push(item);
    await db.write();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const itemIndex = (db.data.items || []).findIndex((x) => x._id === req.params.id);
    if (itemIndex === -1) return res.status(404).json({ error: 'Item not found' });
    const updates = req.body;
    db.data.items[itemIndex] = { ...db.data.items[itemIndex], ...updates };
    await db.write();
    res.json(db.data.items[itemIndex]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const itemIndex = (db.data.items || []).findIndex((x) => x._id === req.params.id);
    if (itemIndex === -1) return res.status(404).json({ error: 'Item not found' });
    const deleted = db.data.items.splice(itemIndex, 1)[0];
    db.data.bookings = (db.data.bookings || []).filter((b) => b.item !== deleted._id);
    await db.write();
    res.json({ message: 'Item deleted', item: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/book', async (req, res) => {
  try {
    const item = (db.data.items || []).find((x) => x._id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    const { customerName, customerEmail, customerPhone, appointmentDate, notes } = req.body;
    if (!customerName || !appointmentDate) {
      return res.status(400).json({ error: 'customerName and appointmentDate are required' });
    }

    const booking = {
      _id: buildId(),
      item: item._id,
      customerName,
      customerEmail: customerEmail || '',
      customerPhone: customerPhone || '',
      appointmentDate: new Date(appointmentDate).toISOString(),
      notes: notes || '',
      createdAt: new Date().toISOString(),
    };

    db.data.bookings.push(booking);
    await db.write();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
