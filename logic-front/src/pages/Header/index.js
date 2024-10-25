import { Link, useNavigate } from 'react-router-dom';
import "./header.css";
import React, { useState, useEffect } from 'react';

function Header() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('logado');
        
    };


    return (
        <header>
            <Link className="logo" to="/">Logic Solutions</Link>
            
            {user && user.usuario && (
                <div className="user-menu">
                    <span onClick={toggleDropdown} className="username">
                        {user.usuario}
                    </span>

                    {dropdownVisible && (
                        <div className="dropdown">
                            <button onClick={handleLogout} className="logout-button">
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;