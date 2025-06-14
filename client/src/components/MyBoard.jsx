import React, { useState } from 'react';
import { calculateMoney, calculateWorkingHours } from './calculate/calculateMonthly.js';
import { calculateWorkHours } from './calculate/calculateWorkHours.js';
import EditItem from './EditItem.jsx';
import useWorkDays from '../hooks/useWorkDays.js';
import hoursFormatService from '../services/hoursFormat.js';
import dateFormatService from '../services/dateFormat.js';
import Loader from '../loaders/Loader.jsx';
import Filter from './Filter.jsx';
import NewItem from './NewItem.jsx';
import HtmlToPdf from './HtmlToPdf.jsx';
import html2pdf from 'html2pdf.js';


const MyBoard = () => {
    const { data, loading, handleFilterRange } = useWorkDays();
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    const [ editingItem, setEditingItem ] = useState(null);
    const [ showNewDayForm ,setShowNewDayForm ] = useState(null)
    const [ filterOpen, setFilterOpen ] = useState(null);

    const formatNumber = (num) => {
        if (num >= 1000 && num < 10000) {
            return num.toLocaleString(); // מוסיף פסיק לאלפים
        }
        return num.toString(); // מחזיר כפי שהוא אם לא 4 ספרות
    }

    const handleDownloadPDF = () => {
        const element = document.getElementById('pdf-content');
        console.log(element);
        
        if (!element) {
            console.error("לא נמצא אלמנט עם id='pdf-content'");
            return;
        }
        // element.style.display = 'block';
        // element.style.position = 'static';

        html2pdf().from(element)
        .set({
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
                <div className='myBoard-header-newDay'>
                    <button onClick={() => setShowNewDayForm(true)}>יום חדש</button>
                </div>
                <div className='myBoard-header-details'>
                    <h2>{formatNumber(calculateMoney(data))} &#8362;</h2>
                    <h4>{calculateWorkingHours(data)} שעות</h4>
                </div>
            </div>

            <div className='myBoard-work-details-container'>


                    <div onClick={() => setFilterOpen(!filterOpen)} className='myBoard-filter-btn'>
                        <img src="images/filter-icon.png" alt="filter-icon" />
                    </div>
                {filterOpen && (<Filter onFilter={handleFilterRange} />)}  
                
                {!data.length && <p>⚠ אין עדיין נתונים</p>}

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
            </div>
            
            {editingItem && <EditItem item={editingItem} onClose={() => setEditingItem(null)} />}
            {showNewDayForm && <NewItem onClose={() => setShowNewDayForm(false)} />}


            <div className='download-btn'>
                <button onClick={() => {handleDownloadPDF()}}>
                    <img src="images/pdf-icon.png" alt="pdf-icon" />
                </button>
            </div>


            <HtmlToPdf dataFromMyBoardComponent={data}/>
        </div>
    )
}

export default MyBoard;
