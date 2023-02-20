import React, { useState } from "react";
import PropTypes from "prop-types";
import User from "./user";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

const Users = ({ users, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const count = users.length;
  const pageSize = 4;
  const handlePageChange = (pageIndex) => {
    console.log("%cPage:", "color: green;", pageIndex);
    setCurrentPage(pageIndex);
  };

  const handlePageChangeByArrows = (number) => {
    setCurrentPage((prevState) => prevState + number);
  };

  const userCrop = paginate(users, currentPage, pageSize);

  return (
    <>
      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {userCrop.map((user) => (
              <User key={user._id} {...user} {...rest} />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onChangePage={handlePageChange}
        onChangePageByArrows={handlePageChangeByArrows}
      />
    </>
  );
};

Users.propTypes = {
  users: PropTypes.array
};

export default Users;
