import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  const isEmpty = !length;
  const peopleQuantity = length;

  const renderPhrase = () => {
    if (isEmpty) {
      return "Никто не тусанет";
    }
    if (peopleQuantity > 4 && peopleQuantity < 22) {
      return `${peopleQuantity} человек тусанет`;
    }

    const lastOne = Number(peopleQuantity.toString().slice(-1));
    return [2, 3, 4].indexOf(lastOne) >= 0 ? `${peopleQuantity} человека тусанут` : `${peopleQuantity} человек тусанет`;
  };

  return (
    <h2>
      <span className={`badge bg-${peopleQuantity ? "primary" : "danger"}`}>
        {renderPhrase() + " " + "с тобой сегодня"}
      </span>
    </h2>
  );
};

SearchStatus.propTypes = {
  length: PropTypes.number
};

export default SearchStatus;
