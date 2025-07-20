import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // הסתרת Header בדף login
    if (location.pathname === '/login') return null;

    const isMyBoard = location.pathname === '/my-board';

    return (
        <div className='header-container'>
            <button onClick={() => navigate(isMyBoard ? '/' : '/my-board')}>
                <img
                    src={isMyBoard ? "images/home-icon.png" : "images/details-icon.png"}
                    alt="nav-icon"
                />
            </button>

            <p>{moment().format('DD/MM/YYYY')}</p>

            <button>
                <img src="images/setting-icon.png" alt="settings" />
            </button>
        </div>
    );
};

export default Header;
