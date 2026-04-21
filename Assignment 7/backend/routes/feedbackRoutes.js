const express = require('express');
const Feedback = require('../models/Feedback');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create feedback
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, category, rating, course, instructor, anonymous } = req.body;

    if (!title || !description || !category || !rating) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const feedback = new Feedback({
      title,
      description,
      category,
      rating,
      submittedBy: req.userId,
      course,
      instructor,
      anonymous: anonymous || false,
    });

    await feedback.save();
    await feedback.populate('submittedBy', 'name email');

    res.status(201).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error creating feedback', error: error.message });
  }
});

// Get all feedbacks
router.get('/', async (req, res) => {
  try {
    const { category, status, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const feedbacks = await Feedback.find(filter)
      .populate('submittedBy', 'name email')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Feedback.countDocuments(filter);

    res.status(200).json({
      feedbacks,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks', error: error.message });
  }
});

// Get feedback by id
router.get('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate('submittedBy', 'name email');

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
});

// Update feedback (only submitter or admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    if (feedback.submittedBy.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('submittedBy', 'name email');

    res.status(200).json({ message: 'Feedback updated', feedback: updatedFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback', error: error.message });
  }
});

// Delete feedback (only submitter or admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    if (feedback.submittedBy.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Feedback.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error: error.message });
  }
});

// Get feedbacks by user
router.get('/user/:userId', async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ submittedBy: req.params.userId })
      .populate('submittedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ feedbacks });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user feedbacks', error: error.message });
  }
});

module.exports = router;
