import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ id, bookmark, onToggleBookmark }) => {
  const isBookmark = bookmark ? "-fill" : "";

  return (
    <button className="border-0">
      <i
        className={`bi bi-bookmark-star${isBookmark}`}
        onClick={() => onToggleBookmark(id)}
      ></i>
    </button>
  );
};

Bookmark.propTypes = {
  id: PropTypes.string.isRequired,
  bookmark: PropTypes.bool.isRequired,
  onToggleBookmark: PropTypes.func.isRequired
};

export default Bookmark;
