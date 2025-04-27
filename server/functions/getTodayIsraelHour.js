const getTodayIsraelHour = () => {
    const now = new Date(); // תאריך ושעה נוכחיים
    now.setHours(0, 0, 0, 0); // מאפס שעה

    // חישוב הפרש בין שעון UTC לשעון ישראל
    const timezoneOffset = 2 * 60; // UTC+2 (בחורף) | UTC+3 בקיץ ישתנה אוטומטית
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset() + timezoneOffset);

    console.log(now.toISOString()); // מדפיס בפורמט ISO
    return now.toISOString(); // מחזיר בפורמט ISO
};

export default getTodayIsraelHour;