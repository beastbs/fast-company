import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = () => {
  const { currentUser } = useAuth();

  return (
    <nav className="navbar bg-light">
      <div className="container-fluid">
        <ul className="nav fs-3">
          <li className="nav-item">
            <Link to="/" className="nav-link" aria-current="page">
              Main
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {currentUser ? (
            <div role="button">
              <NavProfile />
            </div>
          ) : (
            <Link to="/login/signIn?" className="nav-link text-primary fs-3">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
