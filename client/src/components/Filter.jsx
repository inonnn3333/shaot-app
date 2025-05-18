import React, {useState} from 'react'

const Filter = () => {

    const [ startDate, setStartDate ] = useState(null);
    const [ endDate, setEndDate ] = useState(null);
    
    return (
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
    )
}

export default Filter;
