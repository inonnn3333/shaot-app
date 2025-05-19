import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className='header-container'>
            {location.pathname === '/my-board'
            ? 
            (<button onClick={() =>{navigate('/')}}>
                <img src="images/home-icon.png" alt="arrow-details-up" />
            </button>
            ):
            (<button onClick={() =>{navigate('/my-board')}}>
                <img src="images/details-icon.png" alt="arrow-details-up" />
            </button>
            )}

            <p>
                {new Date().toLocaleDateString('he-IL', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })}
            </p>

            <button>
                <img src="images/setting-icon.png" alt="arrow-details-up" />
            </button>
        </div>
    )
}

export default Header;