export const USER_ROLES = {
  STUDENT: 'student',
  MENTOR: 'mentor',
  RECRUITER: 'recruiter',
  ADMIN: 'admin'
};

export const COURSE_CATEGORIES = {
  WEB_DEVELOPMENT: 'web-development',
  MOBILE: 'mobile',
  DATA_SCIENCE: 'data-science',
  DEVOPS: 'devops',
  DESIGN: 'design'
};

export const JOB_TYPES = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  CONTRACT: 'Contract',
  INTERNSHIP: 'Internship'
};

export const EXPERIENCE_LEVELS = {
  ENTRY: 'Entry Level',
  MID: 'Mid Level',
  SENIOR: 'Senior Level',
  LEAD: 'Lead/Principal'
};

export const COMPETITION_STATUS = {
  UPCOMING: 'upcoming',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

export const SESSION_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  UPCOMING: 'upcoming'
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY: '/auth/verify',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  COURSES: {
    LIST: '/courses',
    DETAIL: '/courses/:id',
    CREATE: '/courses',
    ENROLL: '/courses/:id/enroll'
  },
  USERS: {
    PROFILE: '/users/:id',
    UPDATE: '/users/:id',
    SEARCH: '/users/search'
  }
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  PREFERENCES: 'preferences'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  COURSES: '/courses',
  MENTORS: '/mentors',
  JOBS: '/jobs',
  COMPETITIONS: '/competitions',
  INTERVIEWS: '/interviews'
};