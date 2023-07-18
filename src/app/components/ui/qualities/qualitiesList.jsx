import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
  const { isLoading } = useQuality();

  if (isLoading) return "Loading...";

  return (
    <>
      {qualities ? qualities.map((qual) => (
        <Quality key={qual} id={qual} />
      )) : <span className="m-1 badge bg-secondary">Недоступно</span>}
    </>
  );
};

QualitiesList.propTypes = {
  qualities: PropTypes.array.isRequired
};

export default QualitiesList;
