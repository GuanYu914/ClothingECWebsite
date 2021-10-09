import { BREAKPOINT_PAD } from "../../constant";
import styled from "styled-components";

export const CategoryBlock = styled.div`
  margin-top: 5rem;

  ${BREAKPOINT_PAD} {
    margin-top: 10rem;
  }
`;

export const CategoryTitle = styled.h1.attrs(() => ({
  className: "fs-h1",
}))`
  text-align: center;
`;

export const CategoriesContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  // 限制最大寬度為 90 * 16px = 1440px
  max-width: 90rem;
  // 水平置中
  margin-left: auto;
  margin-right: auto;
`;

export const Category = styled.div.attrs(() => ({
  className: "fs-h2 color-secondary3 bg-secondary1",
}))`
  width: fit-content;
  height: fit-content;
  width: 8rem;
  height: 5.6rem;
  margin: 0.4rem 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  cursor: pointer;

  // 當裝置大於等於 768 px，加大尺寸
  ${BREAKPOINT_PAD} {
    width: 9.2rem;
    height: 6.2rem;
  }
`;
