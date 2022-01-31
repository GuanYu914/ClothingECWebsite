import PropTypes from "prop-types";
import Loader from "../loader";
import Modal from "../modal";

export default function AsyncComponent({
  isLoading,
  isShowModal,
  modalInfoFromProps,
  handleSubmitOp,
  handleCancelOp,
  children,
}) {
  return (
    <>
      {isLoading ? <Loader /> : children};
      {isShowModal && (
        <>
          <Modal
            modalInfo={modalInfoFromProps}
            handleSubmitOp={handleSubmitOp}
            handleCancelOp={handleCancelOp}
          />
        </>
      )}
    </>
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
