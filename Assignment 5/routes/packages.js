const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// GET all packages
router.get('/', async (req, res) => {
    try {
        const packages = await Package.find();
        res.json({ success: true, data: packages });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET single package
router.get('/:id', async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (!pkg) return res.status(404).json({ success: false, message: 'Package not found' });
        res.json({ success: true, data: pkg });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST new package (for admin)
router.post('/', async (req, res) => {
    try {
        const newPackage = new Package(req.body);
        const savedPackage = await newPackage.save();
        res.status(201).json({ success: true, data: savedPackage });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// UPDATE package
router.put('/:id', async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: updatedPackage });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// DELETE package
router.delete('/:id', async (req, res) => {
    try {
        await Package.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Package deleted' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
