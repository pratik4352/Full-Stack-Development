import React from 'react';
import './FeedbackList.css';

const FeedbackList = ({ feedbacks, onDelete, currentUserId }) => {
  const getRatingColor = (rating) => {
    if (rating >= 4) return '#4CAF50';
    if (rating >= 3) return '#FFC107';
    return '#f44336';
  };

  return (
    <div className="feedback-list">
      {feedbacks.map((feedback) => (
        <div key={feedback._id} className="feedback-list-item">
          <div className="feedback-list-header">
            <h4>{feedback.title}</h4>
            <span
              className="rating-badge"
              style={{ backgroundColor: getRatingColor(feedback.rating) }}
            >
              ★ {feedback.rating}
            </span>
          </div>

          <p className="feedback-description">{feedback.description}</p>

          <div className="feedback-tags">
            <span className="tag category">{feedback.category}</span>
            <span className={`tag status ${feedback.status}`}>{feedback.status}</span>
          </div>

          {feedback.course && <p className="meta-info">Course: {feedback.course}</p>}
          {feedback.instructor && <p className="meta-info">Instructor: {feedback.instructor}</p>}

          <div className="feedback-footer">
            <span className="submitter">
              {feedback.anonymous ? 'Anonymous' : `By ${feedback.submittedBy?.name}`}
            </span>
            {feedback.submittedBy?._id === currentUserId && (
              <button onClick={() => onDelete(feedback._id)} className="delete-btn">
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
