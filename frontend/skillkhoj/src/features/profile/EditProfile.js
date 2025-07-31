import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Input, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    skills: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        skills: user.skills ? user.skills.join(', ') : ''
      });
    }
  }, [user]);

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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.website && !formData.website.startsWith('http')) {
      newErrors.website = 'Website must start with http:// or https://';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
      };
      
      updateUser(updatedData);
      navigate('/profile', { 
        state: { message: 'Profile updated successfully!' }
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrors({ general: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading text="Updating profile..." />;
  }

  return (
    <div className="edit-profile">
      <div className="page-header">
        <h1>Edit Profile</h1>
        <p>Update your personal information</p>
      </div>

      <Card className="edit-profile-form">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-row">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
              />
              
              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
              />
            </div>
            
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
            
            <div className="input-group">
              <label className="input-label">Bio</label>
              <textarea
                name="bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={handleChange}
                className="input textarea"
                rows="4"
              />
            </div>
            
            <Input
              label="Location"
              name="location"
              placeholder="City, Country"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <h3>Professional Links</h3>
            
            <Input
              label="Website"
              name="website"
              placeholder="https://yourwebsite.com"
              value={formData.website}
              onChange={handleChange}
              error={errors.website}
            />
            
            <Input
              label="GitHub Username"
              name="github"
              placeholder="yourusername"
              value={formData.github}
              onChange={handleChange}
            />
            
            <Input
              label="LinkedIn Username"
              name="linkedin"
              placeholder="your-linkedin-username"
              value={formData.linkedin}
              onChange={handleChange}
            />
            
            <Input
              label="Skills"
              name="skills"
              placeholder="React, JavaScript, Python (comma-separated)"
              value={formData.skills}
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
              onClick={() => navigate('/profile')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default EditProfile;