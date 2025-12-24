import React, { useState } from "react";
import apiService from "../services/apiService.js";
// import hoursFormatService from '../services/hoursFormat.js';
import dateFormatService from '../services/dateFormat.js';
import moment from "moment";
import { useAuthContext } from '../context/authContext.jsx';

const NewItem = ({ onClose }) => {
    const [date, setDate] = useState("");
    const [startWork, setStartWork] = useState("");
    const [endWork, setEndWork] = useState("");
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");
    const { user } = useAuthContext();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isoDate = moment(date).format("YYYY-MM-DD");

        try {
        const existing = await apiService.getWorkDayByDate(isoDate);
        if (existing) {
            setMessage("🔒 יום זה כבר קיים. ניתן לערוך אותו ישירות בטבלה.");
            return;
        }
        } catch (err) {
        if (err.response?.status !== 404) {
            setMessage("⚠ שגיאה בבדיקה. נסה שוב.");
            return;
        }
        }
        
        try {
            
            console.log("יוזר איידי",user.id);
        await apiService.addNewWorkDay({
            date: isoDate,
            startWork: moment(`${isoDate}T${startWork}`).toISOString(),
            endWork: moment(`${isoDate}T${endWork}`).toISOString(),
            comment,
            // userId: user._id // הוספת userId מההקשר
        });
        setMessage("✅ יום נשמר בהצלחה!");
        } catch (err) {
        if (err.response?.status === 403) {
            setMessage("⚠ אי אפשר להזין תאריך עתידי");
        } else {
            setMessage("⚠ שגיאה בשמירה. בדוק נתונים ונסה שוב.");
        }
        }
    };

    return (
        <div className="newItem-container">
        <div className="close">
            <button onClick={onClose}>
            <img src="images/close-icon.png" alt="close-icon" />
            </button>
            <div>{date ? dateFormatService.changeDateFormatToFriendlyFormatToEditComp(date) : "הוספת יום חדש"}</div>
        </div>

        <div className="newItem-form">
            <form className="newItem-form">
            <div className="newItem-div">
                <label>תאריך:</label>
                <input
    type="date"
    max={moment().format('YYYY-MM-DD')}
    value={date}
    onChange={(e) => setDate(e.target.value)}
    required
    />
            </div>
            <div className="newItem-div">
                <label>התחלה:</label>
                <input type="time" value={startWork} onChange={(e) => setStartWork(e.target.value)} required />
            </div>
            <div className="newItem-div">
                <label>סיום:</label>
                <input type="time" value={endWork} onChange={(e) => setEndWork(e.target.value)} required />
            </div>
            <div className="newItem-div">
                <label>הערות</label>
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            {message && <p style={{ textAlign: "center", marginTop: "1em" }}>{message}</p>}
            <div className="newItem-btn-div">
                <button onClick={handleSubmit}>
                <img src="images/check-icon.png" alt="submit-icon" />
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default NewItem;
