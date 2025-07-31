import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';

const CreateCourse = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web-development',
    price: '',
    duration: '',
    level: 'beginner',
    requirements: '',
    whatYoullLearn: '',
    image: null
  });
  const [errors, setErrors] = useState({});

  // Redirect if not a mentor
  React.useEffect(() => {
    if (user && user.role !== 'mentor') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
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
      newErrors.title = 'Course title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Course description is required';
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }
    
    if (!formData.duration.trim()) {
      newErrors.duration = 'Course duration is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Mock API call to create course
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful course creation
      console.log('Course created:', formData);
      navigate('/dashboard', { 
        state: { message: 'Course created successfully!' }
      });
    } catch (error) {
      console.error('Error creating course:', error);
      setErrors({ general: 'Failed to create course. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading text="Creating your course..." />;
  }

  return (
    <div className="create-course">
      <div className="page-header">
        <h1>Create New Course</h1>
        <p>Share your knowledge with students worldwide</p>
      </div>

      <Card className="create-course-form">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Course Basics</h3>
            
            <Input
              label="Course Title"
              name="title"
              placeholder="Enter course title"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              required
            />
            
            <div className="input-group">
              <label className="input-label">Course Description *</label>
              <textarea
                name="description"
                placeholder="Describe what students will learn"
                value={formData.description}
                onChange={handleChange}
                className={`input textarea ${errors.description ? 'input-error' : ''}`}
                rows="4"
                required
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
            
            <div className="form-row">
              <div className="input-group">
                <label className="input-label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="web-development">Web Development</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="data-science">Data Science</option>
                  <option value="devops">DevOps</option>
                  <option value="design">Design</option>
                </select>
              </div>
              
              <div className="input-group">
                <label className="input-label">Level</label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <Input
                label="Price ($)"
                name="price"
                type="number"
                placeholder="99"
                value={formData.price}
                onChange={handleChange}
                error={errors.price}
                required
              />
              
              <Input
                label="Duration"
                name="duration"
                placeholder="8 weeks"
                value={formData.duration}
                onChange={handleChange}
                error={errors.duration}
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Course Content</h3>
            
            <div className="input-group">
              <label className="input-label">What Students Will Learn</label>
              <textarea
                name="whatYoullLearn"
                placeholder="Enter learning objectives (one per line)"
                value={formData.whatYoullLearn}
                onChange={handleChange}
                className="input textarea"
                rows="4"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Requirements</label>
              <textarea
                name="requirements"
                placeholder="Enter course requirements (one per line)"
                value={formData.requirements}
                onChange={handleChange}
                className="input textarea"
                rows="3"
              />
            </div>
            
            <div className="input-group">
              <label className="input-label">Course Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="input"
                accept="image/*"
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
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Create Course
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateCourse;