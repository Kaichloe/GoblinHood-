import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {

  return (
    <div>
      <header>
        <Link className="nav_sign_up" to="/signup">Sign Up!</Link>
        <Link className="nav_sign_in" to="/login">Sign In!</Link>
      </header>
    </div>
  )
}

export default Nav;