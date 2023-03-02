import React from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
  return (
    <div className="form-floating needs-validation w-50 mb-3">
      <input
        className="form-control"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label className="col-form-label" htmlFor={name}>
        {label}
      </label>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};
TextField.defaultProps = {
  type: "text"
};
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextField;
