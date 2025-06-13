import React from 'react';

export default function Home() {
    const homeStyle = {
        position: 'relative',
        backgroundImage: 'url(/home.jpeg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '3rem' 
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        zIndex: 1
    };

    const textStyle = {
        position: 'relative',
        zIndex: 2,
        color: 'white' 
    };

    return (
        <div style={homeStyle}>
            <div style={overlayStyle}></div>
            <h1 style={textStyle}>HOME</h1>
        </div>
    );
}
