// should hold nav and splash 
import Splash from '../splash/splash';
import Nav from '../splash/nav';
import React from 'react';

const Homepage = () => {
  return (
    <div> 
      <Nav/>
      <Splash/>
    </div>
  )
}

export default Homepage;