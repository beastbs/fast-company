import React from "react";
import PropTypes from "prop-types";

const CloseModal = ({ message, onCloseModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">{message}</div>
      <div className="modal__buttons">
        <button onClick={onCloseModal}>Отмена</button>
        <button>Подтвердить</button>
      </div>
    </div>
  );
};

CloseModal.propTypes = {
  message: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func
};

export default CloseModal;
