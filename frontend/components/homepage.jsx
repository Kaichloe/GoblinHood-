// should hold nav and splash 
import Splash from '../splash/splash';
import Nav from '../splash/nav';
import React from 'react';
import Footer from '../splash/footer'

const Homepage = () => {
  return (
    <div className="home-container"> 
      <Nav/>
      <Splash/>
      <Footer/>
    </div>
  )
}

export default Homepage;