import axios from 'axios';


const API_URL = import.meta.env.PROD ? '' : 'http://localhost:1010';
// const API_URL = import.meta.env.PROD ? 'https://shaot-app-server.onrender.com' : 'http://localhost:1010';

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});

const login = async (email, password) => {
    try {
        const response = await api.post('/users/login', { email, password });
        const { token, message } = response.data;
        return { token, message };
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
    const response = await api.get(`/all-data/${date}`);
    return response.data;
};


const addWorkDay = async (workDay) => {
    try {
        await api.post('/add-data', workDay);
    } catch (err) {
        console.log(err.message);
        return;
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