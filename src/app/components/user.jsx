import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import Bookmark from "./bookmark";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  bookmark,
  onDelete,
  onToggle
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((qual) => (
          <Quality key={qual._id} {...qual} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <button className="border-0">
          {<Bookmark bookmark={bookmark} id={_id} onToggle={onToggle} />}
        </button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

User.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  qualities: PropTypes.array,
  profession: PropTypes.object.isRequired,
  completedMeetings: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
  bookmark: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default User;
