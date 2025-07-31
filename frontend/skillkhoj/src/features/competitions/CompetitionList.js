import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Loading } from '../../components';

const CompetitionList = () => {
  const [competitions, setCompetitions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompetitions = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockCompetitions = [
          {
            id: 1,
            title: 'React Coding Challenge',
            description: 'Build a complete React application in 48 hours',
            startDate: '2025-08-15',
            endDate: '2025-08-17',
            participants: 245,
            prize: '$500',
            difficulty: 'Intermediate',
            status: 'upcoming',
            tags: ['React', 'JavaScript', 'Frontend']
          },
          {
            id: 2,
            title: 'Algorithm Championship',
            description: 'Solve complex algorithms and data structure problems',
            startDate: '2025-08-01',
            endDate: '2025-08-05',
            participants: 189,
            prize: '$1000',
            difficulty: 'Advanced',
            status: 'active',
            tags: ['Algorithms', 'Data Structures', 'Problem Solving']
          },
          {
            id: 3,
            title: 'UI/UX Design Contest',
            description: 'Design a mobile app interface for a travel application',
            startDate: '2025-07-20',
            endDate: '2025-07-25',
            participants: 156,
            prize: '$300',
            difficulty: 'Beginner',
            status: 'completed',
            tags: ['UI/UX', 'Design', 'Mobile']
          }
        ];
        
        setCompetitions(mockCompetitions);
      } catch (error) {
        console.error('Error fetching competitions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'blue';
      case 'active': return 'green';
      case 'completed': return 'gray';
      default: return 'gray';
    }
  };

  if (isLoading) {
    return <Loading text="Loading competitions..." />;
  }

  return (
    <div className="competitions-page">
      <div className="page-header">
        <h1>Competitions 🏆</h1>
        <p>Test your skills and compete with developers worldwide</p>
      </div>

      <div className="competitions-grid">
        {competitions.map(competition => (
          <Card key={competition.id} className="competition-card">
            <div className="competition-header">
              <h3>{competition.title}</h3>
              <span className={`status-badge status-${getStatusColor(competition.status)}`}>
                {competition.status}
              </span>
            </div>
            
            <p className="competition-description">{competition.description}</p>
            
            <div className="competition-tags">
              {competition.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            
            <div className="competition-meta">
              <div className="meta-item">
                <span>Prize:</span> {competition.prize}
              </div>
              <div className="meta-item">
                <span>Participants:</span> {competition.participants}
              </div>
              <div className="meta-item">
                <span>Difficulty:</span> {competition.difficulty}
              </div>
              <div className="meta-item">
                <span>Duration:</span> {competition.startDate} - {competition.endDate}
              </div>
            </div>
            
            <div className="competition-actions">
              <Link to={`/competitions/${competition.id}`}>
                <Button size="small">View Details</Button>
              </Link>
              {competition.status === 'upcoming' && (
                <Button size="small" variant="primary">Register</Button>
              )}
              {competition.status === 'active' && (
                <Button size="small" variant="primary">Join Now</Button>
              )}
              {competition.status === 'completed' && (
                <Button size="small" variant="outline">View Results</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompetitionList;