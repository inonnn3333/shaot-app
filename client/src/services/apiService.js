import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === "development";

const API_URL = isDevelopment ? process.env.REACT_APP_API_URL : "";

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

const login = async (email, password) => {
    try {
        const response = await api.post('/users/login', { email, password });
        const { token, user, message } = response.data;
        return { token, user, message };
    } catch (error) {
        throw error.response?.data || { message: error.message };
    }
};
const register = async (userData) => {
    try {
        const response = await api.post('/users/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message };
    }
};

const getAllWorkDays = async () => {
    const response = await api.get('/all-data');
    
    return response.data;
}


const getWorkDayByDate = async (date) => {
    try {
        console.log("🔍 Fetching work day by date:", date);
        const response = await api.get(`/all-data/${date}`);
        return response.data;
    } catch (err) {
        console.error("Error fetching work day by date:", err.message);
        throw err;
    }
};


const addWorkDay = async (workDay) => {
    try {
        await api.post('/add-data', workDay);
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}

const addNewWorkDay = async (workDay) => {
    try {
        await api.post('/add-new-data', workDay);
    } catch (err) {
        throw err;
    }
}


const EditWorkDay = async (workDay) => {
    await api.put(`/edit-data/${workDay.date}`, workDay);
}


const getCurrentMonthDaysWork = async () => {
    console.log("🔍 מבצע בקשת API...");
    const response = await api.get('/data-this-month');
    return response.data;
}

const getDaysInRange = async (startDate, endDate) => {
    const response = await api.get(`/data-range?start=${startDate}&end=${endDate}`);
    return response.data;
};


const apiService = {
    login,
    register,
    getAllWorkDays,
    getWorkDayByDate,
    addWorkDay,
    addNewWorkDay,
    EditWorkDay,
    getCurrentMonthDaysWork,
    getDaysInRange
};

export default apiService; 