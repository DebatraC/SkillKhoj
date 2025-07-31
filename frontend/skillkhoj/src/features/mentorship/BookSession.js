import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Input, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';

const BookSession = () => {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [mentor, setMentor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState('general');
  const [description, setDescription] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchMentorData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockMentor = {
          id: parseInt(mentorId),
          name: 'Sarah Wilson',
          title: 'Senior React Developer',
          company: 'Google',
          hourlyRate: 80,
          avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=007bff&color=fff',
          skills: ['React', 'JavaScript', 'TypeScript', 'Node.js'],
          bio: 'Experienced frontend developer with expertise in React ecosystem.',
          rating: 4.9,
          reviews: 156
        };
        
        setMentor(mockMentor);
        
        // Mock available time slots for the next 7 days
        const slots = [];
        const today = new Date();
        for (let i = 1; i <= 7; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dateStr = date.toISOString().split('T')[0];
          
          // Add some available times for each day
          const times = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
          times.forEach(time => {
            if (Math.random() > 0.3) { // 70% chance slot is available
              slots.push({ date: dateStr, time });
            }
          });
        }
        setAvailableSlots(slots);
        
      } catch (error) {
        console.error('Error fetching mentor data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentorData();
  }, [mentorId, isAuthenticated, navigate]);

  const getAvailableTimesForDate = (date) => {
    return availableSlots.filter(slot => slot.date === date).map(slot => slot.time);
  };

  const validateBooking = () => {
    const newErrors = {};
    
    if (!selectedDate) {
      newErrors.date = 'Please select a date';
    }
    
    if (!selectedTime) {
      newErrors.time = 'Please select a time';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Please describe what you want to learn';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookSession = async () => {
    if (!validateBooking()) return;
    
    setIsBooking(true);
    try {
      // Mock API call to book session
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const bookingData = {
        mentorId,
        studentId: user.id,
        date: selectedDate,
        time: selectedTime,
        sessionType,
        description,
        amount: mentor.hourlyRate
      };
      
      console.log('Session booked:', bookingData);
      
      navigate('/mentorship/sessions', { 
        state: { 
          message: `Session booked successfully with ${mentor.name} on ${selectedDate} at ${selectedTime}!` 
        }
      });
    } catch (error) {
      console.error('Error booking session:', error);
      setErrors({ general: 'Failed to book session. Please try again.' });
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return <Loading text="Loading mentor details..." />;
  }

  if (!mentor) {
    return (
      <div className="mentor-not-found">
        <h2>Mentor not found</h2>
        <Button onClick={() => navigate('/mentors')}>Back to Mentors</Button>
      </div>
    );
  }

  return (
    <div className="book-session">
      <div className="page-header">
        <h1>Book a Session</h1>
        <p>Schedule a mentoring session with {mentor.name}</p>
      </div>

      <div className="booking-content">
        {/* Mentor Info */}
        <Card className="mentor-info-card">
          <div className="mentor-profile">
            <img src={mentor.avatar} alt={mentor.name} />
            <div className="mentor-details">
              <h3>{mentor.name}</h3>
              <p>{mentor.title} at {mentor.company}</p>
              <div className="mentor-rating">
                ⭐ {mentor.rating} ({mentor.reviews} reviews)
              </div>
              <div className="mentor-rate">${mentor.hourlyRate}/hour</div>
            </div>
          </div>
          
          <div className="mentor-skills">
            {mentor.skills.map(skill => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
          
          <p>{mentor.bio}</p>
        </Card>

        {/* Booking Form */}
        <Card className="booking-form-card">
          <h3>Session Details</h3>
          
          <div className="form-group">
            <label>Session Type</label>
            <select
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
              className="input"
            >
              <option value="general">General Mentoring</option>
              <option value="code-review">Code Review</option>
              <option value="career-advice">Career Advice</option>
              <option value="interview-prep">Interview Preparation</option>
              <option value="project-help">Project Help</option>
            </select>
          </div>

          <div className="form-group">
            <label>Select Date</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSelectedTime(''); // Reset time when date changes
              }}
              min={new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]} // Tomorrow
              error={errors.date}
            />
          </div>

          {selectedDate && (
            <div className="form-group">
              <label>Available Times</label>
              <div className="time-slots">
                {getAvailableTimesForDate(selectedDate).map(time => (
                  <button
                    key={time}
                    type="button"
                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
              {getAvailableTimesForDate(selectedDate).length === 0 && (
                <p className="no-slots">No available slots for this date</p>
              )}
              {errors.time && <span className="error-message">{errors.time}</span>}
            </div>
          )}

          <div className="form-group">
            <label>What would you like to learn?</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your goals for this session..."
              className={`input textarea ${errors.description ? 'input-error' : ''}`}
              rows="4"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          {selectedDate && selectedTime && (
            <div className="booking-summary">
              <h4>Booking Summary</h4>
              <div className="summary-item">
                <span>Date:</span>
                <span>{selectedDate}</span>
              </div>
              <div className="summary-item">
                <span>Time:</span>
                <span>{selectedTime}</span>
              </div>
              <div className="summary-item">
                <span>Duration:</span>
                <span>1 hour</span>
              </div>
              <div className="summary-item">
                <span>Total:</span>
                <span>${mentor.hourlyRate}</span>
              </div>
            </div>
          )}

          {errors.general && (
            <div className="error-message global-error">
              {errors.general}
            </div>
          )}

          <div className="booking-actions">
            <Button 
              variant="outline" 
              onClick={() => navigate('/mentors')}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleBookSession}
              disabled={!selectedDate || !selectedTime || isBooking}
            >
              {isBooking ? 'Booking...' : `Book Session - $${mentor.hourlyRate}`}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookSession;