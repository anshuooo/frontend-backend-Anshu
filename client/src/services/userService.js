import api from './api';

// Get user profile
export const getUserProfile = async () => {
    const response = await api.get('/user/profile');
    return response.data;
};

// Update user profile
export const updateUserProfile = async (userData) => {
    const response = await api.put('/user/profile', userData);
    // Update user in localStorage
    if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
};
