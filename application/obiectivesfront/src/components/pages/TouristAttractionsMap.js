import React from 'react';
import Obiectiv from './Obiectiv'; 
import SimpleAttractions from './SimpleAttractions'; 


export default function TouristAttractionsMap() {
    const containerStyle = {
        backgroundImage: `url("/travel5.jpeg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
    };

    const contentStyle = {
        marginTop: '30px', 
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        borderRadius: '10px',
    };

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <SimpleAttractions />
            </div>
        </div>
    );
}
