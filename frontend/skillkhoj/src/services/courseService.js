import apiRequest from './api';

export const courseService = {
  getAllCourses: async () => {
    return apiRequest('/courses');
  },
  
  getCourse: async (id) => {
    return apiRequest(`/courses/${id}`);
  },
  
  enrollInCourse: async (courseId) => {
    return apiRequest(`/courses/${courseId}/enroll`, {
      method: 'POST',
    });
  }
};