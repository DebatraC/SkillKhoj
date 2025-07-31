import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';
import DashboardCard from './DashboardCard';

const MentorDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeCourses: 0,
    upcomingSessions: 0,
    monthlyEarnings: 0
  });
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [recentStudents, setRecentStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalStudents: 45,
          activeCourses: 3,
          upcomingSessions: 8,
          monthlyEarnings: 2500
        });

        setUpcomingSessions([
          { id: 1, student: 'Alice Johnson', topic: 'React Interview Prep', date: '2025-08-01', time: '10:00 AM' },
          { id: 2, student: 'Bob Smith', topic: 'System Design', date: '2025-08-01', time: '2:00 PM' },
          { id: 3, student: 'Carol Davis', topic: 'JavaScript Debugging', date: '2025-08-02', time: '11:00 AM' }
        ]);

        setRecentStudents([
          { id: 1, name: 'Alice Johnson', course: 'React Fundamentals', progress: 85 },
          { id: 2, name: 'Bob Smith', course: 'Node.js Backend', progress: 60 },
          { id: 3, name: 'Carol Davis', course: 'JavaScript ES6+', progress: 95 }
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
    return <Loading text="Loading mentor dashboard..." />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Mentor Dashboard 👨‍🏫</h1>
        <p>Welcome back, {user?.firstName}!</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <DashboardCard
          title="Total Students"
          value={stats.totalStudents}
          icon="👥"
          color="blue"
        />
        <DashboardCard
          title="Active Courses"
          value={stats.activeCourses}
          icon="📚"
          color="green"
        />
        <DashboardCard
          title="Upcoming Sessions"
          value={stats.upcomingSessions}
          icon="📅"
          color="orange"
        />
        <DashboardCard
          title="Monthly Earnings"
          value={`$${stats.monthlyEarnings}`}
          icon="💰"
          color="purple"
        />
      </div>

      <div className="dashboard-content">
        {/* Upcoming Sessions */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Today's Sessions</h2>
            <Link to="/schedule">
              <Button variant="outline" size="small">View Schedule</Button>
            </Link>
          </div>
          <div className="sessions-list">
            {upcomingSessions.map(session => (
              <Card key={session.id} className="session-card">
                <h4>{session.topic}</h4>
                <p>Student: {session.student}</p>
                <p>📅 {session.date} at {session.time}</p>
                <div className="session-actions">
                  <Button size="small" variant="primary">Start Session</Button>
                  <Button size="small" variant="outline">Reschedule</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Students */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Student Progress</h2>
            <Link to="/students">
              <Button variant="outline" size="small">View All</Button>
            </Link>
          </div>
          <div className="students-grid">
            {recentStudents.map(student => (
              <Card key={student.id} className="student-card">
                <h4>{student.name}</h4>
                <p>Course: {student.course}</p>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${student.progress}%` }}
                  ></div>
                </div>
                <p>{student.progress}% Complete</p>
                <Button size="small">View Details</Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/courses/create">
              <Button>Create Course</Button>
            </Link>
            <Link to="/schedule">
              <Button variant="outline">Manage Schedule</Button>
            </Link>
            <Link to="/students">
              <Button variant="outline">View Students</Button>
            </Link>
            <Link to="/earnings">
              <Button variant="outline">Earnings Report</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;