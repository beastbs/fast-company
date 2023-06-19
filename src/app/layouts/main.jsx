import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
  const { initialize, status, progress, error } = useMockData();

  const handleClick = () => {
    initialize();
  };

  return (
    <div className="container mt-5">
      <h1>Main page</h1>
      <h3>Инициализация данных в Firebase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button
        disabled={status === "In process" || progress === 100}
        className="btn btn-primary"
        onClick={handleClick}
      >
        {status === "Ready" ? "Инициализированно" : "Инициализировать"}
      </button>
    </div>
  );
};

export default Main;
