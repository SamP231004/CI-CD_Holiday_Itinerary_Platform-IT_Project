import logo from './Images_Used/logo.png';
import image1 from './Images_Used/card1.jpg';
import image2 from './Images_Used/card2.jpg';

function App() {
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
            <a href="">Gallery</a>
            <a href="">Package</a> 
            <a href="#AboutUs">About Us</a>
          </div>
          <div className="extras">
            <button>ENG</button>
            <button>Contact Us</button>
          </div>
        </div>
        <div className="tagline">
          <div className="text">
            <h1>Pack your bags, let's go somewhere amazing</h1>
            <p>Hidden gems, breathtaking views, unforgettable adventures-where will you go next ?</p>
          </div>
          <div>
            <button>Book Now</button>
          </div>
        </div>
      </div>
      <div id="AboutUs" className="AboutUs">
        <div className="special">
          <h1>What's so special about this ?</h1>
          <p>Save more on your trips with exclusive discounts, seasonal promotions and unbeatable deals for unforgettable adventures.</p>
          <button>Learn More</button>
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
      <div id="Destination" className="Destination"></div>
    </>
  )
}

export default App
