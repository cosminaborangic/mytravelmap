import React from 'react';

export default function Explore() {
    const exploreStyle = {
        position: 'relative',
        backgroundImage: 'url(/exploree.jpeg)', 
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
        <div style={exploreStyle}>
            <div style={overlayStyle}></div>
            <h1 style={textStyle}>EXPLORE</h1>
        </div>
    );
}
