import styled from "styled-components";
import { useTransition, animated } from "react-spring";
import { ReactComponent as closeIcon } from "../../imgs/components/modal/x-lg.svg";
import {
  BREAKPOINT_MOBILE,
  BREAKPOINT_PAD,
  Z_INDEX_LV5,
  Z_INDEX_LV6,
  BG_MASK,
  BG_SECONDARY3,
  COLOR_SECONDARY3,
  BG_PRIMARY1,
  COLOR_SECONDARY2,
} from "../../constant";
import { useState } from "react";
import { CTAPrimaryButton, CTASecondaryButton } from "../button";

const Container = styled.section``;

const MaskContainer = styled(animated.div)`
  background-color: ${BG_MASK};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${Z_INDEX_LV5};
`;

const ModalContainer = styled.div`
  background-color: ${BG_SECONDARY3};
  width: fit-content;
  position: fixed;
  top: 50%;
  left: 50%;
  border-radius: 1.4rem;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  z-index: ${Z_INDEX_LV6};

  ${BREAKPOINT_MOBILE} {
    width: 20rem;
  }

  ${BREAKPOINT_PAD} {
    width: 24rem;
  }
`;

const ModalHeader = styled.header`
  border-radius: 1.4rem 1.4rem 0 0;
  padding: 0.8rem;
  color: ${COLOR_SECONDARY3};
  background-color: ${BG_PRIMARY1};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h1.attrs(() => ({
  className: "fs-h2",
}))``;

const CloseButton = styled(closeIcon)`
  color: ${COLOR_SECONDARY3};
  width: 1.4rem;
  height: 1.4rem;
  cursor: pointer;
`;

const ModalBody = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY2};
  padding: 1.4rem 1.4rem;
  white-space: pre-wrap;
`;

const ModalButtons = styled.section`
  display: flex;
`;

interface ModalProps {
  modalInfo: {
    selectionMode: boolean;
    title: string;
    content: string;
  };
  handleSubmitOp: () => void;
  handleCancelOp: () => void;
}

export default function Modal({
  modalInfo,
  handleSubmitOp,
  handleCancelOp,
}: ModalProps) {
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
                        borderRadius={"0 0 0 1.4rem"}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubmitOp();
                        }}
                      >
                        確定
                      </CTAPrimaryButton>
                      <CTASecondaryButton
                        width={"50%"}
                        borderRadius={"0 0 1.4rem 0"}
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
                        borderRadius={"0 0 1.4rem 1.4rem"}
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
