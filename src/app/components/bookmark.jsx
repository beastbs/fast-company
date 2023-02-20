import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ id, bookmark, onToggle }) => {
  const isBookmark = bookmark ? "-fill" : "";

  return (
    <i
      className={`bi bi-bookmark-star${isBookmark}`}
      onClick={() => onToggle(id)}></i>
  );
};

Bookmark.propTypes = {
  id: PropTypes.string.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default Bookmark;
