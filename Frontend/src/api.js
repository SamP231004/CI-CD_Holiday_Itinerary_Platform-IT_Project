import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const registerUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createCheckoutSession = async (amount) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/create-checkout-session`, {
            amount: amount,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createTrip = async (userId, text) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/trips`, {
            userId,
            text,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserTrips = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/trips/user/${userId}`);
        return response.data;
    } 
    catch (error) {
        throw error;
    }
};