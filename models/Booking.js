const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    packageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
    numberOfPeople: { type: Number, required: true },
    departureDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
