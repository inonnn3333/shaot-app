// import React, {useState} from "react";
// import apiService from "../services/apiService.js";
// import hoursFormatService from '../services/hoursFormat.js';
// import dateFormatService from '../services/dateFormat.js';
// import moment from "moment";

// const EditItem = ({ item, onClose }) => {

//     const [ startWorkEdit, setStartWorkEdit ] = useState(hoursFormatService.changeHourFormatToFriendlyFormat(item.startWork));
//     const [ endWorkEdit, setEndWorkEdit ] = useState(hoursFormatService.changeHourFormatToFriendlyFormat(item.endWork));
//     const [ commentEdit, setCommentEdit ] = useState(item.comment);


//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         const workDay = {
//             date: moment(item.date).format('YYYY-MM-DD'),
//             startWork: hoursFormatService.changeHourFormatToFullFormat(startWorkEdit),
//             endWork: hoursFormatService.changeHourFormatToFullFormat(endWorkEdit),
//             comment: commentEdit
//         }

//         console.log(workDay);
        
//         apiService.EditWorkDay(workDay);
//         onClose();
//     }

//     return (
//         <div className="editItem-container">

//             <div className="close">
//                 <button onClick={onClose}>
//                     <img src="images/close-icon.png" alt="close-icon" />
//                 </button>
//                 <div>{dateFormatService.changeDateFormatToFriendlyFormatToEditComp(item.date)}</div>
//             </div>
            
//             <div className="editItem-form">
//                 <form className="editItem-form">
//                     <div className="editItem-div">
//                         <label htmlFor="">התחלה:</label>
//                         <input type="time" name="" id="" value={startWorkEdit} onChange={(e) => {setStartWorkEdit(e.target.value)}} />
//                     </div>
//                     <div className="editItem-div">
//                         <label htmlFor="">סיום:</label>
//                         <input type="time" name="" id="" value={endWorkEdit} onChange={(e) => {setEndWorkEdit(e.target.value)}}/>
//                     </div>
//                     <div className="editItem-div">
//                         <label htmlFor="">הערות</label>
//                         <input type="text" name="" id="" value={commentEdit && commentEdit} onChange={(e) => {setCommentEdit(e.target.value)}}/>
//                     </div>
//                     <div className="editItem-btn-div">
//                         <button onClick={handleSubmit}>
//                             <img src="images/check-icon.png" alt="close-icon" />
//                         </button>
//                     </div>
//                 </form>

//             </div>
//         </div>
//     );
// };

// export default EditItem;


import React, {useState} from "react";
import apiService from "../services/apiService.js";
import hoursFormatService from '../services/hoursFormat.js';
import dateFormatService from '../services/dateFormat.js';
// import moment from "moment";
import dayjs from "dayjs";

const EditItem = ({ item, onClose }) => {

    const [ startWorkEdit, setStartWorkEdit ] = useState(hoursFormatService.formatToFriendly(item.startWork));
    const [ endWorkEdit, setEndWorkEdit ] = useState(hoursFormatService.formatToFriendly(item.endWork));
    const [ commentEdit, setCommentEdit ] = useState(item.comment);


    const handleSubmit = (e) => {
        e.preventDefault();
        
        const combineDateAndTime = (originalDate, timeString) => {
            const [hours, minutes] = timeString.split(':').map(Number);
            return dayjs(originalDate)
                .set('hour', hours)
                .set('minute', minutes)
                .set('second', 0)
                .toDate();
        };

        const updatedStart = combineDateAndTime(item.date, startWorkEdit);
        const updatedEnd = combineDateAndTime(item.date, endWorkEdit);
        
        const workDay = {
            date: dayjs(item.date).format('YYYY-MM-DD'),
            startWork: hoursFormatService.formatForServer(updatedStart),
            endWork: hoursFormatService.formatForServer(updatedEnd),
            comment: commentEdit
        }

        
        apiService.EditWorkDay(workDay);
        onClose();
    }

    return (
        <div className="editItem-container">

            <div className="close">
                <button onClick={onClose}>
                    <img src="images/close-icon.png" alt="close-icon" />
                </button>
                <div>{dateFormatService.changeDateFormatToFriendlyFormatToEditComp(item.date)}</div>
            </div>
            
            <div className="editItem-form">
                <form className="editItem-form">
                    <div className="editItem-div">
                        <label>התחלה:</label>
                        <input type="time" name="" id="" value={startWorkEdit} onChange={(e) => {setStartWorkEdit(e.target.value)}} />
                    </div>
                    <div className="editItem-div">
                        <label>סיום:</label>
                        <input type="time" name="" id="" value={endWorkEdit} onChange={(e) => {setEndWorkEdit(e.target.value)}}/>
                    </div>
                    <div className="editItem-div">
                        <label>הערות</label>
                        <input type="text" name="" id="" value={commentEdit && commentEdit} onChange={(e) => {setCommentEdit(e.target.value)}}/>
                    </div>
                    <div className="editItem-btn-div">
                        <button onClick={handleSubmit}>
                            <img src="images/check-icon.png" alt="close-icon" />
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default EditItem;
