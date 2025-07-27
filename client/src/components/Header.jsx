import React, {useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useAuthContext } from '../context/authContext';


const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [settingList, setSettingList] = useState(false);
    const isMyBoard = location.pathname === '/my-board';
    const { logout } = useAuthContext();

    // הסתרת Header בדף login
    if (location.pathname === '/login') return null;
    if (location.pathname === '/register') return null;


    return (
        <div className='header-container'>
            <button onClick={() => navigate(isMyBoard ? '/' : '/my-board')}>
                <img
                    src={isMyBoard ? "images/home-icon.png" : "images/details-icon.png"}
                    alt="nav-icon"
                />
            </button>

            <p>{moment().format('DD/MM/YYYY')}</p>

            <button onClick={() => setSettingList(!settingList)}>
                <img src="images/setting-icon.png" alt="settings" />
                {settingList && 
                    <div className='settings-list'>   
                        <list>
                            <li onClick={() => {logout(); navigate('/login')}}>התנתק</li>
                        </list>
                    </div>
                }
            </button>
        </div>
    );
};

export default Header;
