// export const calculateWorkHours = (start, end) => {
//     const diffMs = new Date(end) - new Date(start); // הפרש במילישניות
//     const totalMinutes = Math.floor(diffMs / (1000 * 60)); // דקות

//     const hours = Math.floor(totalMinutes / 60);
//     const minutes = totalMinutes % 60;

//     if (minutes === 0) return `${hours} שעות`;
//     if (hours === 0) return `${minutes} דקות`;
//     return `${hours} שע' ו־${minutes} דק'`;
// };

import dayjs from 'dayjs';

export const calculateWorkHours = (start, end) => {
    if (!start || !end) return "0 שעות";

    const startTime = dayjs(start);
    const endTime = dayjs(end);

    // חישוב ההפרש בדקות בצורה פשוטה
    const totalMinutes = endTime.diff(startTime, 'minute');

    if (totalMinutes < 0) return "שגיאה בזמנים";

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} דקות`;
    if (minutes === 0) return `${hours} שעות`;
    return `${hours} שע' ו-${minutes} דק'`;
};