import React from 'react';
import { useStep } from '../../context/StepContext';
import { useDetails } from '../../context/WorkDetails';
// import hoursFormatService from '../../services/hoursFormat';


const Home = () => {
    const { nextStep, prevStep } = useStep();
    const { setEndWork, endWork } = useDetails();


    return (

        <div className="endWork-container">
            <h2>אז מתי סיימנו היום?</h2>
            {/* <input
                type="time"
                // value={endWork}
                onChange={(e) => {setEndWork(hoursFormatService.changeHourFormatToFullFormat(e.target.value))}}/> */}

            <input
                type="time"
                onChange={(e) => {
                    const [hours, minutes] = e.target.value.split(":").map(Number);
                    const date = new Date();
                    date.setHours(hours, minutes, 0, 0);
                    setEndWork(date);
                }}
                />

            <button
                onClick={() => {
                    nextStep();
                    // saveInLocalStorage('endWork', endWork)
                }} disabled={!endWork}>הבא
            </button>

            <button onClick={() => prevStep()}>חזור</button>
        </div>
    )
}

export default Home;
