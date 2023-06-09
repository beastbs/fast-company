import React, { useState, useEffect, createContext, useContext } from "react";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";

const QualityContext = createContext();

export const useQuality = () => {
  return useContext(QualityContext);
};

const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getQuality = (id) => {
    return qualities.find(quality => quality._id === id);
  };

  const getQualitiesList = async () => {
    try {
      const { content } = await qualityService.fetchAll();
      setQualities(content);
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
    getQualitiesList();
  }, []);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return (
    <QualityContext.Provider value={{ qualities, isLoading, getQuality }}>
      {children}
    </QualityContext.Provider>
  );
};
QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default QualityProvider;
