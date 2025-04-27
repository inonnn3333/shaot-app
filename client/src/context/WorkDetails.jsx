// import { createContext, useContext, useEffect, useState } from "react";
import { createContext, useContext, useState } from "react";

const WorkDetails = createContext();

export const WorkDetailsProvider = ({ children }) => {
    const [startWork, setStartWork] = useState(null);
    const [endWork, setEndWork] = useState(null);
    const [comment, setComment] = useState('');

    const saveInLocalStorage = (key, workTime) => {
        localStorage.setItem(key, JSON.stringify({ workTime, date: new Date().toLocaleDateString('en-IL') }));
    }
    
    const getFromLocalStorage = (key) => {
        const workTimeFromLS = JSON.parse(localStorage.getItem(key));
        return workTimeFromLS.workTime;
        
    }

    // useEffect(() => {
    //     const today = JSON.parse(localStorage.getItem('startWork'));
        
    //     if (today.date === new Date().toLocaleDateString('en-IL')) {
            
    //         setStartWork(getFromLocalStorage('startWork'));
    //         setEndWork(getFromLocalStorage('endWork'));
    //     }
    //     else {
    //         localStorage.clear();
    //     }
    // }, []);

    return (
        <WorkDetails.Provider value={{ setStartWork, setEndWork, setComment, startWork, endWork, comment, saveInLocalStorage, getFromLocalStorage }}>
            {children}
        </WorkDetails.Provider>
    );
};

// Hook מותאם אישית לשימוש ב-Context
export const useDetails = () => {
    return useContext(WorkDetails);
};
