import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📚 FeedbackHub
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/feedbacks" className="nav-link">
              Feedbacks
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/submit-feedback" className="nav-link">
                  Submit Feedback
                </Link>
              </li>
              <li className="nav-user">
                <span className="user-name">{user.name}</span>
                <span className="user-role">({user.role})</span>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-link logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="nav-link nav-link-btn">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
