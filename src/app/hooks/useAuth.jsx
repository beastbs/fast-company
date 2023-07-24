import React, { useState, useEffect, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import axios from "axios";
import userService from "../services/user.service";
import localStorageService, {
  removeAuthData,
  setTokens
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";
import { createRandomImage } from "../utils/optimization";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY // Добавляем как параметр (?key)
  }
});

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function signUp({ email, password, ...rest }) {
    // const keyFireBasePrivate = "AIzaSyCqFbpWGxKI5Fc4CsI0BKyMhhMw73sWbc0";
    // const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${keyFireBasePrivate}`;
    try {
      const { data } = await httpAuth.post(`accounts:signUp`, {
        email,
        password,
        returnSecureToken: true
      });
      await createUser({
        name: "user one",
        _id: data.localId,
        email,
        image: createRandomImage(),
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        ...rest
      });
      setTokens(data);
      toast.success("Пользователь зарегистрирован", {
        position: toast.POSITION.TOP_CENTER
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const objectError = {
            email: "Пользователь с таким Email уже существует!"
          };
          throw objectError; // Expected error object - не можем просто передать throw {email: ""}
        }
      }
    }
  }

  async function signIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true
      });
      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        switch (message) {
        case "EMAIL_NOT_FOUND":
        case "INVALID_PASSWORD":
          throw new Error("Email или password введены не коректно");
        default:
          throw new Error("Слишком много попыток входа. Попробуйте позднее");
        }
      }
    }
  }

  function signOut() {
    setCurrentUser(null);
    removeAuthData();
    history.push("/");
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data.error;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  return (
    <AuthContext.Provider value={{ signUp, signIn, signOut, currentUser, isLoading }}>
      {!isLoading ? children : "Loading..."}{/* Добавляем блокирующую загрузку */}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;
