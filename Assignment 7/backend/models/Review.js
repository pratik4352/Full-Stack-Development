const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  feedback: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Feedback',
    required: true,
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    enum: ['approved', 'rejected', 'needs-revision'],
    required: true,
  },
  actionDescription: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
