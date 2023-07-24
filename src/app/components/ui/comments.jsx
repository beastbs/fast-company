import React from "react";
// import { useParams } from "react-router-dom";
// import API from "../../api";
import { orderBy } from "lodash";

import CommentsList, { AddCommentForm } from "../common/comments";
import Divider from "../common/divider";

import { useComments } from "../../hooks/useComments";

const Comments = () => {
  // const { userId } = useParams();
  // const [comments, setComments] = useState();
  const { comments, createComment, removeComment } = useComments();

  // useEffect(() => {
  //   API.comments.fetchCommentsForUser(userId).then(setComments);
  // }, []);

  const handleSubmit = (data) => {
    createComment(data);

    // API.comments
    //   .add({ ...data, pageId: userId })
    //   .then((data) => setComments([...comments, data]));
  };

  const handleRemoveComment = (id) => {
    removeComment(id);
  };
  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <Divider />
            <CommentsList
              comments={sortedComments}
              onRemove={handleRemoveComment}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
