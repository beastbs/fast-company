import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SearchStatus from "./searchStatus";
import User from "./user";
import Pagination from "./pagination";
import GroupList from "./listGroup";
import { paginate } from "../utils/paginate";

const Users = ({ users, professions, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const pageSize = 2;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    console.log("%cPage:", "color: green;", pageIndex);
    setCurrentPage(pageIndex);
  };

  const handlePageChangeByArrows = (number) => {
    setCurrentPage((prevState) => prevState + number);
  };

  const clearFilter = () => {
    setSelectedProf(undefined);
  };

  const filteredUsers = selectedProf
    ? users.filter((user) =>
      JSON.stringify(user.profession) === JSON.stringify(selectedProf))
    : users;

  const count = filteredUsers.length;
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          {
            <GroupList
              items={professions}
              selectedItem={selectedProf}
              onItemSelect={handleProfessionSelect}
            />
          }

          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus length={count} />
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
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onChangePage={handlePageChange}
            onChangePageByArrows={handlePageChangeByArrows}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array,
  professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Users;
