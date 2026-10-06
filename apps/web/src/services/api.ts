import axios from 'axios';

// Relative by default: in dev, requests flow through the Vite proxy (no CORS);
// in production, the frontend is served same-origin behind a reverse proxy.
// Set an absolute VITE_API_URL only when the API lives on a different origin.
const API_URL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (data: { name: string; email: string; phone: string; password: string; role: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

export const propertyApi = {
  getAll: (params?: Record<string, unknown>) => api.get('/properties', { params }),
  getById: (id: string) => api.get(`/properties/${id}`),
  create: (data: Record<string, unknown>) => api.post('/properties', data),
  update: (id: string, data: Record<string, unknown>) => api.put(`/properties/${id}`, data),
  delete: (id: string) => api.delete(`/properties/${id}`),
  getHostProperties: (params?: { page?: number; limit?: number }) =>
    api.get('/properties/host', { params }),
};

export const bookingApi = {
  create: (data: { propertyId: string; checkIn: string; checkOut: string; guests: number }) =>
    api.post('/bookings', data),
  getAll: (params?: { status?: string; page?: number; limit?: number }) =>
    api.get('/bookings', { params }),
  getById: (id: string) => api.get(`/bookings/${id}`),
  update: (id: string, data: { status?: string }) => api.put(`/bookings/${id}`, data),
  cancel: (id: string) => api.delete(`/bookings/${id}`),
};

export const reviewApi = {
  create: (data: { propertyId: string; rating: number; comment?: string }) =>
    api.post('/reviews', data),
  getPropertyReviews: (propertyId: string, params?: { page?: number; limit?: number }) =>
    api.get(`/reviews/property/${propertyId}`, { params }),
  getMyReviews: (params?: { page?: number; limit?: number }) =>
    api.get('/reviews/my', { params }),
  update: (id: string, data: { rating?: number; comment?: string }) =>
    api.put(`/reviews/${id}`, data),
  delete: (id: string) => api.delete(`/reviews/${id}`),
};

export const emergencyApi = {
  create: (data: {
    city: string;
    locality: string;
    purpose: string;
    description?: string;
    guests: number;
    requiredNights: number;
    phoneNumber: string;
  }) => api.post('/emergency-requests', data),
  getAll: (params?: { city?: string; status?: string; page?: number; limit?: number }) =>
    api.get('/emergency-requests', { params }),
  getById: (id: string) => api.get(`/emergency-requests/${id}`),
  update: (id: string, data: { status?: string; description?: string }) =>
    api.put(`/emergency-requests/${id}`, data),
  getNearby: (city: string, locality: string) =>
    api.get('/emergency-requests/nearby', { params: { city, locality } }),
};

export const localPartnerApi = {
  register: (area: string) => api.post('/local-partners/register', { area }),
  getProfile: () => api.get('/local-partners/profile'),
  getAll: (params?: { area?: string; status?: string; page?: number; limit?: number }) =>
    api.get('/local-partners', { params }),
  getNearby: (area: string) =>
    api.get('/local-partners/nearby', { params: { area } }),
  updateStatus: (id: string, status: string) =>
    api.put(`/local-partners/${id}/status`, { status }),
};

export const healthApi = {
  check: () => api.get('/health'),
};