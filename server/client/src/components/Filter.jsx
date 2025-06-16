import React, {useState} from 'react';


const Filter = ({onFilter}) => {

    const [ startDate, setStartDate ] = useState(null);
    const [ endDate, setEndDate ] = useState(null);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (startDate && endDate) {
            onFilter(startDate, endDate);
        }
    };
    
    return (
        <div className='myBoard-filter-container'>
            <form className="filter-form" onSubmit={handleSubmit}>
                <div className="filter-div">
                    <label htmlFor="">מ:</label>
                    <input type="date" value={startDate} onChange={(e) => {setStartDate(e.target.value)}} />
                </div>
                <div className="filter-div">
                    <label htmlFor="">עד:</label>
                    <input type="date" value={endDate} onChange={(e) => {setEndDate(e.target.value)}}/>
                </div>
                <div className="filter-btn-div">
                    <button type='submit'>סינון</button>
                </div>
            </form>
        </div>
    )
}

export default Filter;
