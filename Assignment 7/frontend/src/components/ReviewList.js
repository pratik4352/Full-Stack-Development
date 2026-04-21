import React from 'react';
import './ReviewList.css';

const ReviewList = ({ reviews }) => {
  const getActionColor = (action) => {
    if (action === 'approved') return '#4CAF50';
    if (action === 'rejected') return '#f44336';
    return '#FFC107';
  };

  return (
    <div className="review-list">
      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews yet</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="review-item">
            <div className="review-header">
              <span className="reviewer">By: {review.reviewedBy?.name}</span>
              <span
                className="action-badge"
                style={{ backgroundColor: getActionColor(review.action) }}
              >
                {review.action}
              </span>
            </div>
            <p className="review-comment">{review.comment}</p>
            {review.actionDescription && (
              <p className="action-description">{review.actionDescription}</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
