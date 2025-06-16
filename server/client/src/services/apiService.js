import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
});



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
    const response = await api.get('/data-this-month');
    return response.data;
}

const getDaysInRange = async (startDate, endDate) => {
    const response = await api.get(`/data-range?start=${startDate}&end=${endDate}`);
    return response.data;
};


const apiService = {
    getAllWorkDays,
    getWorkDayByDate,
    addWorkDay,
    addNewWorkDay,
    EditWorkDay,
    getCurrentMonthDaysWork,
    getDaysInRange
};

export default apiService; 