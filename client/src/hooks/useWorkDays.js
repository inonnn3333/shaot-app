import { useEffect, useState } from 'react'
import apiService from "../services/apiService"

const useWorkDays = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try{
            // const workDays = await apiService.getAllWorkDays();
            // const workDays = await apiService.getCurrentMonthDaysWork();
            const workDays = await apiService.getMayDaysWork();
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

    useEffect(() => {
        fetchData();
    },[])

    return {data, loading, error, addWorkDay}
}

export default useWorkDays;
