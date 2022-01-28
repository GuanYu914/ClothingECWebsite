import { useState } from "react";
import PropTypes from "prop-types";
import Loader from "../loader";
import Modal from "../modal";

export default function AsyncComponent({
  isLoading,
  modalInfoFromProps,
  isShowModal,
  handleSubmitOp,
  handleCancelOp,
  children,
}) {
  const [modalInfo] = useState(modalInfoFromProps);

  return isLoading ? (
    <>
      <Loader />
      {isShowModal && (
        <>
          <Modal
            modalInfo={modalInfo}
            handleSubmitOp={handleSubmitOp}
            handleCancelOp={handleCancelOp}
          />
        </>
      )}
    </>
  ) : (
    children
  );
}

/*
  props 參數
  isLoading         : boolean (required)
  modalInfoFromProps: {
    selectionMode: boolean,   (required)
    title   : string,         (required)
    content : string,         (required)
  },
  isShowModal   : boolean,    (required)
  handleSubmitOp: function,   (required)
  handleCancelOp: function,   (required)
  children      : any         (required)
*/

AsyncComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  modalInfoFromProps: PropTypes.shape({
    selectionMode: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  isShowModal: PropTypes.bool.isRequired,
  handleSubmitOp: PropTypes.func.isRequired,
  handleCancelOp: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};
