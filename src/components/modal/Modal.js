import styled from "styled-components";
import PropTypes from "prop-types";
import { useTransition, animated } from "react-spring";
import { ReactComponent as closeIcon } from "../../imgs/components/modal/x-lg.svg";
import {
  BREAKPOINT_MOBILE,
  BREAKPOINT_PAD,
  Z_INDEX_LV5,
  Z_INDEX_LV6,
} from "../../constant";
import { useState } from "react";
import { CTAPrimaryButton, CTASecondaryButton } from "../button";

const Container = styled.div``;

const MaskContainer = styled(animated.div).attrs(() => ({
  className: "bg-mask",
}))`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${Z_INDEX_LV5};
`;

const ModalContainer = styled.div.attrs(() => ({
  className: "bg-secondary3",
}))`
  width: 18rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  z-index: ${Z_INDEX_LV6};

  ${BREAKPOINT_MOBILE} {
    width: 18rem;
  }

  ${BREAKPOINT_PAD} {
    width: 24rem;
  }
`;

const ModalHeader = styled.div.attrs(() => ({
  className: "bg-primary1 color-secondary3",
}))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`;

const ModalTitle = styled.h1.attrs(() => ({
  className: "fs-h2",
}))``;

const CloseButton = styled(closeIcon).attrs(() => ({
  className: "color-secondary3",
}))`
  width: 1.4rem;
  height: 1.4rem;
  cursor: pointer;
`;

const ModalBody = styled.h3.attrs(() => ({
  className: "fs-h3 color-secondary2",
}))`
  padding: 2rem 0.5rem;
`;

const ModalButtons = styled.div`
  display: flex;
`;

export default function Modal({ modalInfo, handleSubmitOp, handleCancelOp }) {
  const [showModalMsg, setShowModalMsg] = useState(true);
  const showModalMsgAnimation = useTransition(showModalMsg, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      mass: 1,
      tension: 280,
      friction: 60,
    },
  });
  return (
    <Container>
      {showModalMsgAnimation(
        (props, item) =>
          item && (
            <>
              <MaskContainer
                style={props}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancelOp();
                  setShowModalMsg(false);
                }}
              ></MaskContainer>
              <ModalContainer>
                <ModalHeader>
                  <ModalTitle>{modalInfo.title}</ModalTitle>
                  <CloseButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelOp();
                      setShowModalMsg(false);
                    }}
                  />
                </ModalHeader>
                <ModalBody>{modalInfo.content}</ModalBody>
                <ModalButtons>
                  {modalInfo.selectionMode ? (
                    <>
                      <CTAPrimaryButton
                        width={"50%"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubmitOp();
                        }}
                      >
                        確定
                      </CTAPrimaryButton>
                      <CTASecondaryButton
                        width={"50%"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelOp();
                          setShowModalMsg(false);
                        }}
                      >
                        我不要
                      </CTASecondaryButton>
                    </>
                  ) : (
                    <>
                      <CTAPrimaryButton
                        width={"100%"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubmitOp();
                          setShowModalMsg(false);
                        }}
                      >
                        我知道了
                      </CTAPrimaryButton>
                    </>
                  )}
                </ModalButtons>
              </ModalContainer>
            </>
          )
      )}
    </Container>
  );
}

/*  props 參數
    modalInfo: {
      selectionMode:  boolean (required) 啟用多個按鈕樣式
      title:          string  (required)
      content:        string  (required)
    },
    handleSubmitOp: function (required)
    handleCancelOp: function (required)
*/

Modal.propTypes = {
  modalInfo: PropTypes.shape({
    selectionMode: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  handleSubmitOp: PropTypes.func.isRequired,
  handleCancelOp: PropTypes.func.isRequired,
};
