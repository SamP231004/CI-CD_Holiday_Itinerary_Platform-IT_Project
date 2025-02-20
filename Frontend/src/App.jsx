import logo from './Images_Used/logo.png';

function App() {
  return (
    <>
      <div className="homePage">
        <div className="navbar">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="tabs">
            <a href="">Home</a>
            <a href="">Destination</a>
            <a href="">Gallery</a>
            <a href="">Package</a> 
            <a href="">About Us</a>
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
    </>
  )
}

export default App
