// import { initialData } from "../../fakeData.js";


const calculateWorkingHours = (data) => {
    let totalHours = 0;

    data.forEach((item) => {
        const start = new Date(item.startWork);
        const end = new Date(item.endWork);

        const diffMs = end - start;
        const hoursWorked = diffMs / (1000 * 60 * 60); // מ-מילישניות לשעות

        totalHours += hoursWorked;
    });

    return totalHours.toFixed(1); // לדוגמה: 12.5 שעות
};


const calculateMoney = (data) => {
    const totalHours = calculateWorkingHours(data);
    return (totalHours * 28).toFixed(0); // שכר כולל בש"ח
};

export { calculateMoney, calculateWorkingHours };