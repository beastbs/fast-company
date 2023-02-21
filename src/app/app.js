import React, { useEffect, useState } from "react";
import Users from "./components/users";
import API from "./api";

const App = () => {
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();

  useEffect(() => {
    Promise.all([API.users.fetchAll(), API.professions.fetchAll()]).then(
      (response) => {
        const [users, professions] = response;
        setUsers(users);
        setProfessions(professions);
      }
    );
  }, []);

  const handleDeleteUser = (id) => {
    const newUsers = users.filter((user) => user._id !== id);
    setUsers(newUsers);
  };

  const handleToggleBookmark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }

        return user;
      })
    );
    console.log("%cid", "color:green;", id);
  };

  return (
    <div>
      {users && (
        <Users
          users={users}
          professions={professions}
          onDelete={handleDeleteUser}
          onToggle={handleToggleBookmark}
        />
      )}
    </div>
  );
};

export default App;
