import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';
import DashboardCard from './DashboardCard';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeCourses: 0,
    totalMentors: 0,
    monthlyRevenue: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemHealth, setSystemHealth] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalUsers: 1250,
          activeCourses: 85,
          totalMentors: 45,
          monthlyRevenue: 25000
        });

        setRecentActivity([
          { id: 1, action: 'New user registration', user: 'Alice Johnson', time: '2 mins ago' },
          { id: 2, action: 'Course completed', user: 'Bob Smith', time: '15 mins ago' },
          { id: 3, action: 'Mentor application approved', user: 'Carol Davis', time: '1 hour ago' },
          { id: 4, action: 'New job posted', user: 'TechCorp Inc.', time: '2 hours ago' }
        ]);

        setSystemHealth([
          { service: 'API Server', status: 'healthy', uptime: '99.9%' },
          { service: 'Database', status: 'healthy', uptime: '99.8%' },
          { service: 'File Storage', status: 'warning', uptime: '98.5%' },
          { service: 'Video Service', status: 'healthy', uptime: '99.7%' }
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
    return <Loading text="Loading admin dashboard..." />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard 👑</h1>
        <p>System overview and management</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <DashboardCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
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
          title="Total Mentors"
          value={stats.totalMentors}
          icon="👨‍🏫"
          color="orange"
        />
        <DashboardCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon="💰"
          color="purple"
        />
      </div>

      <div className="dashboard-content">
        {/* System Health */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>System Health</h2>
            <Button variant="outline" size="small">View Details</Button>
          </div>
          <div className="health-grid">
            {systemHealth.map(service => (
              <Card key={service.service} className="health-card">
                <div className="health-header">
                  <h4>{service.service}</h4>
                  <span className={`status-indicator ${service.status}`}>
                    {service.status === 'healthy' ? '🟢' : '🟡'}
                  </span>
                </div>
                <p>Uptime: {service.uptime}</p>
                <p>Status: {service.status}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <Link to="/activity">
              <Button variant="outline" size="small">View All</Button>
            </Link>
          </div>
          <div className="activity-list">
            {recentActivity.map(activity => (
              <Card key={activity.id} className="activity-card">
                <div className="activity-content">
                  <h4>{activity.action}</h4>
                  <p>User: {activity.user}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h2>Management Tools</h2>
          <div className="admin-actions">
            <Link to="/admin/users">
              <Button>Manage Users</Button>
            </Link>
            <Link to="/admin/courses">
              <Button variant="outline">Manage Courses</Button>
            </Link>
            <Link to="/admin/mentors">
              <Button variant="outline">Approve Mentors</Button>
            </Link>
            <Link to="/admin/reports">
              <Button variant="outline">Generate Reports</Button>
            </Link>
            <Link to="/admin/settings">
              <Button variant="outline">System Settings</Button>
            </Link>
            <Link to="/admin/analytics">
              <Button variant="outline">Analytics</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;