import { useState, useEffect } from "react";

import qualities from "../mock/qualities.json";
import professions from "../mock/professions.json";
import users from "../mock/users.json";
import httpService from "../services/http.service";

const useMockData = () => {
  const statusConsts = {
    idle: "Not started",
    pending: "In process",
    successed: "Ready",
    error: "Error occured"
  };
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(statusConsts.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summary = qualities.length + professions.length + users.length;

  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };

  const updateProgress = () => {
    const newProgress = Math.floor((count / summary) * 100);

    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending);
    }
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusConsts.successed);
    }
  };

  useEffect(() => {
    updateProgress();
  }, [count]);

  async function initialize() {
    try {
      for (const quality of qualities) {
        await httpService.put("qualities/" + quality._id, quality);
        incrementCount();
      }
      for (const prof of professions) {
        await httpService.put("professions/" + prof._id, prof);
        incrementCount();
      }
      for (const user of users) {
        await httpService.put("users/" + user._id, user);
        incrementCount();
      }
    } catch (error) {
      setError(error);
      setStatus(statusConsts.error);
    }
  }

  return { initialize, status, progress, error };
};

export default useMockData;
