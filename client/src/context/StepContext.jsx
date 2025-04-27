import { createContext, useContext, useState } from "react";

const StepContext = createContext();

export const StepProvider = ({ children }) => {
    const [step, setStep] = useState(1); 

  // מעבר לשלב הבא
    const nextStep = () => setStep((prev) => prev + 1);

    // חזרה לשלב הקודם
    const prevStep = () => setStep((prev) => prev - 1);


    return (
        <StepContext.Provider value={{ step, nextStep, prevStep }}>
        {children}
        </StepContext.Provider>
    );
};

// Hook מותאם אישית לשימוש ב-Context
export const useStep = () => {
    return useContext(StepContext);
};
