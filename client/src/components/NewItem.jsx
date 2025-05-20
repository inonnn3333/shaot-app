import React, { useState } from 'react';
import apiService from '../services/apiService';
import moment from 'moment';

const NewItem = ({ onClose }) => {
    const [date, setDate] = useState('');
    const [startWork, setStartWork] = useState('');
    const [endWork, setEndWork] = useState('');
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isoDate = moment(date).format('YYYY-MM-DD');

        try {
        const res = await apiService.getWorkDayByDate(isoDate);
    
        // אם הצליח – זאת אומרת שהתאריך כבר קיים
        setMessage('🔒 יום זה כבר קיים. ניתן לערוך אותו ישירות בטבלה.');
        return;
        } catch (err) {
        // אם התגובה היא 404 – זה אומר שהתאריך לא קיים, וזה טוב! נמשיך להוספה
        if (err.response?.status !== 404) {
            setMessage('⚠ שגיאה בבדיקה. נסה שוב.');
            return;
        }
        }
    
        try {
            await apiService.addNewWorkDay({
                date: isoDate,
                startWork: moment(`${isoDate}T${startWork}`).toISOString(),
                endWork: moment(`${isoDate}T${endWork}`).toISOString(),
                comment
            });
        
            setMessage('✅ יום נשמר בהצלחה!');
        } catch (err) {
            if (err.response?.status === 403) {
                setMessage('⚠ אי אפשר להזין תאריך עתידי');
            } else {
                setMessage('⚠ שגיאה בשמירה. בדוק נתונים ונסה שוב.');
            }
        }
    };
    

    return (
        <div className="add-day-form">
        <h3>הוספת יום עבודה</h3>
        <form onSubmit={handleSubmit}>
            <input
                type="date"
                max={moment().format('YYYY-MM-DD')}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />

            <input type="time" value={startWork} onChange={(e) => setStartWork(e.target.value)} required />
            <input type="time" value={endWork} onChange={(e) => setEndWork(e.target.value)} required />
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="הערות (לא חובה)" />
            <button type="submit">הוסף</button>
            <button type="button" onClick={onClose}>סגור</button>
            {message && <p>{message}</p>}
        </form>
        </div>
    );
};

export default NewItem;
