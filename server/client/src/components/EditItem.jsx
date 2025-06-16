import React, {useState} from "react";
import apiService from "../services/apiService.js";
import hoursFormatService from '../services/hoursFormat.js';
import dateFormatService from '../services/dateFormat.js';
import moment from "moment";

const EditItem = ({ item, onClose }) => {

    const [ startWorkEdit, setStartWorkEdit ] = useState(hoursFormatService.changeHourFormatToFriendlyFormat(item.startWork));
    const [ endWorkEdit, setEndWorkEdit ] = useState(hoursFormatService.changeHourFormatToFriendlyFormat(item.endWork));
    const [ commentEdit, setCommentEdit ] = useState(item.comment);


    const handleSubmit = (e) => {
        e.preventDefault();
        
        const workDay = {
            date: moment(item.date).format('YYYY-MM-DD'),
            startWork: hoursFormatService.changeHourFormatToFullFormat(startWorkEdit),
            endWork: hoursFormatService.changeHourFormatToFullFormat(endWorkEdit),
            comment: commentEdit
        }

        console.log(workDay);
        
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
                        <label htmlFor="">התחלה:</label>
                        <input type="time" name="" id="" value={startWorkEdit} onChange={(e) => {setStartWorkEdit(e.target.value)}} />
                    </div>
                    <div className="editItem-div">
                        <label htmlFor="">סיום:</label>
                        <input type="time" name="" id="" value={endWorkEdit} onChange={(e) => {setEndWorkEdit(e.target.value)}}/>
                    </div>
                    <div className="editItem-div">
                        <label htmlFor="">הערות</label>
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
