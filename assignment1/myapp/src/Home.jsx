import React from 'react';
import './home.css';


const Home = () => {
  return (
    <div className="home">
      <h1 className="animated-title">Home Page</h1>
      <p className="animated-text">Welcome to the most creative home page!</p>
      <div className="call-to-action">
        <h2>Join Us Today!</h2>
        <button className="cta-button">Get Started</button>
      </div>
    </div>
  );
};

export default Home;
