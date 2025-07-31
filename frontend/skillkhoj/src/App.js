import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

// Layouts
import { MainLayout, AuthLayout, DashboardLayout } from './layouts';

// Auth Components
import { Login, Register, ForgotPassword, ResetPassword } from './features/auth';
import {useAuth}  from './hooks/useAuth';

// Dashboard Components
import { 
  StudentDashboard, 
  MentorDashboard, 
  RecruiterDashboard, 
  AdminDashboard 
} from './features/dashboard';

// Course Components
import { CourseList, CourseDetail, CreateCourse } from './features/courses';

// Profile Components
import { Profile, EditProfile } from './features/profile';

// Mentorship Components
import { 
  MentorshipList, 
  BookSession, 
  SessionHistory, 
  MockInterview 
} from './features/mentorship';

// Competition Components
import { 
  CompetitionList, 
  CompetitionDetail, 
  CreateCompetition 
} from './features/competitions';

// Interview Components
import { 
  InterviewList, 
  InterviewRoom, 
  ScheduleInterview 
} from './features/interviews';

// Job Components
import { JobList, JobDetail, PostJob } from './features/openings';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

// // Home Component
// import Home from './pages/Home';

// CSS
import './App.css';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes with Auth Layout */}
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password/:token" element={<ResetPassword />} />
              </Route>

              {/* Redirect auth routes */}
              <Route path="/login" element={<Navigate to="/auth/login" replace />} />
              <Route path="/register" element={<Navigate to="/auth/register" replace />} />
              <Route path="/forgot-password" element={<Navigate to="/auth/forgot-password" replace />} />

              {/* Protected Routes with Dashboard Layout */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardRouter />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/edit" element={<EditProfile />} />
              </Route>

              {/* Public and Protected Routes with Main Layout */}
              <Route path="/" element={<MainLayout />}>
                {/* Home */}
                <Route index element={<Home />} />

                {/* Courses */}
                <Route path="courses" element={<CourseList />} />
                <Route path="courses/:id" element={<CourseDetail />} />
                <Route 
                  path="courses/create" 
                  element={
                    <ProtectedRoute requiredRole="mentor">
                      <CreateCourse />
                    </ProtectedRoute>
                  } 
                />

                {/* Profile (can be accessed from main layout too) */}
                <Route 
                  path="profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="profile/edit" 
                  element={
                    <ProtectedRoute>
                      <EditProfile />
                    </ProtectedRoute>
                  } 
                />

                {/* Mentorship */}
                <Route path="mentors" element={<MentorshipList />} />
                <Route 
                  path="mentors/:id" 
                  element={
                    <ProtectedRoute>
                      <MentorDetail />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="mentorship/book/:mentorId" 
                  element={
                    <ProtectedRoute>
                      <BookSession />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="mentorship/sessions" 
                  element={
                    <ProtectedRoute>
                      <SessionHistory />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="mentorship/mock-interviews" 
                  element={
                    <ProtectedRoute>
                      <MockInterview />
                    </ProtectedRoute>
                  } 
                />

                {/* Competitions */}
                <Route path="competitions" element={<CompetitionList />} />
                <Route path="competitions/:id" element={<CompetitionDetail />} />
                <Route 
                  path="competitions/create" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <CreateCompetition />
                    </ProtectedRoute>
                  } 
                />

                {/* Interviews */}
                <Route 
                  path="interviews" 
                  element={
                    <ProtectedRoute>
                      <InterviewList />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="interviews/:id" 
                  element={
                    <ProtectedRoute>
                      <InterviewRoom />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="interviews/schedule" 
                  element={
                    <ProtectedRoute requiredRole="recruiter">
                      <ScheduleInterview />
                    </ProtectedRoute>
                  } 
                />

                {/* Jobs */}
                <Route path="jobs" element={<JobList />} />
                <Route path="jobs/:id" element={<JobDetail />} />
                <Route 
                  path="jobs/post" 
                  element={
                    <ProtectedRoute requiredRole="recruiter">
                      <PostJob />
                    </ProtectedRoute>
                  } 
                />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

// Dashboard Router Component
const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (user.role) {
    case 'student':
      return <StudentDashboard />;
    case 'mentor':
      return <MentorDashboard />;
    case 'recruiter':
      return <RecruiterDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <StudentDashboard />;
  }
};

// // Protected Route Component
// const ProtectedRoute = ({ children, requiredRole = null }) => {
//   const { isAuthenticated, user, isLoading } = useAuth();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (requiredRole && user?.role !== requiredRole) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   return children;
// };

// Home Component
const Home = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to LearnPlatform</h1>
          <p>Your gateway to learning, mentorship, and career opportunities</p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-large">
              Get Started
            </Link>
            <Link to="/courses" className="btn btn-outline btn-large">
              Explore Courses
            </Link>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2>Everything you need to succeed</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Expert-Led Courses</h3>
              <p>Learn from industry professionals with hands-on projects</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3>1-on-1 Mentorship</h3>
              <p>Get personalized guidance from experienced mentors</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Competitions</h3>
              <p>Test your skills in coding challenges and win prizes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Job Opportunities</h3>
              <p>Connect with top companies and find your dream job</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mentor Detail Component (simple placeholder)
const MentorDetail = () => {
  // const { id } = useParams();
  const { id } = "xyz"; // Placeholder for mentor ID
  return (
    <div>
      <h1>Mentor Profile</h1>
      <p>Mentor ID: {id}</p>
      {/* Add mentor profile details here */}
    </div>
  );
};

// 404 Component
const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default App;