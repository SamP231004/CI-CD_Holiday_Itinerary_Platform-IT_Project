import React, { useState, useEffect } from "react";
import "./TripCustomizationPopup.css";
import logo3 from '../Images_Used/arrow.png';

const TripCustomizationPopup = ({
    showPopup,
    setShowPopup,
    handlePayment,
    includeFlight,
    setIncludeFlight,
    transport,
    setTransport,
    hotelOption,
    setHotelOption,
}) => {
    const [amount, setAmount] = useState(0);
    const [selectedPlaces, setSelectedPlaces] = useState({
        beach: false,
        museum: false,
        historicalMonuments: false,
        themePark: false,
    });

    useEffect(() => {
        let calculatedAmount = 11000;

        if (includeFlight) {
            calculatedAmount += 5000;
        }

        if (transport === "bus") {
            calculatedAmount += 300;
        } else if (transport === "train") {
            calculatedAmount += 1250;
        } else if (transport === "privateCar") {
            calculatedAmount += 3500;
        }

        if (hotelOption === "withFood") {
            calculatedAmount += 2500;
        }

        let selectedCount = Object.values(selectedPlaces).filter(Boolean).length;
        calculatedAmount += selectedCount * 500;

        setAmount(calculatedAmount);
    }, [includeFlight, transport, hotelOption, selectedPlaces]);

    const handlePlaceChange = (place) => {
        setSelectedPlaces((prev) => ({
            ...prev,
            [place]: !prev[place],
        }));
    };

    return (
        showPopup && (
            <div className="popup">
                <div className="popup-content">
                    <h2>Customize Your Trip</h2>
                    <p>Choose your preferences for an unforgettable experience.</p>

                    <div>
                        <p>Include Flight</p>
                        <input
                            type="checkbox"
                            checked={includeFlight}
                            onChange={() => setIncludeFlight(!includeFlight)}
                        />
                    </div>

                    <div>
                        <p>Inter-City Transport:</p>
                        <select value={transport} onChange={(e) => setTransport(e.target.value)}>
                            <option value="none">None</option>
                            <option value="bus">Bus</option>
                            <option value="train">Train</option>
                            <option value="privateCar">Private Car</option>
                        </select>
                    </div>

                    <div>
                        <p>Hotel Options:</p>
                        <select value={hotelOption} onChange={(e) => setHotelOption(e.target.value)}>
                            <option value="withoutFood">Without Food</option>
                            <option value="withFood">With Food</option>
                        </select>
                    </div>

                    <div className="places">
                        <p>Nearby Places to Visit:</p>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedPlaces.beach}
                                onChange={() => handlePlaceChange("beach")}
                            />
                            Beach
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedPlaces.museum}
                                onChange={() => handlePlaceChange("museum")}
                            />
                            Museum
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedPlaces.historicalMonuments}
                                onChange={() => handlePlaceChange("historicalMonuments")}
                            />
                            Historical Monuments
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedPlaces.themePark}
                                onChange={() => handlePlaceChange("themePark")}
                            />
                            Theme Park
                        </label>
                    </div>

                    <p>Total Amount : Rs {amount}</p>

                    <button onClick={() => {
                        handlePayment({ amount });
                        console.log(typeof amount, amount);
                    }}>
                        <img src={logo3} alt="" />
                        Proceed to Payment
                    </button>
                    <button onClick={() => setShowPopup(false)}>Cancel</button>
                </div>
            </div>
        )
    );
};

export default TripCustomizationPopup;