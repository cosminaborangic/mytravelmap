import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Dropdown from './Dropdown';
import DropdownEx from './DropdownEx';
import DropdownIt from './DropdownIt';
import DropdownSign from './DropdownSign';

function Navbar({ userName }) {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [dropdown2, setDropdown2] = useState(false);
    const [dropdown3, setDropdown3] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const onMouseEnter = (setDropdownFn) => {
        if (window.innerWidth >= 960) {
            setDropdownFn(true);
        }
    };

    const onMouseLeave = (setDropdownFn) => {
        if (window.innerWidth >= 960) {
            setDropdownFn(false);
        }
    };

    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    <i className='fas fa-road' />{' '} MAP OF TRAVELLING
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item' onMouseEnter={() => onMouseEnter(setDropdown2)} onMouseLeave={() => onMouseLeave(setDropdown2)}>
                        <Link to='/explore' className='nav-links' onClick={closeMobileMenu}>
                            Explore <i className='fas fa-caret-down' />
                        </Link>
                        {dropdown2 && <DropdownEx />}
                    </li>
                    <li className='nav-item' onMouseEnter={() => onMouseEnter(setDropdown)} onMouseLeave={() => onMouseLeave(setDropdown)}>
                        <Link to='/maps' className='nav-links' onClick={closeMobileMenu}>
                            Maps <i className='fas fa-caret-down' />
                        </Link>
                        {dropdown && <Dropdown />}
                    </li>
                    <li className='nav-item' onMouseEnter={() => onMouseEnter(setDropdown3)} onMouseLeave={() => onMouseLeave(setDropdown3)}>
                        <Link to='/itinerary' className='nav-links' onClick={closeMobileMenu}>
                            Itinerary <i className='fas fa-caret-down' />
                        </Link>
                        {dropdown3 && <DropdownIt />}
                    </li>
                    <li className='nav-item'>
                        <Link to='/contact-us' className='nav-links' onClick={closeMobileMenu}>
                            Contact Us
                        </Link>
                    </li>
                    <li className='nav-item nav-user'>
                        {!click && <DropdownSign />}
                    </li>
                    {click && (
                        <li className='nav-item'>
                            <Link to='/sign-out' className='nav-links-mobile' onClick={closeMobileMenu}>
                                SIGN OUT
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
