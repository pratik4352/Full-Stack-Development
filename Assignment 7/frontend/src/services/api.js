import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getCurrentUser: () => api.get('/auth/me'),
};

// Feedback endpoints
export const feedbackAPI = {
  createFeedback: (data) => api.post('/feedbacks', data),
  getAllFeedbacks: (params) => api.get('/feedbacks', { params }),
  getFeedbackById: (id) => api.get(`/feedbacks/${id}`),
  updateFeedback: (id, data) => api.put(`/feedbacks/${id}`, data),
  deleteFeedback: (id) => api.delete(`/feedbacks/${id}`),
  getUserFeedbacks: (userId) => api.get(`/feedbacks/user/${userId}`),
};

// Review endpoints
export const reviewAPI = {
  createReview: (data) => api.post('/reviews', data),
  getAllReviews: (params) => api.get('/reviews', { params }),
  getReviewsByFeedback: (feedbackId) => api.get(`/reviews/feedback/${feedbackId}`),
  getReviewsByReviewer: (reviewerId) => api.get(`/reviews/reviewer/${reviewerId}`),
  updateReview: (id, data) => api.put(`/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
};

export default api;
