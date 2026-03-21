const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String },
  customerPhone: { type: String },
  appointmentDate: { type: Date, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
