import React from "react";
import Loader from "../loader";
import Modal from "../modal";

interface AsyncComponentProps {
  isLoading: boolean;
  modalInfoFromProps: {
    selectionMode: boolean;
    title: string;
    content: string;
  };
  isShowModal: boolean;
  handleSubmitOp: () => void;
  handleCancelOp: () => void;
  children: React.ReactChild;
}

export default function AsyncComponent({
  isLoading,
  isShowModal,
  modalInfoFromProps,
  handleSubmitOp,
  handleCancelOp,
  children,
}: AsyncComponentProps) {
  return (
    <>
      {isLoading ? <Loader marginTop="0" /> : children};
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
