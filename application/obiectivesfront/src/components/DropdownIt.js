import React, { useState } from 'react';
import { MenuItemsItinerary } from './MenuItemsItinerary';
import { Link } from 'react-router-dom';
import './DropdownIt.css';

function DropdownIt() {
    const [click, setClick]=useState(false)
    const handleClick = () => setClick(!click)
    return (
        <>
        <ul onClick={handleClick}
        className={click ? 'dropdownit-menu clicked' : 'dropdownit-menu'}>
            {MenuItemsItinerary.map((item, index) => {
                return(
                    <li key={index}>
                        <Link 
                        className={item.cName} 
                        to={item.path} 
                        onClick={() => setClick(false)}
                        >
                            {item.title}
                        </Link>
                    </li>
                )
            })}
        </ul>
        </>
    )
}
export default DropdownIt;