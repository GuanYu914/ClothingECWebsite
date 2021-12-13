import styled from "styled-components";
import {
  BG_PRIMARY1,
  BG_SECONDARY1,
  BG_SECONDARY3,
  BREAKPOINT_PAD,
  BR_PRIMARY1,
  BR_SECONDARY1,
  COLOR_PRIMARY1,
  COLOR_SECONDARY1,
  COLOR_SECONDARY3,
} from "../../constant";

// 一般樣式使用
const DefaultButton = styled.div.attrs(() => ({
  className: "fs-h2",
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8.6rem;
  height: 3.2rem;
  cursor: pointer;

  ${BREAKPOINT_PAD} {
    width: 10.6rem;
    height: 3.6rem;
  }
`;

export const CTAPrimaryButton = styled(DefaultButton)`
  color: ${COLOR_SECONDARY3};
  background-color: ${BG_PRIMARY1};
  border-radius: ${(props) => props.isRounded && "1.4rem"};
  border-radius: ${(props) => props.borderRadius};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin || "0"};
`;

export const CTASecondaryButton = styled(DefaultButton)`
  color: ${COLOR_SECONDARY3};
  background-color: ${BG_SECONDARY1};
  border-radius: ${(props) => props.isRounded && "1.4rem"};
  border-radius: ${(props) => props.borderRadius};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin || "0"};
`;

export const GhostPrimaryButton = styled(DefaultButton)`
  color: ${COLOR_PRIMARY1};
  border-color: ${BR_PRIMARY1};
  background-color: ${BG_SECONDARY3};
  border-radius: ${(props) => props.isRounded && "1.4rem"};
  border-radius: ${(props) => props.borderRadius};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin || "0"};
  border-style: solid;
  // border-width: 0.4rem;
  // 根據 border props 設置 border-width
  border-width: ${(props) => props.border || "0.2rem"};
`;

export const GhostSecondaryButton = styled(DefaultButton)`
  color: ${COLOR_SECONDARY1};
  border-color: ${BR_SECONDARY1};
  background-color: ${BG_SECONDARY3};
  border-radius: ${(props) => props.isRounded && "1.4rem"};
  border-radius: ${(props) => props.borderRadius};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin || "0"};
  border-style: solid;
  border-width: ${(props) => props.border || "0.2rem"};
`;

// 給 styled-product-picker 使用
const DefaultPickerButton = styled.div.attrs(() => ({
  className: "fs-h2",
}))`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  cursor: pointer;
`;

export const PickerCTAPrimaryButton = styled(DefaultPickerButton)`
  color: ${COLOR_SECONDARY3};
  background-color: ${BG_PRIMARY1};
`;

export const PickerCTASecondaryButton = styled(DefaultPickerButton)`
  color: ${COLOR_SECONDARY3};
  background-color: ${BG_SECONDARY1};
`;

export const PickerGhostPrimaryButton = styled(DefaultPickerButton)`
  color: ${COLOR_PRIMARY1};
  border-color: ${BR_PRIMARY1};
  background-color: ${BG_SECONDARY3};
  border-style: solid;
  border-width: 0.4rem;
`;

export const PickerGhostSecondaryButton = styled(DefaultPickerButton)`
  color: ${COLOR_SECONDARY1};
  border-color: ${BR_SECONDARY1};
  background-color: ${BG_SECONDARY3};
  border-style: solid;
  border-width: 0.4rem;
`;
