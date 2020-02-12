import React from 'react';
import { Link } from 'react-router-dom';

const Splash = ()=> {

  return (
    <div>
      <header>
        <h1>It's Time to Do Money</h1>
        <h2>Goblinhood, a pioneer of commission-free investing, gives you more ways to make your money work harder.</h2>
        <div className="splash-signup-border"><Link className="splash-signup" to="/signup">Sign Up!</Link></div>
      </header>
    </div>
  )
}

export default Splash;
