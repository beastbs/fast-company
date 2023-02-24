import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = ({
  itemsCount,
  pageSize,
  currentPage,
  onChangePage,
  onChangePageByArrows
}) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) {
    return null;
  }
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        <li className={currentPage <= 1 ? "page-item disabled" : "page-item"}>
          <button
            className="page-link"
            onClick={() => onChangePageByArrows(-1)}
          >
            &laquo;
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={"page_" + page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button className="page-link " onClick={() => onChangePage(page)}>
              {page}
            </button>
          </li>
        ))}
        <li
          className={
            currentPage >= pageCount ? "page-item disabled" : "page-item"
          }
        >
          <button className="page-link" onClick={() => onChangePageByArrows(1)}>
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangePageByArrows: PropTypes.func.isRequired
};

export default Pagination;
