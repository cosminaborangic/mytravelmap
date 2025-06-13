import React from 'react';
import Restaurants from './Restaurants';

export default function RestaurantsFromACity() {
    const contentStyle = {
        marginTop: '100px', 
    };

    return (
        <div style={contentStyle}>
            <Restaurants />
        </div>
    );
}
