import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ data, selectedSort, columns, onSort, children }) => {
  return (
    <table className="table">
      {children || (
        <>
          <TableHeader {...{ onSort, selectedSort, columns }} />
          <TableBody {...{ data, columns }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  selectedSort: PropTypes.object,
  columns: PropTypes.object,
  onSort: PropTypes.func,
  children: PropTypes.array
};

export default Table;
