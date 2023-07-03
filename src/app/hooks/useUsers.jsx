import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const handleDeleteUser = async (id) => {
    console.log("delete id", id);
    try {
      const { content } = await userService.delete(id);
      toast.info("User deleted");
      setUsers((prevState) => prevState.filter((user) => user._id !== id));
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const handleToggleBookmark = async (id) => {
    const newUsers = users.map((user) =>
      user._id === id ? { ...user, bookmark: !user.bookmark } : user
    );
    const toggleBookmarkUser = newUsers.find((user) => user._id === id);

    try {
      await userService.create(toggleBookmarkUser);
      setUsers(newUsers);
    } catch (error) {
      errorCatcher(error);
    }

    console.log("%cid", "background:green;", id);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const { content } = await userService.get();
      setUsers(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  };

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
    setLoading(false);
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <UserContext.Provider
      value={{ users, handleDeleteUser, handleToggleBookmark }}
    >
      {!isLoading ? children : "Loading..."}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default UserProvider;
