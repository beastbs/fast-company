import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import API from "./api";

const App = () => {
  const [users, setUsers] = useState(API.users.fetchAll());

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
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDeleteUser}
        onToggle={handleToggleBookmark}
      />
    </div>
  );
};

export default App;
