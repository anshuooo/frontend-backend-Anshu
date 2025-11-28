import api from './api';

// Signup
export const signup = async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
};

// Login
export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};

// Logout
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Get current user from localStorage
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};
