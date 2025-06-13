import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

export function Button({ userName }) {
    return (
        <Link to='sign-up'>
            <button className='btn'>
                {userName}
            </button>
        </Link>
    );
}
