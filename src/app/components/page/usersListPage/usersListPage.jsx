/* eslint-disable indent */
/* eslint-disable multiline-ternary */

import React, { useState, useEffect } from "react";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/listGroup";
import UsersTable from "../../ui/usersTable";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import API from "../../../api";
import _ from "lodash";

const UsersListPage = () => {
  const [users, setUsers] = useState();
  const [professions, setProfessions] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 4;

  useEffect(() => {
    Promise.all([API.users.fetchAll(), API.professions.fetchAll()]).then(
      ([users, professions]) => {
        setUsers(users);
        setProfessions(professions);
      }
    );
  }, []);

  const handleDeleteUser = (id) => {
    const newUsers = users.filter((user) => user._id !== id);
    setUsers(newUsers);
  };

  const handleToggleBookmark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }

        return user;
      })
    );
    console.log("%cid", "color:green;", id);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchQuery]);

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearchQuery = ({ target }) => {
    setSelectedProf(undefined);
    setSearchQuery(target.value);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);

    if (searchQuery !== "") {
      setSearchQuery("");
    }
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

  if (users) {
    const filteredUsers = searchQuery
      ? users.filter(
          (user) =>
            user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
        )
      : selectedProf
      ? users.filter(
          (user) =>
            JSON.stringify(user.profession) === JSON.stringify(selectedProf)
        )
      : users;

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
      <>
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
            <input
              type="text"
              name="searchQuery"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchQuery}
            />
            {count > 0 && (
              <UsersTable
                users={userCrop}
                onSort={handleSort}
                selectedSort={sortBy}
                onDelete={handleDeleteUser}
                onToggleBookmark={handleToggleBookmark}
              />
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onChangePage={handlePageChange}
            onChangePageByArrows={handlePageChangeByArrows}
          />
        </div>
      </>
    );
  }

  return <h3 className="ms-4">Loading...</h3>;
};

export default UsersListPage;
