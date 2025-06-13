import React, { useState, useEffect, useRef } from 'react';
import { MenuItemsSign } from './MenuItemsSign';
import { Link } from 'react-router-dom';
import './DropdownSign.css';

function DropdownSign() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div onClick={toggleDropdown} className='nav-user-link'>
                <i className='fas fa-user-circle' />
                {/* Adaugă iconița de utilizator */}
            </div>
            <ul ref={dropdownRef} className={`dropdownsign-menu ${isOpen ? 'show' : ''}`}>
                {MenuItemsSign.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link
                                className={item.cName}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.title}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </>
    );
}

export default DropdownSign;
