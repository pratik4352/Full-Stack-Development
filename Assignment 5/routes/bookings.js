const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Package = require('../models/Package');

// GET all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find().populate('packageId');
        res.json({ success: true, data: bookings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET single booking
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('packageId');
        if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
        res.json({ success: true, data: booking });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST new booking
router.post('/', async (req, res) => {
    try {
        const { customerName, email, phone, packageId, numberOfPeople, departureDate } = req.body;
        
        // Find package to calculate total price
        const pkg = await Package.findById(packageId);
        if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });
        
        const totalPrice = pkg.price * numberOfPeople;
        
        const newBooking = new Booking({
            customerName,
            email,
            phone,
            packageId,
            numberOfPeople,
            departureDate,
            totalPrice
        });
        
        const savedBooking = await newBooking.save();
        res.status(201).json({ success: true, data: savedBooking, message: 'Booking created successfully' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// UPDATE booking status
router.put('/:id', async (req, res) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: updatedBooking });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// DELETE booking
router.delete('/:id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Booking deleted' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
