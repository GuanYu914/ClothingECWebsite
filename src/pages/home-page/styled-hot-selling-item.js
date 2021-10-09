import styled from "styled-components";
import { BREAKPOINT_PAD } from "../../constant";

export const HotSellingItemBlock = styled.div`
  margin-top: 5rem;

  ${BREAKPOINT_PAD} {
    margin-top: 10rem;
  }
`;

export const HotSellingItemTitle = styled.h1.attrs(() => ({
  className: "fs-h1",
}))`
  text-align: center;
`;

export const HotSellingItemsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  // 限制最大寬度為 90 * 16px = 1440px
  max-width: 90rem;
  // 水平置中
  margin-left: auto;
  margin-right: auto;
`;

export const HotSellingItem = styled.div.attrs(() => ({
  className: "bg-secondary1",
}))`
  width: 18rem;
  height: 14rem;
  margin: 0 auto;
  border-radius: 1.2rem;
  position: relative;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  margin-bottom: 2rem;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  ${BREAKPOINT_PAD} {
    box-shadow: none;

    &:hover {
      box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
  }
`;

export const HotSellingItemInfo = styled.div.attrs(() => ({
  className: "bg-secondary3",
}))`
  width: 100%;
  height: 4rem;
  position: absolute;
  bottom: 0;
  z-index: 1;
  padding: 0.4rem;
  border-radius: 0 0 1rem 1rem;
`;

export const HotSellingItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const HotSellingItemName = styled.h3.attrs(() => ({
  className: "fs-h3",
}))``;

export const HotSellingItemPrice = styled.h3.attrs(() => ({
  className: "fs-h3",
}))``;
