import React, { useState } from "react";
import { cutLongString } from "../../utils/optimization";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const NavProfile = () => {
  const { currentUser } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{cutLongString(currentUser.name)}</div>
        <img
          src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
            .toString(36)
            .substring(7)}.svg`}
          alt="avatar"
          className="img-responsive rounded-circle"
          width="50"
          height="50"
        />
      </div>
      <div
        className={`w-100 dropdown-menu text-center ${isOpen ? "show" : ""}`}
      >
        <h5>{currentUser.name}</h5>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">Profile</Link>
        <Link to="logout" className="dropdown-item">Logout</Link>
      </div>
    </div>
  );
};

export default NavProfile;
