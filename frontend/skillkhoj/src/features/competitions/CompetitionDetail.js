import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';
import Leaderboard from './Leaderboard';

const CompetitionDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [competition, setCompetition] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompetition = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockCompetition = {
          id: parseInt(id),
          title: 'React Coding Challenge',
          description: 'Build a complete React application in 48 hours. Show off your skills by creating an innovative web application using React, demonstrating best practices and modern development techniques.',
          startDate: '2025-08-15',
          endDate: '2025-08-17',
          participants: 245,
          prize: '$500',
          difficulty: 'Intermediate',
          status: 'upcoming',
          tags: ['React', 'JavaScript', 'Frontend'],
          rules: [
            'Use React 18+ for your application',
            'Code must be original and written during the competition',
            'Include a README with setup instructions',
            'Deploy your application to a public URL',
            'Submit source code via GitHub repository'
          ],
          judging: [
            'Code quality and structure (30%)',
            'User interface and experience (25%)',
            'Functionality and features (25%)',
            'Innovation and creativity (20%)'
          ],
          prizes: [
            { place: '1st', amount: '$500', description: 'Winner' },
            { place: '2nd', amount: '$300', description: 'Runner-up' },
            { place: '3rd', amount: '$200', description: 'Third place' }
          ],
          timeline: [
            { date: '2025-08-15 00:00', event: 'Competition starts' },
            { date: '2025-08-16 12:00', event: 'Mid-point check-in' },
            { date: '2025-08-17 23:59', event: 'Submission deadline' },
            { date: '2025-08-20 18:00', event: 'Results announced' }
          ]
        };
        
        setCompetition(mockCompetition);
        setIsRegistered(false); // Mock registration status
      } catch (error) {
        console.error('Error fetching competition:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompetition();
  }, [id]);

  const handleRegister = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsRegistered(true);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  if (isLoading) {
    return <Loading text="Loading competition..." />;
  }

  if (!competition) {
    return <div>Competition not found</div>;
  }

  return (
    <div className="competition-detail">
      <div className="competition-header">
        <h1>{competition.title}</h1>
        <div className="competition-meta">
          <span className={`status-badge status-${competition.status}`}>
            {competition.status}
          </span>
          <span className="prize-badge">Prize: {competition.prize}</span>
        </div>
      </div>

      <div className="competition-content">
        <div className="competition-main">
          <Card className="competition-section">
            <h2>About</h2>
            <p>{competition.description}</p>
            
            <div className="competition-tags">
              {competition.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </Card>

          <Card className="competition-section">
            <h2>Rules</h2>
            <ul>
              {competition.rules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </Card>

          <Card className="competition-section">
            <h2>Judging Criteria</h2>
            <ul>
              {competition.judging.map((criteria, index) => (
                <li key={index}>{criteria}</li>
              ))}
            </ul>
          </Card>

          <Card className="competition-section">
            <h2>Timeline</h2>
            <div className="timeline">
              {competition.timeline.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-date">{item.date}</div>
                  <div className="timeline-event">{item.event}</div>
                </div>
              ))}
            </div>
          </Card>

          {competition.status === 'active' && (
            <Card className="competition-section">
              <h2>Leaderboard</h2>
              <Leaderboard competitionId={competition.id} />
            </Card>
          )}
        </div>

        <div className="competition-sidebar">
          <Card className="competition-info">
            <h3>Competition Info</h3>
            <div className="info-item">
              <span>Participants:</span>
              <span>{competition.participants}</span>
            </div>
            <div className="info-item">
              <span>Difficulty:</span>
              <span>{competition.difficulty}</span>
            </div>
            <div className="info-item">
              <span>Start Date:</span>
              <span>{competition.startDate}</span>
            </div>
            <div className="info-item">
              <span>End Date:</span>
              <span>{competition.endDate}</span>
            </div>
            
            <div className="competition-action">
              {!isAuthenticated ? (
                <Button>Login to Register</Button>
              ) : isRegistered ? (
                <Button variant="outline" disabled>Registered ✓</Button>
              ) : competition.status === 'upcoming' ? (
                <Button onClick={handleRegister}>Register Now</Button>
              ) : competition.status === 'active' ? (
                <Button>Join Competition</Button>
              ) : (
                <Button variant="outline" disabled>Competition Ended</Button>
              )}
            </div>
          </Card>

          <Card className="prizes-card">
            <h3>Prizes</h3>
            {competition.prizes.map((prize, index) => (
              <div key={index} className="prize-item">
                <span className="prize-place">{prize.place}</span>
                <span className="prize-amount">{prize.amount}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDetail;