import React, { useState } from 'react';
import { MenuItemsExplore } from './MenuItemsExplore';
import { Link } from 'react-router-dom';
import './DropdownEx.css';

function DropdownEx() {
    const [click, setClick]=useState(false)
    const handleClick = () => setClick(!click)
    return (
        <>
        <ul onClick={handleClick}
        className={click ? 'dropdownex-menu clicked' : 'dropdownex-menu'}>
            {MenuItemsExplore.map((item, index) => {
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
export default DropdownEx;