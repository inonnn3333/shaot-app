import React ,{useState} from 'react';
import { useStep } from '../../context/StepContext';
import { useDetails } from '../../context/WorkDetails';
import { calculateWorkHours } from '../calculate/calculateWorkHours';
import { motion } from 'framer-motion';

import apiService from "../../services/apiService.js";
// import {convertToISODate} from '../calculate/convertToISODate.js';
import { useNavigate } from 'react-router-dom';


const LastScreen = () => {
    const navigate = useNavigate();

    const { prevStep } = useStep();
    const { setStartWork, setEndWork, setComment, startWork, endWork, comment } = useDetails();
    const [openDetailes, setOpenDetailes] = useState(false);
    
    const calculateWorkTime = (startTime, endTime) =>  {
        const time =  calculateWorkHours(startTime, endTime);
        if (time === 1) {
            return 'שעה אחת';
        } else if(time === 2) {
            return 'שעתיים';
        } 
        return `${time} שעות`;   
    } 

    const handleSubmit = async (e) => {

        try {
            e.preventDefault();
            const workDay = JSON.stringify({
                date: '',
                startWork,
                endWork,
                comment
            })
            await apiService.addWorkDay(workDay);
            
            navigate('/my-board')
        } catch (err) {
            console.log("the error",err.message);
        }
    }

    const formatTimeToInput = (dateObj) => {
        if (!dateObj) return "";
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
        };

    return (
        <div className="lastScreen-container">
            <div>
                <h2>אז להיום סה"כ:
                    {calculateWorkTime(startWork, endWork)}
                </h2>
            </div>


                <motion.div
                className={`details-container ${openDetailes ? 'open' : 'closed'}`}
                initial={false}
                animate={openDetailes ? "open" : "closed"}
                transition={{ duration: 0.5, ease: "easeInOut" }}>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>שעת התחלה</th>
                                <th>שעת סיום</th>
                            </tr>
                            <tr>
                                <th>
                                    <input
                                        type="time"
                                        value={formatTimeToInput(startWork)}
                                        onChange={(e) => {
                                            const [hours, minutes] = e.target.value.split(":").map(Number);
                                            const updated = new Date(startWork);
                                            updated.setHours(hours, minutes, 0, 0);
                                            setStartWork(updated);
                                        }}
/>
                                </th>
                                <th>
                                    <input
                                        type="time"
                                        value={formatTimeToInput(endWork)}
                                        onChange={(e) => {
                                            const [hours, minutes] = e.target.value.split(":").map(Number);
                                            const updated = new Date(startWork);
                                            updated.setHours(hours, minutes, 0, 0);
                                            setEndWork(updated);
                                        }}
                                        />
                                </th>
                                {/* <th><input
                                    type="time"
                                    value={startWork}
                                    onChange={(e) => setStartWork(e.target.value)}
                                /></th>
                                <th><input 
                                    type="time" 
                                    value={endWork}
                                    onChange={(e) => setEndWork(e.target.value)}
                                /></th> */}
                            </tr>
                        </thead>
                    </table>
                </div>
                </motion.div>
            

            <button className='details-button' onClick={() => setOpenDetailes(!openDetailes)}>
                {!openDetailes ? 
                    <img src="images/arrow-details-down.png" alt="arrow-details-down" />
                    :
                    <img src="images/arrow-details-up.png" alt="arrow-details-up" />                
                }
            </button>
            <form action="">
                <label htmlFor="">אם יש הערות, זה הזמן</label>
                <input type="text" onChange={(e)=> setComment(e.target.value)}/>
            </form>

            <div className='lastScreen-buttons'>
                <button onClick={() => prevStep()}>חזור</button>
                <button onClick={(e) => handleSubmit(e)}>יאללה זהו</button>
            </div>
        </div>
    )
}

export default LastScreen;
