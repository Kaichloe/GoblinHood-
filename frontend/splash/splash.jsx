import React from 'react';
import { Link } from 'react-router-dom';

const Splash = ()=> {

  return (
    <div className="splash-page-container">
      <div className="splash-left-layout"></div>
      <div className="splash-titles-container">
        <h1 className="splash-title">It's Time to Do Gold</h1>
        <h2 className="splash-subtitle">Goblinhood, a pioneer of muggle-free investing, gives you more ways to make your gold work harder.</h2>  
        <div><Link className="splash-signup" to="/signup">Sign Up</Link></div>
      </div>
      <div className="splash-right">
          <img src="https://cdn.robinhood.com/assets/robinhood/brand_2/0ac83d822d7f714396eebe65b54b2fa5-1x.png"/>
      </div>
    </div>
  )
}

export default Splash;
