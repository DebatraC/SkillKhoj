import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';

const CreateCompetition = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    prize: '',
    difficulty: 'beginner',
    tags: '',
    rules: '',
    judging: ''
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
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
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
      navigate('/competitions', { 
        state: { message: 'Competition created successfully!' }
      });
    } catch (error) {
      console.error('Error creating competition:', error);
      setErrors({ general: 'Failed to create competition. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading text="Creating competition..." />;
  }

  return (
    <div className="create-competition">
      <div className="page-header">
        <h1>Create Competition</h1>
        <p>Organize a coding challenge for the community</p>
      </div>

      <Card className="create-form">
        <form onSubmit={handleSubmit}>
          <Input
            label="Competition Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            required
          />
          
          <div className="input-group">
            <label className="input-label">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`input textarea ${errors.description ? 'input-error' : ''}`}
              rows="4"
              required
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          
          <div className="form-row">
            <Input
              label="Start Date"
              name="startDate"
              type="datetime-local"
              value={formData.startDate}
              onChange={handleChange}
              error={errors.startDate}
              required
            />
            
            <Input
              label="End Date"
              name="endDate"
              type="datetime-local"
              value={formData.endDate}
              onChange={handleChange}
              error={errors.endDate}
              required
            />
          </div>
          
          <div className="form-row">
            <Input
              label="Prize Amount"
              name="prize"
              placeholder="$500"
              value={formData.prize}
              onChange={handleChange}
            />
            
            <div className="input-group">
              <label className="input-label">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="input"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          
          <Input
            label="Tags"
            name="tags"
            placeholder="React, JavaScript, Frontend (comma-separated)"
            value={formData.tags}
            onChange={handleChange}
          />
          
          <div className="input-group">
            <label className="input-label">Rules</label>
            <textarea
              name="rules"
              placeholder="Competition rules (one per line)"
              value={formData.rules}
              onChange={handleChange}
              className="input textarea"
              rows="4"
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Judging Criteria</label>
            <textarea
              name="judging"
              placeholder="How submissions will be judged (one per line)"
              value={formData.judging}
              onChange={handleChange}
              className="input textarea"
              rows="4"
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
              onClick={() => navigate('/competitions')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Create Competition
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateCompetition;