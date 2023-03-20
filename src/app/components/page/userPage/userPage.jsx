import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import API from "../../../api";
import Qualities from "../../ui/qualities/qualitiesList";

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const history = useHistory();

  useEffect(() => {
    API.users.getById(userId).then(setUser);
  }, []);

  const handleUpdateUser = () => {
    history.push(`${history.location.pathname}/edit`);
  };
  const handleGetAllUsers = () => {
    history.push("/users");
  };
  return (
    <>
      {user ? (
        <div className="d-inline-block">
          <h1>{user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          <Qualities qualities={user.qualities} />
          <p>completedMeetings: {user.completedMeetings}</p>
          <h2>Rate: {user.rate}</h2>
          <button className="btn btn-warning" onClick={handleUpdateUser}>
            Редактировать
          </button>
          <button className="btn btn-success ms-2" onClick={handleGetAllUsers}>
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
