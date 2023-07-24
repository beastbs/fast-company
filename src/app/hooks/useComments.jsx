import React, { useState, useEffect, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const CommentsContext = createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const { userId } = useParams();

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(false);
    }
  }, [error]);

  useEffect(() => {
    getComments();
  }, [userId]);

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
    // .indexOn: [...] - массив параметров по которым мы сможем индексировать(искать) наши компоненты
  }

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      userId: currentUser._id,
      created_at: Date.now()
    };

    try {
      const { content } = await commentService.createComment(comment);
      setComments((prevState) => prevState.concat(content));
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function removeComment(commentId) {
    try {
      const { content } = await commentService.removeComment(commentId);
      content ??
        setComments((prevState) =>
          prevState.filter((c) => c._id !== commentId)
        );
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  return (
    <CommentsContext.Provider
      value={{ isLoading, comments, createComment, removeComment }}
    >
      {!isLoading ? children : "Loading..."}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
