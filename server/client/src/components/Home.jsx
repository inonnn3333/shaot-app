import React from 'react';
import { useStep } from '../context/StepContext';

import StartWork from './stepsComp/StartWork';
import EndWork from './stepsComp/EndWork';
import LastScreen from './stepsComp/LastScreen';

const Home = () => {
    const { step } = useStep();

    return (
        <div className="home-container">
            {(step === 1) ? <StartWork /> : (step === 2) ? <EndWork /> : <LastScreen />}
        </div>
    );
}

export default Home;
