import styled from "styled-components";

export const UserCommentBlock = styled.div.attrs(() => ({
  className: "bg-secondary1, color-primary3",
}))`
  margin-top: 5rem;
`;

export const UserCommentTitle = styled.h2.attrs(() => ({
  className: "color-secondary2 mob-h2",
}))`
  text-align: center;
`;

export const UserCommentsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

export const UserComment = styled.div.attrs(() => ({
  className: "bg-secondary1 color-secondary3 mob-h3-mid",
}))`
  width: 18rem;
  height: 10rem;
  padding: 1.2rem;
  margin: 0 auto 4rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: relative;

  &:last-child {
    margin-bottom: 2rem;
  }
`;

export const UserAvatar = styled.div.attrs(() => ({
  className: "bg-secondary3",
}))`
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -2rem;
  z-index: 999;
`;
