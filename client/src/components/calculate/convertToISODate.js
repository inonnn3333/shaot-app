export const convertToISODate = (timeString) => {
    const date = new Date(); // יצירת תאריך מאובייקט קיים
    const [hours, minutes] = timeString.split(":").map(Number); // פיצול השעה למספרים
    date.setHours(hours, minutes, 0, 0); // קביעת השעה והדקות
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString(); // החזרת התאריך בפורמט ISO 8601
};
