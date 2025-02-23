import logo from './Images_Used/logo.png';
import logo1 from './Images_Used/lang.png';
import logo2 from './Images_Used/contact.png';
import logo3 from './Images_Used/arrow.png';
import image1 from './Images_Used/card1.jpg';
import image2 from './Images_Used/card2.jpg';
import dest1 from './Images_Used/spring.jpg';
import dest2 from './Images_Used/street.jpg'; 
import dest3 from './Images_Used/snow.jpg';
import tour1 from './Images_Used/night.jpg'
import tour2 from './Images_Used/sunrise.jpg'
import tour3 from './Images_Used/colorful.jpg'
import gallery1 from './Images_Used/autumn.jpg'
import gallery2 from './Images_Used/boat.jpg'
import gallery3 from './Images_Used/boats.jpg'
import gallery4 from './Images_Used/desert.jpg'
import gallery5 from './Images_Used/water.jpg'
import gallery6 from './Images_Used/waterSide.jpg'

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_KEY);

import TripCustomizationPopup from './Itinerary/TripCustomizationPopup.jsx';
import { useState } from 'react';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [includeFlight, setIncludeFlight] = useState(false);
  const [transport, setTransport] = useState("none");
  const [hotelOption, setHotelOption] = useState("withoutFood");
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const handleBookNow = () => {
    if (isLoggedIn) {
      setShowPopup(true);
    } 
    else {
      alert('Please log in to proceed with booking.');
    }
  };

  const handlePayment = async (customizationOptions) => {
    const stripe = await stripePromise;
    const response = await fetch("http://localhost:5000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: customizationOptions.amount }),
    });

    const session = await response.json();
    window.location.href = session.url;
  };

  return (
    <>
      <div id="Home" className="homePage">
        <div className="navbar">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="tabs">
            <a href="#Home">Home</a>
            <a href="#Destination">Destination</a>
            <a href="#TopTours">Top Tours</a>
            <a href="#Gallery">Gallery</a> 
            <a href="#AboutUs">About Us</a>
          </div>
          <div className="extras">
            <button><img src={logo1} alt="" /> ENG</button>
            <button><img src={logo2} alt="" /> Contact Us</button>
            <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </div>
        </div>
        <div className="tagline">
          <div className="text">
            <h1>Pack your bags, let's go somewhere amazing</h1>
            <p>Hidden gems, breathtaking views, unforgettable adventures-where will you go next ?</p>
          </div>
          <div>
            <button>Book Now <img src={logo3} alt="" /></button>
          </div>
        </div>
      </div>
      <div id="AboutUs" className="AboutUs">
        <div className="special">
          <h1>What's so special about this ?</h1>
          <p>Save more on your trips with exclusive discounts, seasonal promotions and unbeatable deals for unforgettable adventures.</p>
          <button>Learn More <img src={logo3} alt="" /></button>
        </div>
        <div className="specialCards">
          <div className="card">
            <p>1</p>
            <img src={image1} alt="" />
            <p>We don't just plan vacations; we create journeys tailored to your dreams, ensuring every moment is unforgettable.</p>
          </div>
          <div className="card">
            <p>2</p>
            <img src={image2} alt="" />
            <p>With our trusted local partners, you'll discover hidden spots and cultural experiences that most travelers never get to see.</p>
          </div>
        </div>
      </div>
      <div id="Destination" className="Destination">
        <div className="favorite">
          <h1>Your next favorite place awaits</h1>
          <p>Get the best value for your trips with exclusive discounts, seasonal promotions, and deals to save while exploring the world! <button>See All <img src={logo3} alt="" /></button></p>
        </div>
        <div className="destinationCards">
          <div>
            <p>12 Destination</p>
            <img src={dest1} alt="" />
            <p>Japan</p>
          </div>
          <div>
            <p>15 Destination</p>
            <img src={dest2} alt="" />
            <p>Italy</p>
          </div>
          <div>
            <p>14 Destination</p>
            <img src={dest3} alt="" />
            <p>Amsterdam</p>
          </div>
        </div>
      </div>
      <div id='TopTours' className="TopTours">
        <div className="topTourClass">
          <h1>Top tours to spark your wanderlust</h1>
          <p>Explore our curated selection of must-visit destinations, complete with unbeatable prices, detailed itineraries, and unforgettable experiences. Your next adventure starts here!</p>
        </div>
        <div className="tourCards">
          <div><img src={tour1} alt="" />Rocky Mountain Adventure</div>
          <div className='tourCard2'>
            <img src={tour2} alt="" />
            <p>
              <span>Santori Sunset Escape</span>
              <span>4 Days / 3 Nights  </span>
            </p>
            <p>Visit historic landmarks like Kinkaku-ji and Fushimi Inari Shrine with an expert guide</p>
            <p>From Rs 11,000 <button onClick={handleBookNow}>Book Now</button></p>
          </div>
          <div><img src={tour3} alt="" />Kyoto Cultural Journey</div>
        </div>
        <TripCustomizationPopup
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            handlePayment={handlePayment}
            includeFlight={includeFlight}
            setIncludeFlight={setIncludeFlight}
            transport={transport}
            setTransport={setTransport}
            hotelOption={hotelOption}
            setHotelOption={setHotelOption}
            selectedPlaces={selectedPlaces}
            setSelectedPlaces={setSelectedPlaces}
        />
      </div>
      <div id='Gallery' className="gallery">
        <div className="galleryContainer">
        <div className="image-track">
          <img src={gallery1} alt="" />
          <img src={gallery2} alt="" />
          <img src={gallery3} alt="" />
          <img src={gallery4} alt="" />
          <img src={gallery5} alt="" />
          <img src={gallery6} alt="" />
          <img src={gallery1} alt="" />
          <img src={gallery2} alt="" />
          <img src={gallery3} alt="" />
          <img src={gallery4} alt="" />
          <img src={gallery5} alt="" />
          <img src={gallery6} alt="" />
        </div>
        </div>
      </div>
    </>
  )
}

export default App
