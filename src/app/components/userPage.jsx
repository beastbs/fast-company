import React, { useState, useEffect } from "react";
import Quality from "./quality";
import API from "../api";
import { useHistory, useParams } from "react-router-dom";

const UserPage = () => {
  const [user, setUser] = useState();
  const history = useHistory();
  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    API.users.getById(userId).then((user) => setUser(user));
  });
  const getAllUsers = () => {
    history.push("/users");
  };
  return (
    <>
      {user && (
        <>
          <h1>{user.name}</h1>
          <h2>Профессия: {user.profession.name}</h2>
          <div>
            {user.qualities.map((q) => (
              <Quality key={q._id} name={q.name} color={q.color} />
            ))}
          </div>
          <div>completedMeetings: {user.completedMeetings}</div>
          <h2>Rate: {user.rate}</h2>
          <button onClick={getAllUsers}>Все пользователи</button>
        </>
      )}
    </>
  );
};

export default UserPage;
