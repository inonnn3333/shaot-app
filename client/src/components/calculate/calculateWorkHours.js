
export const calculateWorkHours = (startTime, endTime) => {
    
    const start = new Date(startTime);
    const end = new Date(endTime);

    // חישוב ההפרש במילישניות -> המרה לשעות


    const diffMs = end - start; // הפרש במילישניות  
    const hoursWorked = diffMs / (1000 * 60 * 60); // ממירים לשעות    
    return hoursWorked; 
};
