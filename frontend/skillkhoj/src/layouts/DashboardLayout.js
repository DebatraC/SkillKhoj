import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getDashboardLinks = () => {
    const baseLinks = [
      { path: '/dashboard', label: 'Overview', icon: '📊' },
      { path: '/profile', label: 'Profile', icon: '👤' },
    ];

    switch (user?.role) {
      case 'student':
        return [
          ...baseLinks,
          { path: '/courses', label: 'My Courses', icon: '📚' },
          { path: '/mentorship/sessions', label: 'Sessions', icon: '🎓' },
          { path: '/competitions', label: 'Competitions', icon: '🏆' },
        ];
      case 'mentor':
        return [
          ...baseLinks,
          { path: '/courses/create', label: 'Create Course', icon: '📝' },
          { path: '/mentorship/sessions', label: 'My Sessions', icon: '👨‍🏫' },
          { path: '/students', label: 'Students', icon: '👥' },
        ];
      case 'recruiter':
        return [
          ...baseLinks,
          { path: '/jobs/post', label: 'Post Job', icon: '💼' },
          { path: '/interviews', label: 'Interviews', icon: '🎤' },
          { path: '/candidates', label: 'Candidates', icon: '👥' },
        ];
      case 'admin':
        return [
          ...baseLinks,
          { path: '/admin/users', label: 'Users', icon: '👥' },
          { path: '/admin/courses', label: 'Courses', icon: '📚' },
          { path: '/admin/reports', label: 'Reports', icon: '📊' },
        ];
      default:
        return baseLinks;
    }
  };

  const isActiveLink = (path) => {
    return location.pathname === path || 
           (path !== '/dashboard' && location.pathname.startsWith(path));
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          <p>{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}</p>
        </div>
        
        <nav className="sidebar-nav">
          {getDashboardLinks().map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActiveLink(link.path) ? 'active' : ''}`}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-label">{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      
      <div className="dashboard-main">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;