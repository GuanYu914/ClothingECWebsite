import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { animated, useTransition } from "react-spring";
import { COLOR_PRIMARY1, COLOR_SECONDARY3, Z_INDEX_LV6 } from "../../constant";
import { ReactComponent as warningIcon } from "../../imgs/components/flash-modal/chat-dots-fill.svg";

const Container = styled(animated.div).attrs(() => ({
  className: "box-shadow-dark",
}))`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${Z_INDEX_LV6};
  background-color: ${COLOR_PRIMARY1};
  padding: 1.5rem;
  border-radius: 0.8rem;
`;
const ReminderIcon = styled(warningIcon)`
  color: ${COLOR_SECONDARY3};
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
`;

const ReminderMsg = styled.h2.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY3};
`;

interface FlashModalProps {
  showReminderFromProp: boolean;
  msg: string;
  handleSyncPropState: (value: boolean) => void;
}

export default function FlashModal({
  showReminderFromProp,
  msg,
  handleSyncPropState,
}: FlashModalProps) {
  const reminderAnimationDuration: number = 500;
  const [showReminder, setShowReminder] = useState(showReminderFromProp);
  const reminderAnimation = useTransition(showReminder, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: reminderAnimationDuration,
    },
  });

  // 同步 props 狀態
  useEffect(() => {
    setShowReminder(showReminderFromProp);
  }, [showReminderFromProp]);
  // 顯示動畫
  useEffect(() => {
    let isCancelled = false;
    if (showReminder) {
      // 過了 3 個動畫時間再消失
      setTimeout(() => {
        if (!isCancelled) {
          // 同步 props 狀態
          setShowReminder(false);
          handleSyncPropState(false);
        }
      }, reminderAnimationDuration * 3);
    }
    return () => {
      // 避免 umount phase 的時候改到 state
      isCancelled = true;
    };
    // eslint-disable-next-line
  }, [showReminder]);

  return reminderAnimation(
    (props, item) =>
      item && (
        <Container style={props}>
          <ReminderIcon />
          <ReminderMsg>{msg}</ReminderMsg>
        </Container>
      )
  );
}
