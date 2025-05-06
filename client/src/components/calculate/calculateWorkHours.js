export const calculateWorkHours = (start, end) => {
    const diffMs = new Date(end) - new Date(start); // הפרש במילישניות
    const totalMinutes = Math.floor(diffMs / (1000 * 60)); // דקות

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (minutes === 0) return `${hours} שעות`;
    if (hours === 0) return `${minutes} דקות`;
    return `${hours} שעות ו־${minutes} דקות`;
};
