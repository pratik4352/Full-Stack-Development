import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { feedbackAPI } from '../services/api';
import '../styles/Feedback.css';

const SubmitFeedback = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'course-content',
    rating: 5,
    course: '',
    instructor: '',
    anonymous: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await feedbackAPI.createFeedback(formData);
      setSuccess('Feedback submitted successfully!');
      setTimeout(() => navigate('/feedbacks'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-card">
        <h2>Submit Feedback</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter feedback title"
              required
            />
          </div>
          <div className="form-group">
            <label>Description *:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your feedback in detail"
              rows="5"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category *:</label>
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="course-content">Course Content</option>
                <option value="instructor">Instructor</option>
                <option value="facilities">Facilities</option>
                <option value="curriculum">Curriculum</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Rating *:</label>
              <select name="rating" value={formData.rating} onChange={handleChange} required>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Course:</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Course name (optional)"
              />
            </div>
            <div className="form-group">
              <label>Instructor:</label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                placeholder="Instructor name (optional)"
              />
            </div>
          </div>
          <div className="form-group checkbox">
            <input
              type="checkbox"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
            />
            <label>Submit Anonymously</label>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitFeedback;
