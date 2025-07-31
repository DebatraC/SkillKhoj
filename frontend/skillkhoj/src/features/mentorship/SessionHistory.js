import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';

const SessionHistory = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockSessions = [
          {
            id: 1,
            mentor: 'Sarah Wilson',
            mentorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=007bff&color=fff',
            date: '2025-07-25',
            time: '10:00 AM',
            duration: 60,
            status: 'completed',
            type: 'Code Review',
            rating: 5,
            feedback: 'Excellent session! Sarah helped me understand React hooks much better.',
            amount: 80
          },
          {
            id: 2,
            mentor: 'Michael Chen',
            mentorAvatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=28a745&color=fff',
            date: '2025-07-28',
            time: '2:00 PM',
            duration: 60,
            status: 'completed',
            type: 'Career Advice',
            rating: 4,
            feedback: 'Great insights about career progression in tech.',
            amount: 75
          },
          {
            id: 3,
            mentor: 'Emily Rodriguez',
            mentorAvatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=dc3545&color=fff',
            date: '2025-08-02',
            time: '11:00 AM',
            duration: 60,
            status: 'scheduled',
            type: 'Data Science',
            rating: null,
            feedback: null,
            amount: 90
          },
          {
            id: 4,
            mentor: 'David Kumar',
            mentorAvatar: 'https://ui-avatars.com/api/?name=David+Kumar&background=ffc107&color=000',
            date: '2025-08-05',
            time: '3:00 PM',
            duration: 60,
            status: 'upcoming',
            type: 'DevOps',
            rating: null,
            feedback: null,
            amount: 85
          }
        ];
        
        setSessions(mockSessions);
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true;
    return session.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'scheduled': return 'blue';
      case 'upcoming': return 'orange';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const renderRating = (rating) => {
    if (!rating) return null;
    return (
      <div className="session-rating">
        {'⭐'.repeat(rating)} ({rating}/5)
      </div>
    );
  };

  if (isLoading) {
    return <Loading text="Loading your sessions..." />;
  }

  return (
    <div className="session-history">
      <div className="page-header">
        <h1>My Sessions 📚</h1>
        <p>View your mentoring session history</p>
        <Link to="/mentors">
          <Button>Book New Session</Button>
        </Link>
      </div>

      {/* Filter */}
      <div className="session-filters">
        <div className="filter-buttons">
          {['all', 'upcoming', 'scheduled', 'completed'].map(filterType => (
            <button
              key={filterType}
              className={`filter-btn ${filter === filterType ? 'active' : ''}`}
              onClick={() => setFilter(filterType)}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions List */}
      <div className="sessions-list">
        {filteredSessions.map(session => (
          <Card key={session.id} className="session-card">
            <div className="session-header">
              <div className="session-mentor">
                <img src={session.mentorAvatar} alt={session.mentor} />
                <div className="mentor-info">
                  <h4>{session.mentor}</h4>
                  <p>{session.type}</p>
                </div>
              </div>
              <span className={`status-badge status-${getStatusColor(session.status)}`}>
                {session.status}
              </span>
            </div>
            
            <div className="session-details">
              <div className="session-meta">
                <span>📅 {session.date} at {session.time}</span>
                <span>⏱️ {session.duration} minutes</span>
                <span>💰 ${session.amount}</span>
              </div>
              
              {session.rating && renderRating(session.rating)}
              
              {session.feedback && (
                <div className="session-feedback">
                  <p>"{session.feedback}"</p>
                </div>
              )}
            </div>
            
            <div className="session-actions">
              {session.status === 'upcoming' && (
                <>
                  <Button size="small" variant="primary">Join Session</Button>
                  <Button size="small" variant="outline">Reschedule</Button>
                </>
              )}
              {session.status === 'scheduled' && (
                <Button size="small" variant="primary">Join Session</Button>
              )}
              {session.status === 'completed' && !session.rating && (
                <Button size="small">Rate Session</Button>
              )}
              <Button size="small" variant="outline">View Details</Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div className="no-sessions">
          <h3>No sessions found</h3>
          <p>
            {filter === 'all' 
              ? "You haven't booked any sessions yet" 
              : `No ${filter} sessions found`
            }
          </p>
          <Link to="/mentors">
            <Button>Find a Mentor</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SessionHistory;