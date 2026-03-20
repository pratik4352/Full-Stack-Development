const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all contact messages (public for travelers)
router.get('/', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST new contact message
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        // Validate input
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        
        const newContact = new Contact({ name, email, subject, message });
        const savedContact = await newContact.save();
        
        res.status(201).json({ 
            success: true, 
            data: savedContact,
            message: 'Thank you for contacting us. We will reply soon!' 
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
