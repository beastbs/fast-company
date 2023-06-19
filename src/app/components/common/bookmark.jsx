import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ id, bookmark = false, onToggleBookmark }) => {
  const isBookmark = bookmark ? "-fill" : "";

  return (
    <i
      className={`bi bi-bookmark-star${isBookmark}`}
      onClick={() => onToggleBookmark(id)}
      role="button"
    ></i>
  );
};

Bookmark.propTypes = {
  id: PropTypes.string.isRequired,
  bookmark: PropTypes.bool,
  onToggleBookmark: PropTypes.func.isRequired
};

export default Bookmark;
