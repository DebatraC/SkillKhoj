import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';
import DashboardCard from './DashboardCard';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    upcomingSessions: 0,
    totalHours: 0
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          enrolledCourses: 5,
          completedCourses: 2,
          upcomingSessions: 3,
          totalHours: 45
        });

        setRecentCourses([
          { id: 1, title: 'React Fundamentals', progress: 75, instructor: 'John Doe' },
          { id: 2, title: 'JavaScript ES6+', progress: 90, instructor: 'Jane Smith' },
          { id: 3, title: 'Node.js Backend', progress: 30, instructor: 'Mike Johnson' }
        ]);

        setUpcomingSessions([
          { id: 1, title: 'React Interview Prep', mentor: 'Sarah Wilson', date: '2025-08-01', time: '10:00 AM' },
          { id: 2, title: 'System Design Review', mentor: 'David Brown', date: '2025-08-03', time: '2:00 PM' }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <Loading text="Loading your dashboard..." />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.firstName}! 👋</h1>
        <p>Continue your learning journey</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <DashboardCard
          title="Enrolled Courses"
          value={stats.enrolledCourses}
          icon="📚"
          color="blue"
        />
        <DashboardCard
          title="Completed Courses"
          value={stats.completedCourses}
          icon="✅"
          color="green"
        />
        <DashboardCard
          title="Upcoming Sessions"
          value={stats.upcomingSessions}
          icon="📅"
          color="orange"
        />
        <DashboardCard
          title="Total Learning Hours"
          value={stats.totalHours}
          icon="⏰"
          color="purple"
        />
      </div>

      <div className="dashboard-content">
        {/* Recent Courses */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Continue Learning</h2>
            <Link to="/courses">
              <Button variant="outline" size="small">View All</Button>
            </Link>
          </div>
          <div className="courses-grid">
            {recentCourses.map(course => (
              <Card key={course.id} className="course-card">
                <h3>{course.title}</h3>
                <p>Instructor: {course.instructor}</p>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p>{course.progress}% Complete</p>
                <Button size="small">Continue</Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Sessions</h2>
            <Link to="/mentorship">
              <Button variant="outline" size="small">Book Session</Button>
            </Link>
          </div>
          <div className="sessions-list">
            {upcomingSessions.map(session => (
              <Card key={session.id} className="session-card">
                <h4>{session.title}</h4>
                <p>Mentor: {session.mentor}</p>
                <p>📅 {session.date} at {session.time}</p>
                <div className="session-actions">
                  <Button size="small" variant="primary">Join</Button>
                  <Button size="small" variant="outline">Reschedule</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/courses">
              <Button>Browse Courses</Button>
            </Link>
            <Link to="/mentors">
              <Button variant="outline">Find Mentors</Button>
            </Link>
            <Link to="/competitions">
              <Button variant="outline">Join Competitions</Button>
            </Link>
            <Link to="/jobs">
              <Button variant="outline">Job Board</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;