import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../../components';

const CourseCard = ({ course }) => {
  return (
    <Card className="course-card">
      <div className="course-image">
        <img src={course.image} alt={course.title} />
        <div className="course-level">{course.level}</div>
      </div>
      
      <div className="course-content">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-instructor">by {course.instructor}</p>
        <p className="course-description">{course.description}</p>
        
        <div className="course-meta">
          <div className="course-rating">
            ⭐ {course.rating} ({course.students.toLocaleString()} students)
          </div>
          <div className="course-duration">📅 {course.duration}</div>
        </div>
        
        <div className="course-footer">
          <div className="course-price">${course.price}</div>
          <div className="course-actions">
            <Link to={`/courses/${course.id}`}>
              <Button size="small">View Details</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;