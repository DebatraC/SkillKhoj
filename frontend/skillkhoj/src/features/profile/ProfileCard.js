import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../../components';
import { useAuth } from '../../context/AuthContext';

const ProfileCard = ({ user, showActions = true }) => {
  const { user: currentUser } = useAuth();
  const isOwnProfile = currentUser?.id === user?.id;

  const getRoleColor = (role) => {
    switch (role) {
      case 'mentor': return 'blue';
      case 'recruiter': return 'green';
      case 'admin': return 'purple';
      default: return 'gray';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <Card className="profile-card">
      <div className="profile-avatar">
        <img 
          src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.firstName + ' ' + user?.lastName)}&background=007bff&color=fff`}
          alt={`${user?.firstName} ${user?.lastName}`}
        />
      </div>
      
      <div className="profile-info">
        <h2>{user?.firstName} {user?.lastName}</h2>
        <span className={`role-badge role-${getRoleColor(user?.role)}`}>
          {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
        </span>
        
        {user?.location && (
          <p className="profile-location">📍 {user.location}</p>
        )}
        
        {user?.bio && (
          <p className="profile-bio">{user.bio}</p>
        )}
        
        <div className="profile-meta">
          <span>Member since {formatDate(user?.joinedDate || '2024-01-01')}</span>
        </div>
        
        {showActions && isOwnProfile && (
          <div className="profile-actions">
            <Link to="/profile/edit">
              <Button variant="outline" size="small">Edit Profile</Button>
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProfileCard;