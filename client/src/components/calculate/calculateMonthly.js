import { initialData } from "../../fakeData.js";

const calculateWorkingHours = () => {
    let totalHours = 0;
    
    initialData.forEach((item) => {
        const start = new Date(`1970-01-01T${item.startWork}:00`);
        const end = new Date(`1970-01-01T${item.endWork}:00`);

        const diffMs = end - start;
        const hoursWorked = diffMs / (1000 * 60 * 60); // 

        totalHours += parseInt(hoursWorked);
    });

    
    return totalHours;
}

const calculateMoney = () => {
    let totalHours = calculateWorkingHours();
    return totalHours * 28;    
}

export { calculateMoney, calculateWorkingHours };