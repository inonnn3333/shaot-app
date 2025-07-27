import React from 'react';
import { useStep } from '../../context/StepContext';
import { useDetails } from '../../context/WorkDetails';
// import hoursFormatService from '../../services/hoursFormat';
import { useAuthContext } from '../../context/authContext';


const StartWork = () => {
    const { nextStep } = useStep();
    const { setStartWork, startWork } = useDetails();
    const { user } = useAuthContext();


    return (

        <div className="startWork-container">
            <p>היי {user ? user.name.firstName : "משתמש יקר"},
            </p>
            <h2>מתי התחלת היום?</h2>
            {/* <input
                type="time"
                // value={startWork}
                onChange={(e)=> {setStartWork(hoursFormatService.changeHourFormatToFullFormat(e.target.value))}}/> */}

            <input
                type="time"
                onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(":").map(Number);
                    const date = new Date();
                    date.setHours(hours, minutes, 0, 0);
                    setStartWork(date);
                }}
                />


            <button
                onClick={() => {
                    nextStep();
                    // saveInLocalStorage('startWork',startWork)
                }}
                disabled={!startWork}
                >
                    <img src="images/arrow.png" alt="arrow-icon" />
            </button>

        </div>
    )
}

export default StartWork;
