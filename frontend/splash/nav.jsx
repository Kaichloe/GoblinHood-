import React from 'react';
import { Link } from 'react-router-dom';
import Homepage from '../components/homepage';

const Nav = () => {
  return (
    <div className="nav-border">
      <ul>
        <div className="nav-left">
          <li>
          GoblinHood
          </li>
        </div>
        <div className="nav-center">
          <li>
            <a href="https://www.linkedin.com/in/kaiyip-ho-216230191/">Linkedin</a>
          </li>
          <br/>
          <li>
            <a href="https://github.com/Kaichloe">Github</a>
          </li>
        </div>
      </ul>
      <ul>
        <div className="nav-right"> 
          <li>
            <Link className="nav-sign-up" to="/signup">Sign Up!</Link>
          </li>
          <li>
            <Link className="nav-sign-in" to="/login">Sign In!</Link>
          </li>
        </div>
      </ul>
    </div>
  )
}

export default Nav;