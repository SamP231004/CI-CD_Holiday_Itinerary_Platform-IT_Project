import React, { useState } from 'react';
import { createTrip, getUserTrips } from './api';

function TripManager({ userId }) {
    const [tripText, setTripText] = useState('');

    const handleCreateTrip = async () => {
        try {
            await createTrip(userId, tripText);
            alert('Trip created successfully');
        } 
        catch (error) {
            alert(error.response?.data?.message || 'Trip creation error');
        }
    };

    const handleGetUserTrips = async () => {
        try {
            const trips = await getUserTrips(userId);
            console.log(trips);
            alert('Trips retrieved successfully. Check console');
        } 
        catch (error) {
            alert(error.response?.data?.message || 'Error getting trips');
        }
    };

    return (
        <div>
            <h2>Trip Management</h2>
            <input
                type="text"
                placeholder="Enter trip text"
                value={tripText}
                onChange={(e) => setTripText(e.target.value)}
            />
            <button onClick={handleCreateTrip}>Create Trip</button>
            <button onClick={handleGetUserTrips}>Get Trips</button>
        </div>
    );
}

export default TripManager;