import React from "react";
import PropTypes from "prop-types";
// import API from "../../../api";

import { displayDate } from "../../../utils/displayDate";
import { useUser } from "../../../hooks/useUsers";
import { useAuth } from "../../../hooks/useAuth";

const Comment = ({
  content,
  edited_at: edited,
  created_at: created,
  _id: id,
  userId,
  onRemove
}) => {
  const { getUserById } = useUser();
  const { currentUser } = useAuth();
  const user = getUserById(userId);

  // const [user, setUser] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   API.users.getById(userId).then((data) => {
  //     setUser(data);
  //     setIsLoading(false);
  //   });
  // }, []);

  // Блакирование - удаление или добавление
  // "$cid":{ - новая переменная
  //   ".write": "auth != null && ((data.child('userId').val() === auth.uid) || (data.child('userId').val() === auth.uid) || (newData.child('userId').val() === auth.uid))"
  // } - data - данные из сервера - newData - новые жанные
  // (data) - таким образом понимаем что пользователь к-ый отправил запрос(на удаление) - является тем кто его создал(но не можем добавить новый коммент) || (newData) - можем добавить новый коммент

  return (
    <div className="bg-light card-body mb-3 position-relative">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <img
              src={user.image}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <p className="w-100 d-flex justify-content-between mb-2">
                {user && user.name}
                <span className="small me-4">
                  {displayDate(edited || created)}
                </span>
              </p>

              <p className="small mb-0">{content}</p>
              {currentUser._id === userId && (
                <button
                  className="position-absolute top-0 end-0 p-0 btn btn-sm text-primary d-flex lh-1"
                  onClick={() => onRemove(id)}
                >
                  <i className="bi bi-x fs-2"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  content: PropTypes.string,
  edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  userId: PropTypes.string,
  onRemove: PropTypes.func,
  _id: PropTypes.string
};

export default Comment;
