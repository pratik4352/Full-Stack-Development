import React, { useState, useEffect } from 'react';
import { feedbackAPI } from '../services/api';
import '../styles/Feedback.css';

const ViewFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    page: 1,
  });
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchFeedbacks();
  }, [filters]);

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await feedbackAPI.getAllFeedbacks({
        category: filters.category || undefined,
        status: filters.status || undefined,
        page: filters.page,
        limit: 10,
      });
      setFeedbacks(response.data.feedbacks);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
      page: 1,
    });
  };

  const handlePageChange = (newPage) => {
    setFilters({
      ...filters,
      page: newPage,
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return '#4CAF50';
    if (rating >= 3) return '#FFC107';
    return '#f44336';
  };

  return (
    <div className="feedbacks-container">
      <h2>All Feedbacks</h2>
      
      <div className="filters">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          <option value="course-content">Course Content</option>
          <option value="instructor">Instructor</option>
          <option value="facilities">Facilities</option>
          <option value="curriculum">Curriculum</option>
          <option value="other">Other</option>
        </select>

        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="under-review">Under Review</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading feedbacks...</div>
      ) : feedbacks.length === 0 ? (
        <div className="no-data">No feedbacks found</div>
      ) : (
        <>
          <div className="feedbacks-list">
            {feedbacks.map((feedback) => (
              <div key={feedback._id} className="feedback-item">
                <div className="feedback-header">
                  <h3>{feedback.title}</h3>
                  <span
                    className="rating"
                    style={{ backgroundColor: getRatingColor(feedback.rating) }}
                  >
                    ★ {feedback.rating}/5
                  </span>
                </div>
                <p className="description">{feedback.description}</p>
                <div className="feedback-meta">
                  <span className="category">{feedback.category}</span>
                  <span className="status">{feedback.status}</span>
                  {feedback.course && <span className="course">{feedback.course}</span>}
                  {feedback.instructor && <span className="instructor">Instructor: {feedback.instructor}</span>}
                </div>
                <div className="feedback-author">
                  {feedback.anonymous ? (
                    <span>Anonymous Feedback</span>
                  ) : (
                    <span>By: {feedback.submittedBy?.name}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            {filters.page > 1 && (
              <button onClick={() => handlePageChange(filters.page - 1)}>
                Previous
              </button>
            )}
            <span>
              Page {pagination.page} of {pagination.pages}
            </span>
            {filters.page < pagination.pages && (
              <button onClick={() => handlePageChange(filters.page + 1)}>
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ViewFeedbacks;
