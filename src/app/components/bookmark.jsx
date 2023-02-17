import React from "react";

const Bookmark = ({ id, bookmark, onToggle }) => {
  const isBookmark = bookmark ? "-fill" : "";

  return (
    <i
      className={`bi bi-bookmark-star${isBookmark}`}
      onClick={() => onToggle(id)}
    ></i>
  );
};

export default Bookmark;
