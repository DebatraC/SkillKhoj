import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';
import ProfileCard from './ProfileCard';

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Extended profile data
        const extendedProfile = {
          ...user,
          bio: "Passionate learner and developer with a focus on modern web technologies.",
          location: "San Francisco, CA",
          website: "https://johndoe.dev",
          github: "johndoe",
          linkedin: "john-doe-dev",
          joinedDate: "2024-01-15",
          skills: ["React", "JavaScript", "Node.js", "Python", "SQL"],
          achievements: [
            { title: "React Expert", description: "Completed 5 React courses", date: "2025-06-15" },
            { title: "Top Student", description: "Ranked in top 10% of learners", date: "2025-05-20" },
            { title: "Mentor Helper", description: "Helped 50+ students", date: "2025-04-10" }
          ],
          stats: {
            coursesCompleted: 12,
            hoursLearned: 240,
            certificatesEarned: 8,
            mentoringSessions: user?.role === 'mentor' ? 45 : 5
          }
        };
        
        setProfileData(extendedProfile);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user]);

  if (isLoading) {
    return <Loading text="Loading profile..." />;
  }

  if (!profileData) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <ProfileCard user={profileData} />
      </div>

      <div className="profile-content">
        {/* Stats */}
        <Card className="profile-section">
          <h3>My Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{profileData.stats.coursesCompleted}</div>
              <div className="stat-label">Courses Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{profileData.stats.hoursLearned}</div>
              <div className="stat-label">Hours Learned</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{profileData.stats.certificatesEarned}</div>
              <div className="stat-label">Certificates</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{profileData.stats.mentoringSessions}</div>
              <div className="stat-label">
                {user?.role === 'mentor' ? 'Sessions Conducted' : 'Sessions Attended'}
              </div>
            </div>
          </div>
        </Card>

        {/* Skills */}
        <Card className="profile-section">
          <h3>Skills</h3>
          <div className="skills-list">
            {profileData.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="profile-section">
          <h3>Achievements</h3>
          <div className="achievements-list">
            {profileData.achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <div className="achievement-icon">🏆</div>
                <div className="achievement-info">
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                  <span className="achievement-date">{achievement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* About */}
        <Card className="profile-section">
          <h3>About</h3>
          <p>{profileData.bio}</p>
          
          <div className="profile-links">
            {profileData.website && (
              <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                🌐 Website
              </a>
            )}
            {profileData.github && (
              <a href={`https://github.com/${profileData.github}`} target="_blank" rel="noopener noreferrer">
                💻 GitHub
              </a>
            )}
            {profileData.linkedin && (
              <a href={`https://linkedin.com/in/${profileData.linkedin}`} target="_blank" rel="noopener noreferrer">
                💼 LinkedIn
              </a>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;