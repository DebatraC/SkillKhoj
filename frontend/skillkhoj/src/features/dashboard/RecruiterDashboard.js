import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Loading } from '../../components';
import { useAuth } from '../../context/AuthContext';
import DashboardCard from './DashboardCard';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplicants: 0,
    scheduledInterviews: 0,
    hiredCandidates: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [upcomingInterviews, setUpcomingInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          activeJobs: 8,
          totalApplicants: 156,
          scheduledInterviews: 12,
          hiredCandidates: 5
        });

        setRecentJobs([
          { id: 1, title: 'Senior React Developer', applicants: 45, posted: '2025-07-25' },
          { id: 2, title: 'Full Stack Engineer', applicants: 38, posted: '2025-07-28' },
          { id: 3, title: 'DevOps Engineer', applicants: 22, posted: '2025-07-30' }
        ]);

        setUpcomingInterviews([
          { id: 1, candidate: 'John Doe', position: 'React Developer', date: '2025-08-01', time: '10:00 AM' },
          { id: 2, candidate: 'Jane Smith', position: 'Full Stack Engineer', date: '2025-08-01', time: '2:00 PM' }
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
    return <Loading text="Loading recruiter dashboard..." />;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Recruiter Dashboard 🎯</h1>
        <p>Welcome back, {user?.firstName}!</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <DashboardCard
          title="Active Job Posts"
          value={stats.activeJobs}
          icon="💼"
          color="blue"
        />
        <DashboardCard
          title="Total Applicants"
          value={stats.totalApplicants}
          icon="👥"
          color="green"
        />
        <DashboardCard
          title="Scheduled Interviews"
          value={stats.scheduledInterviews}
          icon="📅"
          color="orange"
        />
        <DashboardCard
          title="Hired This Month"
          value={stats.hiredCandidates}
          icon="✅"
          color="purple"
        />
      </div>

      <div className="dashboard-content">
        {/* Recent Job Posts */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Job Posts</h2>
            <Link to="/jobs/post">
              <Button variant="primary" size="small">Post New Job</Button>
            </Link>
          </div>
          <div className="jobs-grid">
            {recentJobs.map(job => (
              <Card key={job.id} className="job-card">
                <h4>{job.title}</h4>
                <p>👥 {job.applicants} applicants</p>
                <p>📅 Posted: {job.posted}</p>
                <div className="job-actions">
                  <Button size="small">View Applicants</Button>
                  <Button size="small" variant="outline">Edit</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Interviews</h2>
            <Link to="/interviews">
              <Button variant="outline" size="small">View All</Button>
            </Link>
          </div>
          <div className="interviews-list">
            {upcomingInterviews.map(interview => (
              <Card key={interview.id} className="interview-card">
                <h4>{interview.candidate}</h4>
                <p>Position: {interview.position}</p>
                <p>📅 {interview.date} at {interview.time}</p>
                <div className="interview-actions">
                  <Button size="small" variant="primary">Start Interview</Button>
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
            <Link to="/jobs/post">
              <Button>Post New Job</Button>
            </Link>
            <Link to="/candidates">
              <Button variant="outline">Browse Candidates</Button>
            </Link>
            <Link to="/interviews">
              <Button variant="outline">Manage Interviews</Button>
            </Link>
            <Link to="/analytics">
              <Button variant="outline">View Analytics</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;