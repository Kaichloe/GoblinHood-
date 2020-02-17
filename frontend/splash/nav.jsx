import React from 'react';
import { Link } from 'react-router-dom';


const Nav = () => {
  return (
    <div className="nav-border">
      <ul>
        <div className="nav-left">
          <li className="app-name">
          GoblinHood
          </li>
        </div>
      </ul>
      <ul>
        <div className="nav-center"> 
        </div>
      </ul>
      <ul>
        <div className="nav-right"> 
          <li>
            <Link className="nav-sign-in" to="/login">Sign In</Link>
          </li>
          <li>
            <Link className="nav-sign-up" to="/signup">Sign Up</Link>
          </li>
        </div>
      </ul>
    </div>
  )
}

export default Nav;