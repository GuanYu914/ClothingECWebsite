import {
  Z_INDEX_LV1,
  BREAKPOINT_LAPTOP,
  BREAKPOINT_PAD,
  COLOR_SECONDARY2,
  BG_SECONDARY3,
  BOX_SHADOW_DARK,
} from "../../constant";
import styled from "styled-components";

export const UserCommentBlock = styled.div`
  margin-top: 5rem;

  ${BREAKPOINT_PAD} {
    margin-top: 10rem;
  }
`;

export const UserCommentTitle = styled.h2.attrs(() => ({
  className: "fs-h1",
}))`
  color: ${COLOR_SECONDARY2};
  text-align: center;
`;

export const UserCommentsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

export const UserComment = styled.div.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY2};
  background-color: ${BG_SECONDARY3};
  box-shadow: ${BOX_SHADOW_DARK};
  width: 18rem;
  height: 10rem;
  padding: 1.2rem;
  margin: 0 auto 4rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;

  &:last-child {
    margin-bottom: 2rem;
  }

  ${BREAKPOINT_LAPTOP} {
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const UserAvatar = styled.div.attrs(() => ({
  className: "bg-secondary3 box-shadow-light",
}))`
  border-radius: 50%;
  width: 4.2rem;
  height: 4.2rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -2rem;
  z-index: ${Z_INDEX_LV1};
  background-image: url(${(props) => props.url});
  background-size: cover;
`;
