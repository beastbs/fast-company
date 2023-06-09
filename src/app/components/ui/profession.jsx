import React from "react";
import PropTypes from "prop-types";
import { useProfession } from "../../hooks/useProfession";

const Profession = ({ id }) => {
  const { getProfession, isLoading } = useProfession();
  const profession = getProfession(id);

  return !isLoading ? <p>{profession.name}</p> : "Loading...";
};

Profession.propTypes = {
  id: PropTypes.string
};

export default Profession;
