import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Loading, Modal } from '../../components';
import { useAuth } from '../../context/AuthContext';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockCourse = {
          id: parseInt(id),
          title: 'React Fundamentals',
          description: 'Learn the basics of React including components, state, and props. This comprehensive course will take you from React beginner to confident developer.',
          instructor: 'John Doe',
          instructorBio: 'Senior Software Engineer with 8+ years of experience in React development.',
          category: 'web-development',
          price: 99,
          rating: 4.8,
          students: 1250,
          duration: '8 weeks',
          level: 'Beginner',
          image: 'https://via.placeholder.com/600x300?text=React+Course',
          curriculum: [
            { title: 'Introduction to React', duration: '2 hours', completed: false },
            { title: 'Components and JSX', duration: '3 hours', completed: false },
            { title: 'State and Props', duration: '4 hours', completed: false },
            { title: 'Event Handling', duration: '3 hours', completed: false },
            { title: 'Hooks', duration: '5 hours', completed: false },
            { title: 'Context API', duration: '3 hours', completed: false },
            { title: 'Routing', duration: '4 hours', completed: false },
            { title: 'Final Project', duration: '6 hours', completed: false }
          ],
          requirements: [
            'Basic HTML and CSS knowledge',
            'JavaScript fundamentals',
            'A computer with internet connection'
          ],
          whatYoullLearn: [
            'Build React applications from scratch',
            'Understand React components and JSX',
            'Manage state and props effectively',
            'Use React hooks',
            'Implement routing in React apps',
            'Deploy React applications'
          ]
        };
        
        setCourse(mockCourse);
        // Check if user is enrolled (mock check)
        setIsEnrolled(false);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      // Mock enrollment API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEnrolled(true);
      setShowEnrollModal(false);
      // Could redirect to course content or show success message
    } catch (error) {
      console.error('Enrollment failed:', error);
    }
  };

  if (isLoading) {
    return <Loading text="Loading course details..." />;
  }

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course not found</h2>
        <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
      </div>
    );
  }

  return (
    <div className="course-detail">
      {/* Course Header */}
      <div className="course-header">
        <div className="course-hero">
          <img src={course.image} alt={course.title} />
        </div>
        <div className="course-info">
          <h1>{course.title}</h1>
          <p className="course-subtitle">{course.description}</p>
          
          <div className="course-meta">
            <div className="meta-item">
              <span>Instructor:</span> {course.instructor}
            </div>
            <div className="meta-item">
              <span>Rating:</span> ⭐ {course.rating} ({course.students.toLocaleString()} students)
            </div>
            <div className="meta-item">
              <span>Duration:</span> {course.duration}
            </div>
            <div className="meta-item">
              <span>Level:</span> {course.level}
            </div>
          </div>
          
          <div className="course-actions">
            <div className="course-price">${course.price}</div>
            {isEnrolled ? (
              <Button size="large">Continue Learning</Button>
            ) : (
              <Button 
                size="large" 
                onClick={() => setShowEnrollModal(true)}
              >
                Enroll Now
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="course-content">
        <div className="course-main">
          {/* What You'll Learn */}
          <Card className="course-section">
            <h2>What You'll Learn</h2>
            <ul className="learning-objectives">
              {course.whatYoullLearn.map((item, index) => (
                <li key={index}>✅ {item}</li>
              ))}
            </ul>
          </Card>

          {/* Course Curriculum */}
          <Card className="course-section">
            <h2>Course Curriculum</h2>
            <div className="curriculum-list">
              {course.curriculum.map((lesson, index) => (
                <div key={index} className="curriculum-item">
                  <div className="lesson-info">
                    <h4>{lesson.title}</h4>
                    <span className="lesson-duration">{lesson.duration}</span>
                  </div>
                  {isEnrolled && (
                    <Button size="small" variant="outline">
                      {lesson.completed ? 'Completed' : 'Start'}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Requirements */}
          <Card className="course-section">
            <h2>Requirements</h2>
            <ul className="requirements-list">
              {course.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="course-sidebar">
          {/* Instructor */}
          <Card className="instructor-card">
            <h3>Your Instructor</h3>
            <div className="instructor-info">
              <h4>{course.instructor}</h4>
              <p>{course.instructorBio}</p>
            </div>
          </Card>

          {/* Course Stats */}
          <Card className="stats-card">
            <h3>Course Stats</h3>
            <div className="stats-list">
              <div className="stat-item">
                <span>Students:</span>
                <span>{course.students.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span>Rating:</span>
                <span>⭐ {course.rating}</span>
              </div>
              <div className="stat-item">
                <span>Duration:</span>
                <span>{course.duration}</span>
              </div>
              <div className="stat-item">
                <span>Level:</span>
                <span>{course.level}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Enrollment Modal */}
      <Modal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        title="Enroll in Course"
      >
        <div className="enrollment-modal">
          <h3>{course.title}</h3>
          <p>Price: <strong>${course.price}</strong></p>
          <p>You will get lifetime access to this course.</p>
          <div className="modal-actions">
            <Button onClick={handleEnroll}>Confirm Enrollment</Button>
            <Button variant="outline" onClick={() => setShowEnrollModal(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CourseDetail;