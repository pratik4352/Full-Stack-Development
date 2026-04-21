import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI, feedbackAPI } from '../services/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalFeedbacks: 0,
    pendingFeedbacks: 0,
    resolvedFeedbacks: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await authAPI.getCurrentUser();
      setUser(response.data.user);

      if (response.data.user.role === 'student') {
        const feedbackResponse = await feedbackAPI.getUserFeedbacks(response.data.user._id);
        const feedbacks = feedbackResponse.data.feedbacks;
        setStats({
          totalFeedbacks: feedbacks.length,
          pendingFeedbacks: feedbacks.filter((f) => f.status === 'pending').length,
          resolvedFeedbacks: feedbacks.filter((f) => f.status === 'resolved').length,
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user?.name}!</h2>
        <p>Role: {user?.role}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Feedbacks</h3>
          <p className="stat-number">{stats.totalFeedbacks}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number">{stats.pendingFeedbacks}</p>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3>
          <p className="stat-number">{stats.resolvedFeedbacks}</p>
        </div>
      </div>

      <div className="actions-section">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <Link to="/submit-feedback" className="action-btn">
            📝 Submit Feedback
          </Link>
          <Link to="/feedbacks" className="action-btn">
            👁️ View All Feedbacks
          </Link>
          {(user?.role === 'instructor' || user?.role === 'admin') && (
            <Link to="/reviews" className="action-btn">
              ✅ Review Feedbacks
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
