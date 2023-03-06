import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="nav fs-3">
      <li className="nav-item">
        <Link to="/" className="nav-link" aria-current="page">
          Main
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/users" className="nav-link">
          Users
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
