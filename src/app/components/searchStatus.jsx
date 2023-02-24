import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const isEmpty = !length;
  const people = length;

  const renderPhrase = () => {
    if (isEmpty) {
      return "Никто не тусанет";
    }
    if (people > 4 && people < 22) {
      return `${people} человек тусанет`;
    }

    const lastOne = Number(people.toString().slice(-1));
    return [2, 3, 4].indexOf(lastOne) >= 0
      ? `${people} человека тусанут`
      : `${people} человек тусанет`;
  };

  return (
    <h2>
      <span className={`badge bg-${people ? "primary" : "danger"}`}>
        {renderPhrase() + " " + "с тобой сегодня"}
      </span>
    </h2>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number
};

export default SearchStatus;
