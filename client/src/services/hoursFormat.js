import moment from "moment";

const changeHourFormatToFullFormat = (aHour) => {
        const todayDate = moment().format("YYYY-MM-DD"); // קביעת התאריך הנוכחי
        const fullDateTime = `${todayDate}T${aHour}:00`;

        return fullDateTime;
    }

const changeHourFormatToFriendlyFormat = (aHour) => {
    const friendlyHour = moment(aHour).format('HH:mm');
    return friendlyHour;
}


const hoursFormatService = {
    changeHourFormatToFullFormat,
    changeHourFormatToFriendlyFormat
}
export default hoursFormatService;