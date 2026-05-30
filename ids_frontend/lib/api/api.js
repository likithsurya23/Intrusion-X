import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/";
const ACCESS_TOKEN_KEY = 'hybrid_ids_access_token';
const REFRESH_TOKEN_KEY = 'hybrid_ids_refresh_token';

// Helper functions for token management
export const getAccessToken = () => typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
export const getRefreshToken = () => typeof window !== 'undefined' ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;

export const setTokens = (access, refresh) => {
  if (typeof window !== 'undefined') {
    console.log("Setting tokens in localStorage...");
    if (access) localStorage.setItem(ACCESS_TOKEN_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }
};

export const clearTokens = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("No access token found for request:", config.url);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}api/token/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          setTokens(access);
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, logout user
          clearTokens();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async login(username, password) {
    const response = await api.post("api/token/", { username, password });
    const { access, refresh } = response.data;
    setTokens(access, refresh);
    return response.data;
  },

  async register(name, email, password) {
    const response = await api.post("api/register/", { name, email, password });
    return response.data;
  },

  async getUserMe() {
    const response = await api.get("api/user/me/");
    return response.data;
  },

  logout() {
    clearTokens();
  },

  async getAdminLoginHistory() {
    const response = await api.get("api/admin/login-history/");
    return response.data;
  }
};

export const predictionService = {
  // single prediction
  async predictSingle(features) {
    const response = await api.post("api/predict/", { features });
    return response.data;
  },

  // batch prediction using CSV file upload
  async predictBatchFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("api/batch-predict/", formData, {
      headers: {
        'Content-Type': undefined,
      },
    });

    return response.data;
  },
};

export const feedbackService = {
  async submitFeedback(subject, message) {
    const response = await api.post("api/feedback/", { subject, message });
    return response.data;
  },

  async getUserFeedback() {
    const response = await api.get(`api/feedback/?t=${new Date().getTime()}`);
    return response.data;
  },

  async getAdminFeedback() {
    const response = await api.get(`api/admin/feedback/?t=${new Date().getTime()}`);
    return response.data;
  },

  async replyToFeedback(id, adminReply, isResolved = true) {
    const response = await api.patch(`api/admin/feedback/${id}/`, { 
      admin_reply: adminReply, 
      is_resolved: isResolved 
    });
    return response.data;
  }
};

export default api;
