import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Input, Loading } from '../../components';

const MentorshipList = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const skills = ['all', 'React', 'JavaScript', 'Python', 'Java', 'Node.js', 'Data Science', 'DevOps'];

  useEffect(() => {
    const fetchMentors = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockMentors = [
          {
            id: 1,
            name: 'Sarah Wilson',
            title: 'Senior React Developer',
            company: 'Google',
            experience: '8+ years',
            rating: 4.9,
            reviews: 156,
            hourlyRate: 80,
            skills: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
            bio: 'Experienced frontend developer with expertise in React ecosystem.',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=007bff&color=fff',
            availability: 'Available',
            sessions: 234
          },
          {
            id: 2,
            name: 'Michael Chen',
            title: 'Full Stack Engineer',
            company: 'Microsoft',
            experience: '6+ years',
            rating: 4.8,
            reviews: 89,
            hourlyRate: 75,
            skills: ['Python', 'Django', 'React', 'PostgreSQL'],
            bio: 'Full-stack developer passionate about clean code and mentoring.',
            avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=28a745&color=fff',
            availability: 'Available',
            sessions: 167
          },
          {
            id: 3,
            name: 'Emily Rodriguez',
            title: 'Data Scientist',
            company: 'Netflix',
            experience: '5+ years',
            rating: 4.9,
            reviews: 124,
            hourlyRate: 90,
            skills: ['Python', 'Machine Learning', 'Data Science', 'TensorFlow'],
            bio: 'Data scientist with expertise in ML and AI applications.',
            avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=dc3545&color=fff',
            availability: 'Busy',
            sessions: 198
          },
          {
            id: 4,
            name: 'David Kumar',
            title: 'DevOps Engineer',
            company: 'Amazon',
            experience: '7+ years',
            rating: 4.7,
            reviews: 67,
            hourlyRate: 85,
            skills: ['AWS', 'Docker', 'Kubernetes', 'DevOps'],
            bio: 'DevOps expert helping teams scale their infrastructure.',
            avatar: 'https://ui-avatars.com/api/?name=David+Kumar&background=ffc107&color=000',
            availability: 'Available',
            sessions: 143
          },
          {
            id: 5,
            name: 'Jessica Thompson',
            title: 'UX/UI Designer',
            company: 'Apple',
            experience: '6+ years',
            rating: 4.8,
            reviews: 203,
            hourlyRate: 70,
            skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
            bio: 'Design leader passionate about creating user-centered experiences.',
            avatar: 'https://ui-avatars.com/api/?name=Jessica+Thompson&background=6f42c1&color=fff',
            availability: 'Available',
            sessions: 289
          },
          {
            id: 6,
            name: 'Robert Singh',
            title: 'Backend Architect',
            company: 'Uber',
            experience: '10+ years',
            rating: 4.9,
            reviews: 178,
            hourlyRate: 95,
            skills: ['Java', 'Spring Boot', 'Microservices', 'System Design'],
            bio: 'Backend architect with deep expertise in scalable systems.',
            avatar: 'https://ui-avatars.com/api/?name=Robert+Singh&background=17a2b8&color=fff',
            availability: 'Limited',
            sessions: 312
          },
          {
            id: 7,
            name: 'Maria Garcia',
            title: 'Mobile Developer',
            company: 'Spotify',
            experience: '5+ years',
            rating: 4.7,
            reviews: 92,
            hourlyRate: 78,
            skills: ['React Native', 'Swift', 'Kotlin', 'Flutter'],
            bio: 'Mobile development specialist building apps for millions of users.',
            avatar: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=e83e8c&color=fff',
            availability: 'Available',
            sessions: 156
          },
          {
            id: 8,
            name: 'Alex Johnson',
            title: 'AI/ML Engineer',
            company: 'OpenAI',
            experience: '4+ years',
            rating: 4.8,
            reviews: 134,
            hourlyRate: 100,
            skills: ['Python', 'PyTorch', 'Machine Learning', 'Deep Learning'],
            bio: 'AI engineer working on cutting-edge machine learning models.',
            avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=fd7e14&color=fff',
            availability: 'Available',
            sessions: 187
          }
        ];
        
        setMentors(mockMentors);
        setFilteredMentors(mockMentors);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    let filtered = mentors;
    
    // Filter by skill
    if (selectedSkill !== 'all') {
      filtered = filtered.filter(mentor => 
        mentor.skills.some(skill => skill.toLowerCase().includes(selectedSkill.toLowerCase()))
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(mentor =>
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredMentors(filtered);
  }, [mentors, selectedSkill, searchTerm]);

  const getAvailabilityColor = (availability) => {
    switch (availability.toLowerCase()) {
      case 'available': return 'green';
      case 'busy': return 'red';
      case 'limited': return 'orange';
      default: return 'gray';
    }
  };

  if (isLoading) {
    return <Loading text="Loading mentors..." />;
  }

  return (
    <div className="mentors-page">
      <div className="page-header">
        <h1>Find a Mentor 👨‍🏫</h1>
        <p>Connect with experienced professionals to accelerate your learning</p>
      </div>

      {/* Filters */}
      <div className="mentors-filters">
        <div className="search-filter">
          <Input
            placeholder="Search mentors by name, company, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="skill-filter">
          <select 
            value={selectedSkill} 
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="skill-select"
          >
            {skills.map(skill => (
              <option key={skill} value={skill}>
                {skill === 'all' ? 'All Skills' : skill}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="mentors-results">
        <p>{filteredMentors.length} mentors found</p>
      </div>

      {/* Mentors Grid */}
      <div className="mentors-grid">
        {filteredMentors.map(mentor => (
          <Card key={mentor.id} className="mentor-card">
            <div className="mentor-header">
              <div className="mentor-avatar-section">
                <img 
                  src={mentor.avatar} 
                  alt={mentor.name} 
                  className="mentor-avatar" 
                />
                <div className={`availability-badge ${getAvailabilityColor(mentor.availability)}`}>
                  <span className="availability-dot"></span>
                  {mentor.availability}
                </div>
              </div>
              
              <div className="mentor-info">
                <h3 className="mentor-name">{mentor.name}</h3>
                <p className="mentor-title">{mentor.title}</p>
                <p className="mentor-company">
                  <span className="company-icon">🏢</span>
                  {mentor.company}
                </p>
                <p className="mentor-experience">
                  <span className="experience-icon">💼</span>
                  {mentor.experience} experience
                </p>
              </div>
            </div>
            
            <div className="mentor-stats">
              <div className="stat-item">
                <div className="stat-value">
                  <span className="rating-stars">⭐</span>
                  {mentor.rating}
                </div>
                <div className="stat-label">({mentor.reviews} reviews)</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{mentor.sessions}</div>
                <div className="stat-label">sessions completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">${mentor.hourlyRate}</div>
                <div className="stat-label">per hour</div>
              </div>
            </div>
            
            <div className="mentor-bio">
              <p>{mentor.bio}</p>
            </div>
            
            <div className="mentor-skills">
              <div className="skills-header">
                <span className="skills-icon">🛠️</span>
                <span>Skills & Expertise</span>
              </div>
              <div className="skills-list">
                {mentor.skills.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="mentor-actions">
              <div className="action-buttons">
                <Link to={`/mentors/${mentor.id}`}>
                  <Button size="small" variant="outline">
                    View Profile
                  </Button>
                </Link>
                {mentor.availability === 'Available' ? (
                  <Link to={`/mentorship/book/${mentor.id}`}>
                    <Button size="small" variant="primary">
                      Book Session
                    </Button>
                  </Link>
                ) : (
                  <Button size="small" variant="primary" disabled>
                    {mentor.availability === 'Busy' ? 'Not Available' : 'Limited Slots'}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className="no-results">
          <div className="no-results-content">
            <div className="no-results-icon">🔍</div>
            <h3>No mentors found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <div className="no-results-suggestions">
              <h4>Suggestions:</h4>
              <ul>
                <li>Try different keywords</li>
                <li>Select a different skill filter</li>
                <li>Check spelling of search terms</li>
              </ul>
            </div>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedSkill('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}

      {/* Call to Action for Mentors */}
      <div className="mentor-cta">
        <Card className="cta-card">
          <div className="cta-content">
            <h3>Want to become a mentor?</h3>
            <p>Share your expertise and help others grow while earning extra income</p>
            <div className="cta-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">💰</span>
                <span>Earn $50-100+ per hour</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">⏰</span>
                <span>Flexible schedule</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🌱</span>
                <span>Help others grow</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">🏆</span>
                <span>Build your reputation</span>
              </div>
            </div>
            <Link to="/become-mentor">
              <Button variant="primary">Become a Mentor</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MentorshipList;