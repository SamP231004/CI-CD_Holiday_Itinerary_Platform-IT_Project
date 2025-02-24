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
    const [budget, setBudget] = useState(10000);
    const [tripType, setTripType] = useState("non-professional");
    const [resortType, setResortType] = useState("3-star");
    const [amount, setAmount] = useState(0);
    const [selectedPlaces, setSelectedPlaces] = useState({
        beach: false,
        museum: false,
        historicalMonuments: false,
        themePark: false,
    });
    const [page, setPage] = useState(0);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        let calculatedAmount = budget;

        if (tripType === "professional") {
            calculatedAmount += 2000;
        }

        if (resortType === "deluxe") {
            calculatedAmount += 1000;
        } else if (resortType === "luxurious") {
            calculatedAmount += 5000;
        }

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
    }, [budget, tripType, resortType, includeFlight, transport, hotelOption, selectedPlaces]);

    const handlePlaceChange = (place) => {
        setSelectedPlaces((prev) => ({
            ...prev,
            [place]: !prev[place],
        }));
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePreviousPage = () => {
        setPage(page - 1);
    };

    const handleBudgetChange = (e) => {
        const value = parseInt(e.target.value);
        const roundedValue = Math.round(value / 100) * 100;
        setBudget(roundedValue);
    };

    const handleTripTypeChange = (e) => {
        setTripType(e.target.value);
        if (e.target.value === "professional") {
            setBudget(prevBudget => prevBudget + 2000);
        } else {
            setBudget(prevBudget => prevBudget - 2000);
        }
    };

    const handleResortTypeChange = (e) => {
        const newValue = e.target.value;
        if (newValue === "deluxe") {
            setBudget(prevBudget => prevBudget + (resortType === "luxurious" ? -4000 : resortType === "3-star" ? 1000 : 0));
        } else if (newValue === "luxurious") {
            setBudget(prevBudget => prevBudget + (resortType === "deluxe" ? 4000 : resortType === "3-star" ? 5000 : 0));
        } else {
            setBudget(prevBudget => prevBudget + (resortType === "deluxe" ? -1000 : resortType === "luxurious" ? -5000 : 0));
        }
        setResortType(newValue);
    };

    return (
        showPopup && (
            <div className="popup">
                <div>
                    {page === 0 && (
                        <div className="popup-content">
                            <h2>Enter Your Details</h2>
                            <div>
                                <p>Name:</p>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <p>Email:</p>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <p>Travel Start Date:</p>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </div>
                            <div>
                                <p>Travel End Date:</p>
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                            <button onClick={handleNextPage}>Next</button>
                        </div>
                    )}

                    {page === 1 && (
                        <div className="popup-content">
                            <h2>Trip Preferences</h2>
                            <div>
                                <p className="budget">Budget: <span>Rs {budget}</span></p>
                                <input
                                    type="range"
                                    min="5000"
                                    max="50000"
                                    step="250"
                                    value={budget}
                                    onChange={handleBudgetChange}
                                />
                            </div>

                            <div>
                                <p>Trip Type:</p>
                                <select value={tripType} onChange={handleTripTypeChange}>
                                    <option value="non-professional">Non-Professional</option>
                                    <option value="professional">Professional</option>
                                </select>
                            </div>

                            <div>
                                <p>Resort Type:</p>
                                <select value={resortType} onChange={handleResortTypeChange}>
                                    <option value="3-star">3-Star</option>
                                    <option value="deluxe">Deluxe</option>
                                    <option value="luxurious">Luxurious (7-Star)</option>
                                </select>
                            </div>
                            <div>
                                <button onClick={handlePreviousPage}>Previous</button>
                                <button onClick={handleNextPage}>Next</button>
                            </div>
                        </div>
                    )}

                    {page === 2 && (
                        <div className="popup-content">
                            <h2>Customize Your Trip</h2>
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
                            <div>
                                <button onClick={handlePreviousPage}>Previous</button>
                                <button className="cancelBtn" onClick={() => setShowPopup(false)}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    );
};

export default TripCustomizationPopup;