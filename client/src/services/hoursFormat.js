// // import moment from "moment";
// import moment from 'moment-timezone';

// const changeHourFormatToFullFormat = (aHour) => {
//         const todayDate = moment().format("YYYY-MM-DD"); // קביעת התאריך הנוכחי
//         const fullDateTime = `${todayDate}T${aHour}:00`;

//         return fullDateTime;
//     }


// const changeHourFormatToFriendlyFormat = (aHour) => {
//     return moment(aHour).subtract(3, 'hours').format('HH:mm')
// };



// const hoursFormatService = {
//     changeHourFormatToFullFormat,
//     changeHourFormatToFriendlyFormat
// }
// export default hoursFormatService;


import dayjs from 'dayjs';

const hoursFormatService = {
    // מציג שעה בפורמט 14:30
    formatToFriendly: (date) => {
        if (!date) return "--:--";
        return dayjs(date).format('HH:mm');
    },

    // יוצר אובייקט תאריך מקומי מה-Input (מונע באגים של UTC)
    createDateFromInput: (timeString) => {
        if (!timeString) return null;
        const [hours, minutes] = timeString.split(':').map(Number);
        // יוצר תאריך של היום עם השעה שנבחרה בזמן מקומי
        return dayjs().set('hour', hours).set('minute', minutes).set('second', 0).toDate();
    },

    // הכנה לשליחה לשרת - מחרוזת נקייה ללא "Z" בסוף
    formatForServer: (date) => {
        if (!date) return null;
        return dayjs(date).format('YYYY-MM-DDTHH:mm:ss');
    }
};

export default hoursFormatService;