import moment from 'moment';

const changeDateFormatToFullFormat =(aDate) => {
    const changeFormatDate = moment(aDate).format('DD/MM');
    return changeFormatDate;
}

const changeDateFormatToFriendlyFormatToEditComp =(aDate) => {
    const changeFormatDate = moment(aDate).format('DD/MM/YYYY');
    return changeFormatDate;
}


const dateFormatService = {
    changeDateFormatToFriendlyFormat,
    changeDateFormatToFriendlyFormatToEditComp
}

export default dateFormatService;