import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  async function signUp({ email, password }) {
    const API_KEY = "AIzaSyCqFbpWGxKI5Fc4CsI0BKyMhhMw73sWbc0";
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    const { data } = await axios.post(URL, {
      email,
      password,
      returnSecureToken: true
    });
    console.log("data", data);
  }
  return <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;
