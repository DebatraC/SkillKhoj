import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';

const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    level: 'Mid Level',
    salaryMin: '',
    salaryMax: '',
    description: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    remote: false,
    featured: false
  });
  const [errors, setErrors] = useState({});

  // Redirect if not a recruiter
  React.useEffect(() => {
    if (user && user.role !== 'recruiter') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    }
    
    if (!formData.requirements.trim()) {
      newErrors.requirements = 'Requirements are required';
    }
    
    if (formData.salaryMin && formData.salaryMax) {
      if (parseInt(formData.salaryMin) >= parseInt(formData.salaryMax)) {
        newErrors.salaryMax = 'Maximum salary must be higher than minimum';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Mock API call to post job
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Job posted:', formData);
      navigate('/jobs', { 
        state: { message: 'Job posted successfully!' }
      });
    } catch (error) {
      console.error('Error posting job:', error);
      setErrors({ general: 'Failed to post job. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.role !== 'recruiter') {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>Only recruiters can post jobs.</p>
        <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
      </div>
    );
  }

  if (isLoading) {
    return <Loading text="Posting your job..." />;
  }

  return (
    <div className="post-job">
      <div className="page-header">
        <h1>Post a Job</h1>
        <p>Find the perfect candidate for your open position</p>
      </div>

      <Card className="post-job-form">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Job Basics</h3>
            
            <Input
              label="Job Title"
              name="title"
              placeholder="e.g. Senior React Developer"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              required
            />
            
            <Input
              label="Company Name"
              name="company"
              placeholder="Your company name"
              value={formData.company}
              onChange={handleChange}
              error={errors.company}
              required
            />
            
            <Input
              label="Location"
              name="location"
              placeholder="e.g. San Francisco, CA"
              value={formData.location}
              onChange={handleChange}
              error={errors.location}
              required
            />
            
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">Job Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              
              <div className="input-group">
                <label className="input-label">Experience Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                  <option value="Lead/Principal">Lead/Principal</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <Input
                label="Minimum Salary ($)"
                name="salaryMin"
                type="number"
                placeholder="80000"
                value={formData.salaryMin}
                onChange={handleChange}
              />
              
              <Input
                label="Maximum Salary ($)"
                name="salaryMax"
                type="number"
                placeholder="120000"
                value={formData.salaryMax}
                onChange={handleChange}
                error={errors.salaryMax}
              />
            </div>
            
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="remote"
                  checked={formData.remote}
                  onChange={handleChange}
                />
                Remote work available
              </label>
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                Featured listing (+$99)
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>Job Details</h3>
            
            <div className="input-group">
              <label className="input-label">Job Description *</label>
              <textarea
                name="description"
                placeholder="Describe the role, company culture, and what makes this opportunity exciting..."
                value={formData.description}
                onChange={handleChange}
                className={`input textarea ${errors.description ? 'input-error' : ''}`}
                rows="6"
                required
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
            
            <div className="input-group">
              <label className="input-label">Key Responsibilities</label>
              <textarea
                name="responsibilities"
                placeholder="List the main responsibilities (one per line)"
                value={formData.responsibilities}
                onChange={handleChange}
                className="input textarea"
                rows="4"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Requirements *</label>
              <textarea
                name="requirements"
                placeholder="List the required skills and experience (one per line)"
                value={formData.requirements}
                onChange={handleChange}
                className={`input textarea ${errors.requirements ? 'input-error' : ''}`}
                rows="4"
                required
              />
              {errors.requirements && <span className="error-message">{errors.requirements}</span>}
            </div>
            
            <div className="input-group">
              <label className="input-label">Benefits & Perks</label>
              <textarea
                name="benefits"
                placeholder="List the benefits and perks (one per line)"
                value={formData.benefits}
                onChange={handleChange}
                className="input textarea"
                rows="4"
              />
            </div>
          </div>

          {errors.general && (
            <div className="error-message global-error">
              {errors.general}
            </div>
          )}

          <div className="form-actions">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/jobs')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Post Job
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default PostJob;