const express = require('express');
const Review = require('../models/Review');
const Feedback = require('../models/Feedback');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create review
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.userRole !== 'instructor' && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Only instructors and admins can review' });
    }

    const { feedbackId, comment, action, actionDescription } = req.body;

    if (!feedbackId || !comment || !action) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    const review = new Review({
      feedback: feedbackId,
      reviewedBy: req.userId,
      comment,
      action,
      actionDescription,
    });

    await review.save();
    await review.populate('reviewedBy', 'name email');
    await review.populate('feedback');

    // Update feedback status
    feedback.status = action === 'approved' ? 'resolved' : action === 'rejected' ? 'rejected' : 'under-review';
    await feedback.save();

    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const reviews = await Review.find()
      .populate('reviewedBy', 'name email')
      .populate('feedback')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Review.countDocuments();

    res.status(200).json({
      reviews,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

// Get reviews for a specific feedback
router.get('/feedback/:feedbackId', async (req, res) => {
  try {
    const reviews = await Review.find({ feedback: req.params.feedbackId })
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

// Get reviews by reviewer
router.get('/reviewer/:reviewerId', authMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find({ reviewedBy: req.params.reviewerId })
      .populate('feedback')
      .sort({ createdAt: -1 });

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

// Update review
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.userRole !== 'instructor' && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.reviewedBy.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('reviewedBy', 'name email').populate('feedback');

    res.status(200).json({ message: 'Review updated', review: updatedReview });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
});

// Delete review
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.userRole !== 'instructor' && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.reviewedBy.toString() !== req.userId && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
});

module.exports = router;
