import { useEffect, useState } from 'react'
import apiService from "../services/apiService"

const useWorkDays = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try{
            // const workDays = await apiService.getAllWorkDays();
            const workDays = await apiService.getCurrentMonthDaysWork();
            setData(workDays);
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false);
        }
    }

    const addWorkDay = async (workDay) => {
        try {
            await apiService.addWorkDay(workDay);
            setData([...data, workDay]);
        } catch (err) {
            setError(err.message)
        }
    }

    const handleFilterRange = async (start, end) => {
        try {
            setLoading(true);
            const filtered = await apiService.getDaysInRange(start, end);
            setData(filtered);
        } catch (err) {
            console.error("Error fetching filtered data:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    return {data, loading, error, addWorkDay, handleFilterRange};
}

export default useWorkDays;
