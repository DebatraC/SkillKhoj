import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Loading, Modal } from '../../components';
import { useAuth } from '../../context/AuthContext';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [job, setJob] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockJob = {
          id: parseInt(id),
          title: 'Senior React Developer',
          company: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          type: 'Full-time',
          level: 'Senior Level',
          salary: '$120,000 - $150,000',
          description: `We are looking for a Senior React Developer to join our frontend team and help build the next generation of our web applications.

As a Senior React Developer, you will be responsible for developing and maintaining our React-based applications, collaborating with cross-functional teams, and mentoring junior developers.

The ideal candidate has extensive experience with React, TypeScript, and modern frontend development practices.`,
          responsibilities: [
            'Develop and maintain React applications',
            'Collaborate with design and backend teams',
            'Write clean, maintainable, and testable code',
            'Mentor junior developers',
            'Participate in code reviews',
            'Optimize applications for performance'
          ],
          requirements: [
            '5+ years of React development experience',
            'Strong proficiency in TypeScript',
            'Experience with Next.js framework',
            'Knowledge of GraphQL and REST APIs',
            'Familiarity with testing frameworks (Jest, RTL)',
            'Experience with state management (Redux, Zustand)',
            'Understanding of CI/CD pipelines'
          ],
          niceToHave: [
            'Experience with React Native',
            'Knowledge of Node.js',
            'Familiarity with AWS services',
            'Open source contributions',
            'Team leadership experience'
          ],
          benefits: [
            'Competitive salary and equity',
            'Health, dental, and vision insurance',
            'Flexible work arrangements',
            '401(k) with company matching',
            'Professional development budget',
            'Unlimited PTO',
            'Catered meals and snacks',
            'Modern office with great amenities'
          ],
          companyInfo: {
            name: 'TechCorp Inc.',
            description: 'TechCorp is a leading technology company that builds innovative solutions for businesses worldwide. We are committed to creating a diverse and inclusive workplace.',
            size: '500-1000 employees',
            founded: '2015',
            industry: 'Technology',
            website: 'https://techcorp.example.com'
          },
          postedDate: '2025-07-28',
          applicationDeadline: '2025-08-15',
          companyLogo: 'https://ui-avatars.com/api/?name=TechCorp&background=007bff&color=fff',
          remote: false,
          featured: true
        };
        
        setJob(mockJob);
        // Check if user has already applied (mock check)
        setHasApplied(false);
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setIsApplying(true);
    try {
      // Mock application submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      setHasApplied(true);
      setShowApplicationModal(false);
    } catch (error) {
      console.error('Application failed:', error);
    } finally {
      setIsApplying(false);
    }
  };

  if (isLoading) {
    return <Loading text="Loading job details..." />;
  }

  if (!job) {
    return (
      <div className="job-not-found">
        <h2>Job not found</h2>
        <Button onClick={() => navigate('/jobs')}>Back to Jobs</Button>
      </div>
    );
  }

  return (
    <div className="job-detail">
      {/* Job Header */}
      <div className="job-header">
        <div className="job-title-section">
          <div className="company-info">
            <img src={job.companyLogo} alt={job.company} className="company-logo" />
            <div>
              <h1>{job.title}</h1>
              <h2>{job.company}</h2>
              <div className="job-meta">
                <span>📍 {job.location}</span>
                <span>💼 {job.type}</span>
                <span>📊 {job.level}</span>
                <span>💰 {job.salary}</span>
              </div>
            </div>
          </div>
          
          <div className="job-actions">
            {hasApplied ? (
              <Button disabled>Applied ✓</Button>
            ) : (
              <Button 
                size="large"
                onClick={() => setShowApplicationModal(true)}
              >
                Apply Now
              </Button>
            )}
            <Button variant="outline" size="large">Save Job</Button>
          </div>
        </div>
      </div>

      {/* Job Content */}
      <div className="job-content">
        <div className="job-main">
          {/* Description */}
          <Card className="job-section">
            <h3>Job Description</h3>
            <div className="job-description">
              {job.description.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </Card>

          {/* Responsibilities */}
          <Card className="job-section">
            <h3>Responsibilities</h3>
            <ul className="job-list">
              {job.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Card>

          {/* Requirements */}
          <Card className="job-section">
            <h3>Requirements</h3>
            <ul className="job-list">
              {job.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Card>

          {/* Nice to Have */}
          <Card className="job-section">
            <h3>Nice to Have</h3>
            <ul className="job-list">
              {job.niceToHave.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Card>

          {/* Benefits */}
          <Card className="job-section">
            <h3>Benefits & Perks</h3>
            <ul className="job-list benefits-list">
              {job.benefits.map((item, index) => (
                <li key={index}>✅ {item}</li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="job-sidebar">
          {/* Company Info */}
          <Card className="company-card">
            <h3>About {job.companyInfo.name}</h3>
            <p>{job.companyInfo.description}</p>
            
            <div className="company-stats">
              <div className="stat-item">
                <span>Industry:</span>
                <span>{job.companyInfo.industry}</span>
              </div>
              <div className="stat-item">
                <span>Company Size:</span>
                <span>{job.companyInfo.size}</span>
              </div>
              <div className="stat-item">
                <span>Founded:</span>
                <span>{job.companyInfo.founded}</span>
              </div>
            </div>
            
            <Button variant="outline" size="small">
              Visit Company Website
            </Button>
          </Card>

          {/* Application Info */}
          <Card className="application-info">
            <h3>Application Details</h3>
            <div className="info-item">
              <span>Posted:</span>
              <span>{job.postedDate}</span>
            </div>
            <div className="info-item">
              <span>Deadline:</span>
              <span>{job.applicationDeadline}</span>
            </div>
            <div className="info-item">
              <span>Job Type:</span>
              <span>{job.type}</span>
            </div>
            <div className="info-item">
              <span>Experience:</span>
              <span>{job.level}</span>
            </div>
          </Card>

          {/* Similar Jobs */}
          <Card className="similar-jobs">
            <h3>Similar Jobs</h3>
            <div className="similar-job-item">
              <h4>Frontend Developer</h4>
              <p>StartupXYZ • Remote</p>
            </div>
            <div className="similar-job-item">
              <h4>React Engineer</h4>
              <p>BigTech Corp • Seattle</p>
            </div>
            <Button variant="outline" size="small">
              View All Similar Jobs
            </Button>
          </Card>
        </div>
      </div>

      {/* Application Modal */}
      <Modal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        title="Apply for Position"
      >
        <div className="application-modal">
          <h3>{job.title}</h3>
          <p><strong>{job.company}</strong></p>
          <p>You are about to apply for this position. Make sure your profile is complete and up-to-date.</p>
          
          <div className="application-checklist">
            <div className="checklist-item">
              ✅ Resume uploaded
            </div>
            <div className="checklist-item">
              ✅ Profile complete
            </div>
            <div className="checklist-item">
              ✅ Skills match requirements
            </div>
          </div>
          
          <div className="modal-actions">
            <Button 
              onClick={handleApply}
              disabled={isApplying}
            >
              {isApplying ? 'Submitting...' : 'Submit Application'}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowApplicationModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default JobDetail;