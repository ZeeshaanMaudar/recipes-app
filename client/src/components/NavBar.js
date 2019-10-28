import React from 'react';
import { NavLink } from 'react-router-dom';

const callNavBarUnAuth = () => (
  <ul>
    <li>
      <NavLink to="/" exact>Home</NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink to="/signin">Signin</NavLink>
    </li>
    <li>
      <NavLink to="/signup">Signup</NavLink>
    </li>
  </ul>
);

const callNavBarAuth = () => (
  <ul>
    <li>
      <NavLink to="/" exact>Home</NavLink>
    </li>
    <li>
      <NavLink to="/search">Search</NavLink>
    </li>
    <li>
      <NavLink to="/recipe/add">Add Recipe</NavLink>
    </li>
    <li>
      <NavLink to="/profile">Profile</NavLink>
    </li>
    <li>
      <button>Signout</button>
    </li>
  </ul>
);

const callNavBar = session => {
  if(session && session.getCurrentUser) {
    return callNavBarAuth();
  }
  
  return callNavBarUnAuth();
}

const NavBar = ({ session }) => (
  <nav>
    {callNavBar(session)}
  </nav>
);

export default NavBar;
