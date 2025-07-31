import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useAuth } from '../hooks/useAuth';
// import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          LearnPlatform
        </Link>
        
        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/courses" className="nav-link">Courses</Link>
          <Link to="/mentors" className="nav-link">Mentors</Link>
          <Link to="/competitions" className="nav-link">Competitions</Link>
          <Link to="/jobs" className="nav-link">Jobs</Link>
          
          {user ? (
            <div className="nav-user">
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <Button variant="outline" size="small" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login">
                <Button variant="outline" size="small">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="small">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
        
        <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;