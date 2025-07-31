import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../../components';

const JobCard = ({ job, featured = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Posted today';
    if (diffDays === 2) return 'Posted yesterday';
    return `Posted ${diffDays - 1} days ago`;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Full-time': return 'blue';
      case 'Part-time': return 'green';
      case 'Contract': return 'orange';
      case 'Internship': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <Card className={`job-card ${featured ? 'featured' : ''}`}>
      {featured && <div className="featured-badge">Featured</div>}
      
      <div className="job-header">
        <div className="company-info">
          <img src={job.companyLogo} alt={job.company} className="company-logo" />
          <div className="job-title-info">
            <h3 className="job-title">{job.title}</h3>
            <p className="company-name">{job.company}</p>
          </div>
        </div>
        <span className={`job-type-badge type-${getTypeColor(job.type)}`}>
          {job.type}
        </span>
      </div>
      
      <div className="job-meta">
        <div className="meta-item">
          📍 {job.location} {job.remote && '(Remote)'}
        </div>
        <div className="meta-item">
          💰 {job.salary}
        </div>
        <div className="meta-item">
          📊 {job.level}
        </div>
        <div className="meta-item">
          📅 {formatDate(job.postedDate)}
        </div>
      </div>
      
      <p className="job-description">{job.description}</p>
      
      <div className="job-requirements">
        <h5>Key Skills:</h5>
        <div className="requirements-list">
          {job.requirements.slice(0, 4).map((req, index) => (
            <span key={index} className="requirement-tag">{req}</span>
          ))}
          {job.requirements.length > 4 && (
            <span className="requirement-tag more">+{job.requirements.length - 4} more</span>
          )}
        </div>
      </div>
      
      <div className="job-benefits">
        <h5>Benefits:</h5>
        <div className="benefits-list">
          {job.benefits.slice(0, 3).map((benefit, index) => (
            <span key={index} className="benefit-item">✅ {benefit}</span>
          ))}
        </div>
      </div>
      
      <div className="job-actions">
        <Link to={`/jobs/${job.id}`}>
          <Button size="small">View Details</Button>
        </Link>
        <Button size="small" variant="primary">Apply Now</Button>
      </div>
    </Card>
  );
};

export default JobCard;