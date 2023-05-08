import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, onRemove }) => {
  return comments.map((comment) => (
    <Comment key={comment._id} {...comment} onRemove={onRemove} />
  ));
};

CommentsList.propTypes = {
  onRemove: PropTypes.func,
  comments: PropTypes.array
};

export default CommentsList;
