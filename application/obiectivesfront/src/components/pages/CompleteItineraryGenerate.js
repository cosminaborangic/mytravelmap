import React, { useState } from 'react';
import Obiectiv from './Obiectiv';
import Obiectiv2 from './Obiectiv2';
import ObiectivCuZile from './ObiectivCuZile';
import ObiectivCuZile2 from './ObiectivCuZile2';
import ObiectivCuZile3 from './ObiectivCuZile3';
import SimpleItinerary from './SimpleItinerary';
import Meals from './Meals';

export default function CompleteItineraryGenerate() {
    const [showObiectiv, setShowObiectiv] = useState(false);
    const [showAttractions, setShowAttractions] = useState(false);
    const [showMeals, setShowMeals] = useState(false);
    const [showMultipleDaysSimple, setShowMultipleDaysSimple] = useState(false);
    const [showMultipleDaysWithLunch, setShowMultipleDaysWithLunch] = useState(false);
    const [showMultipleDaysWithThreeMeals, setShowMultipleDaysWithThreeMeals] = useState(false);

    const handleObiectivButtonClick = () => {
        setShowObiectiv(true);
        setShowAttractions(false);
        setShowMeals(false);
        setShowMultipleDaysSimple(false);
        setShowMultipleDaysWithLunch(false);
        setShowMultipleDaysWithThreeMeals(false);
    };

    const handleAttractionsButtonClick = () => {
        setShowAttractions(true);
        setShowObiectiv(false);
        setShowMeals(false);
        setShowMultipleDaysSimple(false);
        setShowMultipleDaysWithLunch(false);
        setShowMultipleDaysWithThreeMeals(false);
    };

    const handleMealsButtonClick = () => {
        setShowMeals(true);
        setShowObiectiv(false);
        setShowAttractions(false);
        setShowMultipleDaysSimple(false);
        setShowMultipleDaysWithLunch(false);
        setShowMultipleDaysWithThreeMeals(false);
    };

    const handleMultipleDaysSimpleButtonClick = () => {
        setShowMultipleDaysSimple(true);
        setShowObiectiv(false);
        setShowAttractions(false);
        setShowMeals(false);
        setShowMultipleDaysWithLunch(false);
        setShowMultipleDaysWithThreeMeals(false);
    };

    const handleMultipleDaysWithLunchButtonClick = () => {
        setShowMultipleDaysWithLunch(true);
        setShowObiectiv(false);
        setShowAttractions(false);
        setShowMeals(false);
        setShowMultipleDaysSimple(false);
        setShowMultipleDaysWithThreeMeals(false);
    };

    const handleMultipleDaysWithThreeMealsButtonClick = () => {
        setShowMultipleDaysWithThreeMeals(true);
        setShowObiectiv(false);
        setShowAttractions(false);
        setShowMeals(false);
        setShowMultipleDaysSimple(false);
        setShowMultipleDaysWithLunch(false);
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

    const buttonContainerStyle = {
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
    };

    return (
        <div style={backgroundStyle}>
            <div style={overlayStyle}></div>
            <div style={contentStyle}>
                <p style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '30px', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Let's Generate an Itinerary
                </p>
                <div style={buttonContainerStyle}>
                    <p style={categoryTitleStyle}>One Day Itineraries</p>
                    <button
                        style={hoveredButton === 'obiectiv' ? buttonHoverStyle : buttonStyle}
                        onClick={handleObiectivButtonClick}
                        onMouseEnter={() => setHoveredButton('obiectiv')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        Itinerary with Lunch
                    </button>
                    <button
                        style={hoveredButton === 'attractions' ? buttonHoverStyle : buttonStyle}
                        onClick={handleAttractionsButtonClick}
                        onMouseEnter={() => setHoveredButton('attractions')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        Simple Itinerary
                    </button>
                    <button
                        style={hoveredButton === 'meals' ? buttonHoverStyle : buttonStyle}
                        onClick={handleMealsButtonClick}
                        onMouseEnter={() => setHoveredButton('meals')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        Itinerary with 3 Meals
                    </button>
                </div>
                <div style={buttonContainerStyle}>
                    <p style={categoryTitleStyle}>Multiple Days Itineraries</p>
                    <button
                        style={hoveredButton === 'multipleDaysSimple' ? buttonHoverStyle : buttonStyle}
                        onClick={handleMultipleDaysSimpleButtonClick}
                        onMouseEnter={() => setHoveredButton('multipleDaysSimple')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        Simple Itinerary for More Days
                    </button>
                    <button
                        style={hoveredButton === 'multipleDaysWithLunch' ? buttonHoverStyle : buttonStyle}
                        onClick={handleMultipleDaysWithLunchButtonClick}
                        onMouseEnter={() => setHoveredButton('multipleDaysWithLunch')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        Itinerary for More Days with Lunch
                    </button>
                    <button
                        style={hoveredButton === 'multipleDaysWithThreeMeals' ? buttonHoverStyle : buttonStyle}
                        onClick={handleMultipleDaysWithThreeMealsButtonClick}
                        onMouseEnter={() => setHoveredButton('multipleDaysWithThreeMeals')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        Itinerary for More Days with 3 Meals
                    </button>
                </div>
            </div>
            <div style={componentsContainerStyle}>
                {showObiectiv && <Obiectiv />}
                {showMeals && <Obiectiv2 />}
                {showAttractions && <SimpleItinerary />}
                {showMultipleDaysSimple && <ObiectivCuZile />}
                {showMultipleDaysWithLunch && <ObiectivCuZile2 />}
                {showMultipleDaysWithThreeMeals && <ObiectivCuZile3 />}
            </div>
        </div>
    );
}
