import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createTrip, getUserTrips } from './api';
import logo3 from './Images_Used/arrow.png';
import deleteImg from './Images_Used/delete.png';

function TripManagerPopup({ isOpen, onClose, userId }) {
    const [tripText, setTripText] = useState('');
    const [userTrips, setUserTrips] = useState([]);
    const API_BASE_URL = 'http://localhost:5000';

    useEffect(() => {
        const fetchUserTrips = async () => {
            if (userId) {
                try {
                    const trips = await getUserTrips(userId);
                    setUserTrips(trips);
                } 
                catch (error) {
                    console.error('Error fetching user trips:', error);
                    console.log('Error object fetching trips:', error);
                    alert(error.response?.data?.message || 'Error getting trips');
                }
            }
        };

        fetchUserTrips();
    }, [userId]);

    const handleCreateTrip = async () => {
        try {
            await createTrip(userId, tripText);
            alert('Trip created successfully');
            const updatedTrips = await getUserTrips(userId);
            setUserTrips(updatedTrips);
        } 
        catch (error) {
            console.error('Error creating trip:', error);
            console.log('Error object creating trip:', error);
            alert(error.response?.data?.message || 'Trip creation error');
        }
    };

    const handleDeleteTrip = async (tripId) => {
        try {
            await axios.delete(`${API_BASE_URL}/trips/${tripId}`);
            alert('Trip deleted successfully');
            const updatedTrips = await getUserTrips(userId);
            setUserTrips(updatedTrips);
        } 
        catch (error) {
            console.error('Error deleting trip:', error);
            alert(error.response?.data?.message || 'Error deleting trip');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;

        const getDayWithSuffix = (day) => {
            if (day >= 11 && day <= 13) {
                return `${day}th`;
            }
            switch (day % 10) {
                case 1:
                    return `${day}st`;
                case 2:
                    return `${day}nd`;
                case 3:
                    return `${day}rd`;
                default:
                    return `${day}th`;
            }
        };

        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

        return `${getDayWithSuffix(day)} ${month} ${year} (${hours}:${formattedMinutes}:${formattedSeconds} ${ampm})`;
    };

    if (!isOpen) return null;

    return (
        <div className="trip-manager-popup">
            <div className="trip-manager-popup-content">
                <span className="close-popup" onClick={onClose}>&times;</span>
                <h2>Trip Journals</h2>
                <div className='addJournal'>
                    <textarea
                        // type="text"
                        placeholder="Enter the text"
                        value={tripText}
                        onChange={(e) => setTripText(e.target.value)}
                    />
                    <button onClick={handleCreateTrip}> <img src={logo3} alt="" />Add Note</button>
                </div>
                <div className='notesContainer'>
                    <h3>Your Notes :</h3>
                    <ul>
                        {Array.isArray(userTrips) && userTrips.length > 0 ? (
                            userTrips.map((trip) => (
                                <li key={trip._id}>
                                    {trip.text} - {formatDate(trip.createdAt)}
                                    <button onClick={() => handleDeleteTrip(trip._id)}><img src={deleteImg} alt="" /></button>
                                </li>
                            ))
                        ) : (
                            <li>( Nothing here yet. )</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TripManagerPopup;