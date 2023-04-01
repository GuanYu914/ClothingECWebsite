import {
  BOX_SHADOW_DARK,
  BREAKPOINT_PAD,
  COLOR_SECONDARY2,
  COLOR_SECONDARY3,
} from "../../constant";
import styled from "styled-components/macro";

export const CategoryBlock = styled.section`
  margin-top: 5rem;

  ${BREAKPOINT_PAD} {
    margin-top: 10rem;
  }
`;

export const CategoryTitle = styled.h1.attrs(() => ({
  className: "fs-h1",
}))`
  color: ${COLOR_SECONDARY2};
  text-align: center;
`;

export const CategoriesContainer = styled.section`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Category = styled.section.attrs(() => ({
  className: "fs-h1",
}))<{ img: string }>`
  color: ${COLOR_SECONDARY3};
  background-image: url(${(props) => props.img});
  background-size: cover;
  width: 10rem;
  height: 7rem;
  margin: 0.4rem 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: ${BOX_SHADOW_DARK};

  // 當裝置大於等於 768 px，加大尺寸
  ${BREAKPOINT_PAD} {
    box-shadow: none;
    width: 14rem;
    height: 9.8rem;

    &:hover {
      box-shadow: ${BOX_SHADOW_DARK};
    }
  }
`;
