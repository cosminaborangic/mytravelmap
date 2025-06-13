import React, { useState } from 'react';
import CountriesMap from './CountriesMap';
import ContinentsMap from './ContinentsMap';

export default function CountriesExplore() {
    const [showCountriesMap, setShowCountriesMap] = useState(false);
    const [showContinentsMap, setShowContinentsMap] = useState(false);

    const handleCountriesMapButtonClick = () => {
        setShowCountriesMap(true);
        setShowContinentsMap(false);
    };

    const handleContinentsMapButtonClick = () => {
        setShowCountriesMap(false);
        setShowContinentsMap(true);
    };

    const backgroundStyle = {
        backgroundImage: 'url("/travel5.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        padding: '20px',
        paddingTop: '100px',
        overflow: 'auto',
        position: 'relative',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 1,
    };

    const contentStyle = {
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
    };

    const headerStyle = {
        fontSize: '30px',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: 'white',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        backgroundColor: 'rgba(173, 216, 230, 0.7)', 
        padding: '10px 20px',
        borderRadius: '8px',
    };

    const buttonContainerStyle = {
        marginTop: '20px', 
        marginBottom: '40px',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    };

    const buttonStyle = {
        padding: '15px 30px',
        fontSize: '18px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: 'var(--primary)',
        color: 'white',
        cursor: 'pointer',
        margin: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s, background-color 0.3s',
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: 'var(--hover-color)',
        transform: 'scale(1.05)',
    };

    const [hoveredButton, setHoveredButton] = useState(null);

    const categoryTitleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'white',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        marginBottom: '20px',
        textTransform: 'uppercase',
    };

    const componentsContainerStyle = {
        position: 'relative',
        zIndex: 2,
        padding: '20px',
        marginTop: '20px',
    };

    return (
        <div style={backgroundStyle}>
            <div style={overlayStyle}></div>
            <div style={contentStyle}>
                <p style={headerStyle}>
                    Discover various country and continent maps by clicking the buttons below.
                </p>
                <div style={buttonContainerStyle}>
                    <button
                        style={hoveredButton === 'countriesMap' ? buttonHoverStyle : buttonStyle}
                        onClick={handleCountriesMapButtonClick}
                        onMouseEnter={() => setHoveredButton('countriesMap')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        Countries
                    </button>
                    <button
                        style={hoveredButton === 'continentsMap' ? buttonHoverStyle : buttonStyle}
                        onClick={handleContinentsMapButtonClick}
                        onMouseEnter={() => setHoveredButton('continentsMap')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        Continents 
                    </button>
                </div>
            </div>
            <div style={componentsContainerStyle}>
                {showCountriesMap && <CountriesMap />}
                {showContinentsMap && <ContinentsMap />}
            </div>
        </div>
    );
}
