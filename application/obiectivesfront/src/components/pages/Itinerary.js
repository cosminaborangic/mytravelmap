import React from 'react';

export default function Itinerary() {
    const itineraryStyle = {
        position: 'relative',
        backgroundImage: 'url(/itin.jpeg)', // Înlocuiește cu calea către imaginea ta
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // Înălțime pe întreg ecranul
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '3rem' // Dimensiunea textului
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Suprapunere semi-transparentă albă
        zIndex: 1
    };

    const textStyle = {
        position: 'relative',
        zIndex: 2,
        color: 'white' // Face textul alb
    };

    return (
        <div style={itineraryStyle}>
            <div style={overlayStyle}></div>
            <h1 style={textStyle}>ITINERARY</h1>
        </div>
    );
}
