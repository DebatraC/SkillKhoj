import { apiService } from './api';

export const authService = {
  async login(email, password) {
    // For now, using mock data - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: Date.now(),
          email,
          firstName: 'John',
          lastName: 'Doe',
          role: email.includes('mentor') ? 'mentor' : 
                email.includes('recruiter') ? 'recruiter' :
                email.includes('admin') ? 'admin' : 'student',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('John Doe')}&background=007bff&color=fff`
        };
        
        resolve({
          user: mockUser,
          token: 'mock-jwt-token'
        });
      }, 1000);
    });
    
    // Actual API call would be:
    // return apiService.post('/auth/login', { email, password });
  },

  async register(userData) {
    // Mock registration - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now(),
          ...userData,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.firstName + ' ' + userData.lastName)}&background=007bff&color=fff`
        };
        
        resolve({
          user: newUser,
          token: 'mock-jwt-token'
        });
      }, 1000);
    });
    
    // Actual API call would be:
    // return apiService.post('/auth/register', userData);
  },

  async verifyToken(token) {
    // Mock token verification - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token === 'mock-jwt-token') {
          resolve({
            id: 1,
            email: 'user@example.com',
            firstName: 'John',
            lastName: 'Doe',
            role: 'student'
          });
        } else {
          reject(new Error('Invalid token'));
        }
      }, 500);
    });
    
    // Actual API call would be:
    // return apiService.get('/auth/verify');
  },

  async forgotPassword(email) {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Reset email sent' });
      }, 1000);
    });
    
    // Actual API call would be:
    // return apiService.post('/auth/forgot-password', { email });
  },

  async resetPassword(token, password) {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Password reset successful' });
      }, 1000);
    });
    
    // Actual API call would be:
    // return apiService.post('/auth/reset-password', { token, password });
  },

  async refreshToken() {
    // Actual API call would be:
    // return apiService.post('/auth/refresh-token');
    return Promise.resolve({ token: 'new-mock-token' });
  }
};