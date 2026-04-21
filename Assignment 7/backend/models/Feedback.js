const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['course-content', 'instructor', 'facilities', 'curriculum', 'other'],
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: String,
  },
  instructor: {
    type: String,
  },
  anonymous: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['pending', 'under-review', 'resolved', 'rejected'],
    default: 'pending',
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

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
