import React, { useState } from 'react';
import { calculateMoney, calculateWorkingHours } from './calculate/calculateMonthly.js';
import { calculateWorkHours } from './calculate/calculateWorkHours.js';
import EditItem from './EditItem.jsx';
import useWorkDays from '../hooks/useWorkDays.js';
import hoursFormatService from '../services/hoursFormat.js';
import dateFormatService from '../services/dateFormat.js';
import Loader from '../loaders/Loader.jsx';
import HtmlToPdf from './HtmlToPdf.jsx';
import html2pdf from 'html2pdf.js';

const MyBoard = () => {
    const { data, loading } = useWorkDays();
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    const [ editingItem, setEditingItem ] = useState(null);
    const [ filterOpen, setFilterOpen ] = useState(null);
    const [ startDate, setStartDate ] = useState(null);
    const [ endDate, setEndDate ] = useState(null);
    const [ moreOptionsBtn, setMoreOptionsBtn ] = useState(true);

    const formatNumber = (num) => {
        if (num >= 1000 && num < 10000) {
            return num.toLocaleString(); // מוסיף פסיק לאלפים
        }
        return num.toString(); // מחזיר כפי שהוא אם לא 4 ספרות
    }

    const handleDownloadPDF = () => {
        const element = document.getElementById('pdf-content');
        
        if (!element) {
            console.error("לא נמצא אלמנט עם id='pdf-content'");
            return;
        }

        html2pdf().from(element)
        .set({
            margin: 1,
            filename: 'דו״ח_שעות.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
        }).save();
    };

    if (loading) return (<div className='myBoard-container'><Loader /></div>);
    // if (error) return <p>❌ שגיאה בטעינת הנתונים: {error}</p>;
    // if (!data.length) return <p>⚠ אין נתונים זמינים</p>;

    return (
        <div className='myBoard-container'>
            <div className='myBoard-header'>
                <div className='myBoard-header-details'>
                    <h3>{calculateWorkingHours(data)} שעות</h3>
                    <h3>{formatNumber(calculateMoney(data))} ש"ח</h3>
                    <button onClick={() => setFilterOpen(!filterOpen)}>
                        <img src="images/filter-icon.png" alt="filter-icon" />
                    </button>
                </div>
            

            {filterOpen && (
                <div className='myBoard-filter-container'>
                    <form className="filter-form">
                    <div className="filter-div">
                        <label htmlFor="">מ:</label>
                        <input type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value)}} />
                    </div>
                    <div className="filter-div">
                        <label htmlFor="">עד:</label>
                        <input type="date" value={endDate} onChange={(e) => {setEndDate(e.target.value)}}/>
                    </div>
                    <div className="filter-btn-div">
                        <button>סינון</button>
                    </div>
                </form>
                </div>
            )}
            </div>
            <HtmlToPdf/>

            {sortedData.map((d, i)=> (
                <div className='myBoard-work-details' key={i} onClick={() => setEditingItem(d)} >
                    <div className='myBoard-work-details-date'>{dateFormatService.changeDateFormatToFriendlyFormat(d.date)}</div>
                    <div className='myBoard-work-details-content'>
                        <div className='myBoard-work-details-inner'>
                            <div>
                                <p>{hoursFormatService.changeHourFormatToFriendlyFormat(d.startWork)}</p>
                                <p>{hoursFormatService.changeHourFormatToFriendlyFormat(d.endWork)}</p>
                            </div>
                            <div>{calculateWorkHours(d.startWork, d.endWork)}</div>
                            
                        </div>
                        {d.comment && <hr style={{border: "solid, 1px, #3c3c3c60", width: "100%"}}/>}

                        {d.comment && 
                            <div >
                                <p>{d.comment}</p>
                            </div>
                        }
                    </div>
                </div>
            ))}


            <div className='more-options-btn-container' onClick={() => setMoreOptionsBtn(true)}>
                {moreOptionsBtn &&
                    <div>
                        <select name="" id="">
                            <option value="">היי
                                <button onClick={handleDownloadPDF}>
                                    <img style={{width: "1em"}} src="images/pdf-icon.png" alt="pdf-icon" />
                                </button>
                            </option>
                            <option value="1">
                                <button>
                                    <img style={{width: "1em"}} src="images/new-icon.png" alt="newDay-icon" />
                                </button>
                            </option>
                        </select>
                    </div>
                }
            </div>


            {editingItem && <EditItem item={editingItem} onClose={() => setEditingItem(null)} />}
        </div>
    )
}

export default MyBoard;
