import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';

const MockInterview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mockInterviews, setMockInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMockInterviews = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockData = [
          {
            id: 1,
            title: 'React Frontend Interview',
            mentor: 'Sarah Wilson',
            mentorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=007bff&color=fff',
            difficulty: 'Intermediate',
            duration: 90,
            topics: ['React Hooks', 'State Management', 'Component Design'],
            price: 120,
            description: 'Comprehensive React interview simulation with real-world scenarios.',
            rating: 4.9,
            reviews: 45
          },
          {
            id: 2,
            title: 'System Design Interview',
            mentor: 'Michael Chen',
            mentorAvatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=28a745&color=fff',
            difficulty: 'Advanced',
            duration: 120,
            topics: ['Scalability', 'Database Design', 'Microservices'],
            price: 150,
            description: 'Practice system design problems commonly asked in FAANG interviews.',
            rating: 4.8,
            reviews: 32
          },
          {
            id: 3,
            title: 'Data Structures & Algorithms',
            mentor: 'Emily Rodriguez',
            mentorAvatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=dc3545&color=fff',
            difficulty: 'Intermediate',
            duration: 75,
            topics: ['Arrays', 'Trees', 'Dynamic Programming'],
            price: 100,
            description: 'Coding interview practice with detailed explanations and optimization.',
            rating: 4.9,
            reviews: 67
          },
          {
            id: 4,
            title: 'Behavioral Interview Prep',
            mentor: 'David Kumar',
            mentorAvatar: 'https://ui-avatars.com/api/?name=David+Kumar&background=ffc107&color=000',
            difficulty: 'Beginner',
            duration: 60,
            topics: ['STAR Method', 'Leadership', 'Problem Solving'],
            price: 80,
            description: 'Master behavioral questions and learn to tell compelling stories.',
            rating: 4.7,
            reviews: 89
          }
        ];
        
        setMockInterviews(mockData);
      } catch (error) {
        console.error('Error fetching mock interviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMockInterviews();
  }, []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'green';
      case 'Intermediate': return 'orange';
      case 'Advanced': return 'red';
      default: return 'gray';
    }
  };

  if (isLoading) {
    return <Loading text="Loading mock interviews..." />;
  }

  return (
    <div className="mock-interviews">
      <div className="page-header">
        <h1>Mock Interviews 🎯</h1>
        <p>Practice with industry experts and get ready for your dream job</p>
      </div>

      <div className="interviews-grid">
        {mockInterviews.map(interview => (
          <Card key={interview.id} className="interview-card">
            <div className="interview-header">
              <h3>{interview.title}</h3>
              <span className={`difficulty-badge difficulty-${getDifficultyColor(interview.difficulty)}`}>
                {interview.difficulty}
              </span>
            </div>
            
            <div className="interview-mentor">
              <img src={interview.mentorAvatar} alt={interview.mentor} />
              <div className="mentor-info">
                <h4>{interview.mentor}</h4>
                <div className="mentor-rating">
                  ⭐ {interview.rating} ({interview.reviews} reviews)
                </div>
              </div>
            </div>
            
            <p className="interview-description">{interview.description}</p>
            
            <div className="interview-details">
              <div className="detail-item">
                <span>Duration:</span>
                <span>{interview.duration} minutes</span>
              </div>
              <div className="detail-item">
                <span>Price:</span>
                <span>${interview.price}</span>
              </div>
            </div>
            
            <div className="interview-topics">
              <h5>Topics Covered:</h5>
              <div className="topics-list">
                {interview.topics.map(topic => (
                  <span key={topic} className="topic-tag">{topic}</span>
                ))}
              </div>
            </div>
            
            <div className="interview-actions">
              <Button 
                variant="primary"
                onClick={() => navigate(`/mentorship/book-mock/${interview.id}`)}
              >
                Book Mock Interview
              </Button>
              <Button 
                variant="outline"
                size="small"
                onClick={() => navigate(`/mock-interviews/${interview.id}`)}
              >
                Learn More
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mock-interview-benefits">
        <Card className="benefits-card">
          <h3>Why Practice Mock Interviews?</h3>
          <div className="benefits-grid">
            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <h4>Targeted Practice</h4>
              <p>Focus on specific areas you need to improve</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📊</span>
              <h4>Detailed Feedback</h4>
              <p>Get comprehensive feedback on your performance</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">💪</span>
              <h4>Build Confidence</h4>
              <p>Reduce anxiety and perform better in real interviews</p>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🚀</span>
              <h4>Industry Experts</h4>
              <p>Learn from professionals at top tech companies</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MockInterview;