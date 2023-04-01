import {
  Z_INDEX_LV1,
  BREAKPOINT_LAPTOP,
  BREAKPOINT_PAD,
  COLOR_SECONDARY2,
  BG_SECONDARY3,
  BOX_SHADOW_DARK,
  COMMENT_AVATAR_LAZY_LOADING_TAG,
  COMMENT_AVATAR_LAZY_LOADING_CONFIG,
} from "../../constant";
import styled from "styled-components/macro";
import { useEffect } from "react";

export const UserCommentBlock = styled.section`
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

const UserCommentsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

const UserCommentContent = styled.section.attrs(() => ({
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

const UserAvatar = styled.div.attrs(() => ({
  className: `bg-secondary3 box-shadow-light ${COMMENT_AVATAR_LAZY_LOADING_TAG}`,
}))`
  border-radius: 50%;
  width: 4.2rem;
  height: 4.2rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -2rem;
  z-index: ${Z_INDEX_LV1};
  background-size: cover;
`;

// 將帶有 COMMENT_AVATAR_LAZY_LOADING_TAG 的 DOM elements 掛上 IntersectionObserver
const initLazyLoading = function (): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // 預設行為，如果出現在 view port 裡面，則從 data-src 欄位載入圖片
        if (entry.isIntersecting) {
          const element = entry.target as HTMLDivElement;
          element.style.backgroundImage = `url(${
            element.dataset.src as string
          })`;
          observer.unobserve(element);
        }
      });
    },
    {
      root: COMMENT_AVATAR_LAZY_LOADING_CONFIG.root,
      rootMargin: COMMENT_AVATAR_LAZY_LOADING_CONFIG.rootMargin,
      threshold: COMMENT_AVATAR_LAZY_LOADING_CONFIG.threshold,
    }
  );

  const observedTargets = document.querySelectorAll(
    `.${COMMENT_AVATAR_LAZY_LOADING_TAG}`
  );
  // 如果沒有任何 lazy-loading tag 的物件，噴錯誤
  if (observedTargets.length === 0) {
    throw new Error(
      "can't select any lazy-loading items, check selector query"
    );
  }
  Array.from(observedTargets).forEach((target) => observer.observe(target));
};

export interface UserCommentProps {
  comments: {
    id: number;
    avatar: string;
    comment: string;
  }[];
}

export default function UserComment({ comments }: UserCommentProps) {
  // component render 完畢後，初始化 lazy-loading
  useEffect(() => {
    initLazyLoading();
  }, []);
  return (
    <UserCommentsContainer>
      {comments.map((comment) => (
        <UserCommentContent key={comment.id}>
          ＂{comment.comment}＂
          <UserAvatar data-src={comment.avatar}></UserAvatar>
        </UserCommentContent>
      ))}
    </UserCommentsContainer>
  );
}
