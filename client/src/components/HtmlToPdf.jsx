import React from 'react';
import useWorkDays from '../hooks/useWorkDays.js';
import dateFormatService from '../services/dateFormat.js';
import hoursFormatService from '../services/hoursFormat.js';
import { calculateWorkHours } from './calculate/calculateWorkHours.js';
import { calculateMoney, calculateWorkingHours } from './calculate/calculateMonthly.js';


const HtmlToPdf = () => {

    const { data } = useWorkDays();
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    // const cellStyle = {
    //     border: '1px solid #999',
    //     borderRadius: '4px',
    //     padding: '8px',
    //     textAlign: 'center',
    //     fontSize: '15px',
    // };

    const formatNumber = (num) => {
        if (num >= 1000 && num < 10000) {
            return num.toLocaleString(); // מוסיף פסיק לאלפים
        }
        return num.toString(); // מחזיר כפי שהוא אם לא 4 ספרות
    }

    return (
        <div id='pdf-content' className='htmlToPdf-container'>
            <div className="pdf-content">
                <div className="pdf-content-inner">
                    <h2 style={{ textAlign: 'center' }}>דו״ח שעות עבודה</h2>

                    <table style={{ width: '100%', borderCollapse: 'collapse', direction: 'rtl' }}>
                        <thead>
                            <tr>
                                <th>תאריך</th>
                                <th>התחלה</th>
                                <th>סיום</th>
                                <th>סה"כ</th>
                                <th>הערות</th>
                            </tr>
                        </thead>
                        <tbody>
                        {sortedData.map((item, i) => (
                            <tr key={i}>
                            <td>{dateFormatService.changeDateFormatToFriendlyFormat(item.date)}</td>
                            <td>{hoursFormatService.changeHourFormatToFriendlyFormat(item.startWork)}</td>
                            <td>{hoursFormatService.changeHourFormatToFriendlyFormat(item.endWork)}</td>
                            <td>{calculateWorkHours(item.startWork, item.endWork)}</td>
                            <td>{item.comment || "----"}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className='pdf-summary'>
                    <p>סה"כ   
                        <span>
                            {calculateWorkingHours(data)}
                        </span>
                        שעות עבודה 
                    </p>

                    <p>תשלום:  
                        <span>
                            {formatNumber(calculateMoney(data))}
                        </span>
                    ש"ח</p>
                </div>
            </div>
        </div>
    )
}

export default HtmlToPdf;
