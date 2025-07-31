import { apiService } from './api';

export const coursesService = {
  async getAllCourses(filters = {}) {
    // Mock data - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockCourses = [
          {
            id: 1,
            title: 'React Fundamentals',
            description: 'Learn the basics of React including components, state, and props.',
            instructor: 'John Doe',
            category: 'web-development',
            price: 99,
            rating: 4.8,
            students: 1250,
            duration: '8 weeks',
            level: 'Beginner',
            image: 'https://via.placeholder.com/300x200?text=React+Course'
          },
          // Add more courses...
        ];
        resolve(mockCourses);
      }, 1000);
    });
    
    // Actual API call would be:
    // const queryParams = new URLSearchParams(filters).toString();
    // return apiService.get(`/courses?${queryParams}`);
  },

  async getCourseById(id) {
    // Mock data - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: parseInt(id),
          title: 'React Fundamentals',
          description: 'Comprehensive React course...',
          // ... other course details
        });
      }, 1000);
    });
    
    // Actual API call would be:
    // return apiService.get(`/courses/${id}`);
  },

  async createCourse(courseData) {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          ...courseData,
          createdAt: new Date().toISOString()
        });
      }, 2000);
    });
    
    // Actual API call would be:
    // return apiService.post('/courses', courseData);
  },

  async updateCourse(id, courseData) {
    // Actual API call would be:
    // return apiService.put(`/courses/${id}`, courseData);
    return Promise.resolve({ id, ...courseData });
  },

  async deleteCourse(id) {
    // Actual API call would be:
    // return apiService.delete(`/courses/${id}`);
    return Promise.resolve({ message: 'Course deleted' });
  },

  async enrollInCourse(courseId) {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Enrolled successfully' });
      }, 1000);
    });
    
    // Actual API call would be:
    // return apiService.post(`/courses/${courseId}/enroll`);
  },

  async getEnrolledCourses() {
    // Actual API call would be:
    // return apiService.get('/courses/enrolled');
    return Promise.resolve([]);
  }
};