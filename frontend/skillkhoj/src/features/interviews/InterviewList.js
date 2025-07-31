import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';

const InterviewList = () => {
  const { user } = useAuth();
  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockInterviews = [
          {
            id: 1,
            title: 'Frontend Developer Interview',
            company: 'TechCorp Inc.',
            interviewer: 'Sarah Wilson',
            candidate: user?.role === 'recruiter' ? 'John Doe' : user?.firstName + ' ' + user?.lastName,
            date: '2025-08-01',
            time: '10:00 AM',
            duration: 60,
            status: 'scheduled',
            type: 'technical',
            position: 'Senior React Developer'
          },
          {
            id: 2,
            title: 'System Design Interview',
            company: 'StartupXYZ',
            interviewer: 'Mike Johnson',
            candidate: user?.role === 'recruiter' ? 'Jane Smith' : user?.firstName + ' ' + user?.lastName,
            date: '2025-08-03',
            time: '2:00 PM',
            duration: 90,
            status: 'completed',
            type: 'system-design',
            position: 'Full Stack Engineer'
          },
          {
            id: 3,
            title: 'Behavioral Interview',
            company: 'MegaCorp',
            interviewer: 'Emily Davis',
            candidate: user?.role === 'recruiter' ? 'Bob Wilson' : user?.firstName + ' ' + user?.lastName,
            date: '2025-08-05',
            time: '11:00 AM',
            duration: 45,
            status: 'upcoming',
            type: 'behavioral',
            position: 'Product Manager'
          }
        ];
        
        setInterviews(mockInterviews);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterviews();
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'blue';
      case 'completed': return 'green';
      case 'upcoming': return 'orange';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'technical': return '💻';
      case 'system-design': return '🏗️';
      case 'behavioral': return '🗣️';
      default: return '📋';
    }
  };

  if (isLoading) {
    return <Loading text="Loading interviews..." />;
  }

  return (
    <div className="interviews-page">
      <div className="page-header">
        <h1>Interviews 🎤</h1>
        <p>Manage your upcoming and past interviews</p>
        {user?.role === 'recruiter' && (
          <Link to="/interviews/schedule">
            <Button>Schedule Interview</Button>
          </Link>
        )}
      </div>

      <div className="interviews-grid">
        {interviews.map(interview => (
          <Card key={interview.id} className="interview-card">
            <div className="interview-header">
              <div className="interview-title">
                <span className="interview-icon">{getTypeIcon(interview.type)}</span>
                <h3>{interview.title}</h3>
              </div>
              <span className={`status-badge status-${getStatusColor(interview.status)}`}>
                {interview.status}
              </span>
            </div>
            
            <div className="interview-details">
              <p><strong>Company:</strong> {interview.company}</p>
              <p><strong>Position:</strong> {interview.position}</p>
              {user?.role === 'recruiter' ? (
                <p><strong>Candidate:</strong> {interview.candidate}</p>
              ) : (
                <p><strong>Interviewer:</strong> {interview.interviewer}</p>
              )}
              <p><strong>Date & Time:</strong> {interview.date} at {interview.time}</p>
              <p><strong>Duration:</strong> {interview.duration} minutes</p>
            </div>
            
            <div className="interview-actions">
              {interview.status === 'scheduled' && (
                <>
                  <Button size="small" variant="primary">Join Interview</Button>
                  <Button size="small" variant="outline">Reschedule</Button>
                </>
              )}
              {interview.status === 'upcoming' && (
                <Button size="small" variant="primary">Join Interview</Button>
              )}
              {interview.status === 'completed' && (
                <Button size="small" variant="outline">View Feedback</Button>
              )}
              <Link to={`/interviews/${interview.id}`}>
                <Button size="small">View Details</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {interviews.length === 0 && (
        <div className="no-interviews">
          <h3>No interviews scheduled</h3>
          <p>Your upcoming interviews will appear here</p>
        </div>
      )}
    </div>
  );
};

export default InterviewList;