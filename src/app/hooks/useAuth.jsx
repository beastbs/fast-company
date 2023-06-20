import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";

const httpAuth = axios.create({});

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const TOKENS = {
  TOKEN_KEY: "jwt_token",
  REFRESH_KEY: "jwt_refresh-token",
  EXPIRES_KEY: "jwt_expires"
};

const AuthProvider = ({ children }) => {
  function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKENS.TOKEN_KEY, idToken);
    localStorage.setItem(TOKENS.REFRESH_KEY, refreshToken);
    localStorage.setItem(TOKENS.EXPIRES_KEY, expiresDate);
  }
  async function signUp({ email, password }) {
    const API_KEY = "AIzaSyCqFbpWGxKI5Fc4CsI0BKyMhhMw73sWbc0";
    const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    try {
      const { data } = await httpAuth.post(URL, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      console.log("data", data);
    } catch (error) {
      const { message } = error.response.data.error;
      toast.error(message);
    }
  }
  return (
    <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;
