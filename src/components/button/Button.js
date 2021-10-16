import styled from "styled-components";
import { BREAKPOINT_PAD } from "../../constant";

const CTAPrimaryStyle = "color-secondary3 bg-primary1";
const CTASecondaryStyle = "color-secondary3 bg-secondary1";
const GhostPrimaryStyle =
  "color-primary1 br-primary1 bg-secondary3 none-pointer";
const GhostSecondaryStyle =
  "color-secondary1 br-secondary1 bg-secondary3 none-pointer";

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

export const CTAPrimaryButton = styled(DefaultButton).attrs(() => ({
  className: CTAPrimaryStyle,
}))`
  border-radius: ${(props) => props.isRounded && "1.4rem"};
  margin: ${(props) => props.margin || "0"};
`;

export const CTASecondaryButton = styled(DefaultButton).attrs(() => ({
  className: CTASecondaryStyle,
}))`
  border-radius: ${(props) => props.isRounded && "1.4rem"};
  margin: ${(props) => props.margin || "0"};
`;

export const GhostPrimaryButton = styled(DefaultButton).attrs(() => ({
  className: GhostPrimaryStyle,
}))`
  border-radius: ${(props) => props.isRounded && "1.4rem"};
  margin: ${(props) => props.margin || "0"};
  border-style: solid;
  border-width: 0.4rem;
`;

export const GhostSecondaryButton = styled(DefaultButton).attrs(() => ({
  className: GhostSecondaryStyle,
}))`
  border-radius: ${(props) => props.isRounded && "1.4rem"};
  margin: ${(props) => props.margin || "0"};
  border-style: solid;
  border-width: 0.4rem;
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

export const PickerCTAPrimaryButton = styled(DefaultPickerButton).attrs(() => ({
  className: CTAPrimaryStyle,
}))``;

export const PickerCTASecondaryButton = styled(DefaultPickerButton).attrs(
  () => ({
    className: CTASecondaryStyle,
  })
)``;

export const PickerGhostPrimaryButton = styled(DefaultPickerButton).attrs(
  () => ({
    className: GhostPrimaryStyle,
  })
)`
  border-style: solid;
  border-width: 0.4rem;
`;

export const PickerGhostSecondaryButton = styled(DefaultPickerButton).attrs(
  () => ({
    className: GhostSecondaryStyle,
  })
)`
  border-style: solid;
  border-width: 0.4rem;
`;
