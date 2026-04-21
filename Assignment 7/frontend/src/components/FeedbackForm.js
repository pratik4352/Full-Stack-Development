import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'course-content',
    rating: 5,
    course: '',
    instructor: '',
    anonymous: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="feedback-form">
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="course-content">Course Content</option>
            <option value="instructor">Instructor</option>
            <option value="facilities">Facilities</option>
            <option value="curriculum">Curriculum</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Rating</label>
          <select name="rating" value={formData.rating} onChange={handleChange}>
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
          <label>Course (optional)</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Instructor (optional)</label>
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
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
  );
};

export default FeedbackForm;
