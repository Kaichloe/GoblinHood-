import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <ul>
        <li>
          GoblinHood
        </li>
        <li>
          <a href="https://www.linkedin.com/in/kaiyip-ho-216230191/">Linkedin</a>
        </li>
        <li>
          <a href="https://github.com/Kaichloe">Github</a>
        </li>
        <li>
          <Link className="nav-sign-up" to="/signup">Sign Up!</Link>
        </li>
        <li>
          <Link className="nav-sign-in" to="/login">Sign In!</Link>
        </li>
      </ul>
  
    </div>
  )
}

export default Nav;