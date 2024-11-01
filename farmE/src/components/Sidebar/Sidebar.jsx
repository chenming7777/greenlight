import React, { useState } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);

    return (
        <div className={`sidebar ${extended ? 'extended' : ''}`}>
            <div className="top">
                <img 
                    onClick={() => setExtended(prev => !prev)} 
                    className='menu' 
                    src={assets.menu_icon} 
                    alt="menu icon" 
                />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="plus icon" />
                    {extended && <p>New Chat</p>}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        <div className="recent-entry">
                            <img src={assets.message_icon} alt="message icon" />
                            <p>What is react? It is some good dododoododo dodood ddoo</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="bottom-item">
                    <img src={assets.question_icon} alt="question icon" />
                    {extended && <p>Help</p>}
                </div>
                <div className="bottom-item">
                    <img src={assets.history_icon} alt="history icon" />
                    {extended && <p>Activity</p>}
                </div>
                <div className="bottom-item">
                    <img src={assets.setting_icon} alt="setting icon" />
                    {extended && <p>Setting</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
