import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import API from "../api";
import QualitiesList from "./qualitiesList";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    API.users.getById(userId).then(setUser);
  });

  const handleClick = () => {
    history.push("/users");
  };
  return (
    <>
      {user ? (
        <div>
          <h1>{user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          <QualitiesList qualities={user.qualities} />
          <p>completedMeetings: {user.completedMeetings}</p>
          <h2>Rate: {user.rate}</h2>
          <button className="btn btn-warning" onClick={handleClick}>
            Все пользователи
          </button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
