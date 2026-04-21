import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Student Feedback Review System</h1>
        <p>Share your feedback and help us improve education quality</p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/feedbacks" className="btn btn-secondary">
            View Feedbacks
          </Link>
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3>📝 Submit Feedback</h3>
          <p>Share your thoughts on courses, instructors, and facilities</p>
        </div>
        <div className="feature-card">
          <h3>⭐ Rating System</h3>
          <p>Rate your experience on a scale of 1-5</p>
        </div>
        <div className="feature-card">
          <h3>🔍 Track Reviews</h3>
          <p>See how your feedback is being reviewed and addressed</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Privacy</h3>
          <p>Submit anonymously if you prefer</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
