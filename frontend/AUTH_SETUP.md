# SkillKhoj Frontend - Angular Authentication

This Angular frontend provides authentication functionality that integrates with the SkillKhoj backend.

## Features

- **Login Page**: User authentication with email and password
- **Registration Page**: User registration with name, email, password, and role selection
- **Dashboard**: Protected route showing user information after login
- **Role-based UI**: Different action buttons based on user role (student, recruiter, admin)
- **Responsive Design**: Modern, mobile-friendly interface
- **JWT Token Management**: Secure token storage and validation

## Components Created

### 1. Auth Service (`src/app/services/auth.service.ts`)
- Handles API calls to backend authentication endpoints
- Manages JWT tokens with localStorage
- Provides user state management with RxJS observables
- SSR-compatible with platform detection

### 2. Login Component (`src/app/components/auth/login.component.*`)
- Form validation for email and password
- Error handling and display
- Redirects to dashboard on successful login

### 3. Registration Component (`src/app/components/auth/register.component.*`)
- Form validation with password confirmation
- Role selection (student, recruiter, admin)
- Success message and redirect to login

### 4. Dashboard Component (`src/app/components/dashboard/dashboard.component.*`)
- Protected route requiring authentication
- Displays user information
- Role-specific action buttons
- Logout functionality

## Backend Integration

The frontend is configured to work with your backend:

- **Login Endpoint**: `POST /api/auth/login`
- **Register Endpoint**: `POST /api/auth/register`
- **Base URL**: `http://localhost:5000` (configurable in auth.service.ts)

### Expected Backend Response Format

**Login/Register Success:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response:**
```json
{
  "message": "Invalid credentials"
}
```

## Routes

- `/` - Redirects to login
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Protected dashboard (requires authentication)

## How to Test

### 1. Start Backend Server
```bash
cd backend
npm start  # Should run on port 5000
```

### 2. Start Frontend Server
```bash
cd frontend
npm start  # Runs on http://localhost:4200
```

### 3. Test Registration
1. Navigate to http://localhost:4200
2. Click "Sign up here" link
3. Fill out the registration form:
   - Full Name: "John Doe"
   - Email: "john@example.com"
   - Account Type: "Student"
   - Password: "password123"
   - Confirm Password: "password123"
4. Click "Create Account"

### 4. Test Login
1. Use the registered credentials to login
2. Email: "john@example.com"
3. Password: "password123"
4. Click "Sign In"

### 5. Verify Dashboard
- Should redirect to dashboard after successful login
- Display user information
- Show role-appropriate action buttons
- Test logout functionality

## Styling

The application uses:
- Modern gradient backgrounds
- Responsive design with CSS Grid/Flexbox
- Custom SCSS styling
- Form validation styling
- Hover effects and transitions

## Security Features

- JWT token validation
- Protected routes
- Form validation
- XSS protection through Angular's built-in sanitization
- CORS handling for API calls

## Development Notes

- Uses Angular 20.1.0 with standalone components
- Reactive forms for validation
- RxJS for state management
- TypeScript for type safety
- SCSS for styling
- SSR compatible with platform detection
