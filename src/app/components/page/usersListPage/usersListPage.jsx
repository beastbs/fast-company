/* eslint-disable indent */
/* eslint-disable multiline-ternary */

import React, { useState, useEffect } from "react";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/listGroup";
import UsersTable from "../../ui/usersTable";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
// import API from "../../../api";
import _ from "lodash";
import { useUser } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
  // const [professions, setProfessions] = useState();
  const { isLoading: professionsLoading, professions } = useProfession();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const pageSize = 4;

  const { users, handleDeleteUser, handleToggleBookmark } = useUser();
  const { currentUser } = useAuth();

  // useEffect(() => {
  //   API.professions.fetchAll().then((professions) => {
  //     setProfessions(professions);
  //   });
  // }, []);

  // const handleDeleteUser = (id) => {
  //   const newUsers = users.filter((user) => user._id !== id);
  //   console.log(newUsers);
  //   // setUsers(newUsers);
  // };

  // const handleToggleBookmark = (id) => {
  //   const newArray = users.map((user) => {
  //     if (user._id === id) {
  //       return { ...user, bookmark: !user.bookmark };
  //     }

  //     return user;
  //   });
  //   // setUsers(newArray)

  // };

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

  function filterUsers(data) {
    const filteredUsers = searchQuery
    ? data.filter(
        (user) =>
          user.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      )
    : selectedProf
    ? data.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
    : data;

    return filteredUsers.filter(user => user._id !== currentUser._id);
  }

  const filteredUsers = filterUsers(users);
  const count = filteredUsers.length;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const userCrop = paginate(sortedUsers, currentPage, pageSize);

  return (
      <div className="d-flex">
        {professions && !professionsLoading && (
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
        {
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
        }
      </div>
  );
};

export default UsersListPage;
