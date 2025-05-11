import React from 'react';
import useWorkDays from '../hooks/useWorkDays.js';
import dateFormatService from '../services/dateFormat.js';
import hoursFormatService from '../services/hoursFormat.js';
import { calculateWorkHours } from './calculate/calculateWorkHours.js';
import { calculateMoney, calculateWorkingHours } from './calculate/calculateMonthly.js';


const HtmlToPdf = () => {

    const { data } = useWorkDays();
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const cellStyle = {
        border: '1px solid #999',
        borderRadius: '4px',
        padding: '8px',
        textAlign: 'center',
        fontSize: '15px',
    };

    const formatNumber = (num) => {
        if (num >= 1000 && num < 10000) {
            return num.toLocaleString(); // מוסיף פסיק לאלפים
        }
        return num.toString(); // מחזיר כפי שהוא אם לא 4 ספרות
    }

    return (
        <div style={{ display: 'none' }}>
            <div id="pdf-content" dir="rtl" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>דו״ח שעות חודשיות</h2>

            <table style={{ width: '100%', borderCollapse: 'collapse', direction: 'rtl' }}>
                <thead>
                    <tr>
                        <th style={cellStyle}>תאריך</th>
                        <th style={cellStyle}>התחלה</th>
                        <th style={cellStyle}>סיום</th>
                        <th style={cellStyle}>סה"כ</th>
                        <th style={cellStyle}>הערות</th>
                    </tr>
                </thead>
                <tbody>
                {sortedData.map((item, i) => (
                    <tr key={i}>
                    <td style={cellStyle}>{dateFormatService.changeDateFormatToFriendlyFormat(item.date)}</td>
                    <td style={cellStyle}>{hoursFormatService.changeHourFormatToFriendlyFormat(item.startWork)}</td>
                    <td style={cellStyle}>{hoursFormatService.changeHourFormatToFriendlyFormat(item.endWork)}</td>
                    <td style={cellStyle}>{calculateWorkHours(item.startWork, item.endWork)}</td>
                    <td style={cellStyle}>{item.comment || "----"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <p>סה"כ שעות עבודה: {calculateWorkingHours(data)}</p>
            <p>אז זה יוצא {formatNumber(calculateMoney(data))} ש"ח</p>
        </div>
</div>

    )
}

export default HtmlToPdf;
