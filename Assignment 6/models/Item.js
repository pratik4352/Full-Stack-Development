const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, trim: true },
  category: { type: String, required: true },
  condition: { type: String, enum: ['new', 'used', 'fair', 'good'], default: 'used' },
  price: { type: Number, required: true },
  sellerName: { type: String, required: true },
  location: { type: String, default: 'Unknown' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);
