import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';

const ScheduleInterview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    candidateEmail: '',
    position: '',
    interviewType: 'technical',
    date: '',
    time: '',
    duration: 60,
    description: '',
    meetingLink: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!formData.candidateEmail.trim()) {
      newErrors.candidateEmail = 'Candidate email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.candidateEmail)) {
      newErrors.candidateEmail = 'Email is invalid';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    
    const interviewDateTime = new Date(`${formData.date}T${formData.time}`);
    if (interviewDateTime <= new Date()) {
      newErrors.date = 'Interview must be scheduled for a future date/time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock API call to schedule interview
      console.log('Interview scheduled:', formData);
      
      navigate('/interviews', { 
        state: { message: 'Interview scheduled successfully! Invitation sent to candidate.' }
      });
    } catch (error) {
      console.error('Error scheduling interview:', error);
      setErrors({ general: 'Failed to schedule interview. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.role !== 'recruiter') {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>Only recruiters can schedule interviews.</p>
        <Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
      </div>
    );
  }

  if (isLoading) {
    return <Loading text="Scheduling interview..." />;
  }

  return (
    <div className="schedule-interview">
      <div className="page-header">
        <h1>Schedule Interview</h1>
        <p>Set up a new interview with a candidate</p>
      </div>

      <Card className="schedule-form">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Candidate Information</h3>
            
            <Input
              label="Candidate Email"
              name="candidateEmail"
              type="email"
              placeholder="candidate@example.com"
              value={formData.candidateEmail}
              onChange={handleChange}
              error={errors.candidateEmail}
              required
            />
            
            <Input
              label="Position"
              name="position"
              placeholder="Senior React Developer"
              value={formData.position}
              onChange={handleChange}
              error={errors.position}
              required
            />
          </div>

          <div className="form-section">
            <h3>Interview Details</h3>
            
            <div className="input-group">
              <label className="input-label">Interview Type</label>
              <select
                name="interviewType"
                value={formData.interviewType}
                onChange={handleChange}
                className="input"
              >
                <option value="technical">Technical Interview</option>
                <option value="behavioral">Behavioral Interview</option>
                <option value="system-design">System Design</option>
                <option value="cultural-fit">Cultural Fit</option>
              </select>
            </div>
            
            <div className="form-row">
              <Input
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                error={errors.date}
                required
              />
              
              <Input
                label="Time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                error={errors.time}
                required
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Duration (minutes)</label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="input"
              >
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
                <option value={120}>120 minutes</option>
              </select>
            </div>
            
            <div className="input-group">
              <label className="input-label">Description</label>
              <textarea
                name="description"
                placeholder="Interview agenda, topics to cover, etc."
                value={formData.description}
                onChange={handleChange}
                className="input textarea"
                rows="4"
              />
            </div>
            
            <Input
              label="Meeting Link (Optional)"
              name="meetingLink"
              placeholder="https://meet.google.com/..."
              value={formData.meetingLink}
              onChange={handleChange}
            />
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
              onClick={() => navigate('/interviews')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Schedule Interview
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ScheduleInterview;