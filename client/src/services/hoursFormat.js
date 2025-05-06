// import moment from "moment";
import moment from 'moment-timezone';

const changeHourFormatToFullFormat = (aHour) => {
        const todayDate = moment().format("YYYY-MM-DD"); // קביעת התאריך הנוכחי
        const fullDateTime = `${todayDate}T${aHour}:00`;

        return fullDateTime;
    }


const changeHourFormatToFriendlyFormat = (aHour) => {
    return moment(aHour).subtract(3, 'hours').format('HH:mm')
};



const hoursFormatService = {
    changeHourFormatToFullFormat,
    changeHourFormatToFriendlyFormat
}
export default hoursFormatService;