import styled from "styled-components";
import React, { useEffect } from "react";
import usePrevious from "../../hooks/usePrevious";
import { ReactComponent as heart } from "../../imgs/components/card-container/heart.svg";
import { ReactComponent as heartFilled } from "../../imgs/components/card-container/heart-fill.svg";
import {
  BOX_SHADOW_DARK,
  BREAKPOINT_PAD,
  Z_INDEX_LV1,
  BG_TRANSPARENT,
  BG_SECONDARY1,
  COLOR_SECONDARY2,
  COLOR_PRIMARY2,
  CARD_CONTAINER_LAZY_LOADING_TAG,
  CARD_CONTAINER_LAZY_LOADING_CONFIG,
} from "../../constant";
import { isEmptyObj } from "../../util";
import { useReduxSelector } from "../../redux/store";

const ItemsContainer = styled.section<{
  marginTop?: string;
  horizontalAlign?: string;
}>`
  margin-top: ${(props) => props.marginTop || "1.5rem"};
  width: 100%;
  display: flex;
  justify-content: ${(props) => props.horizontalAlign || "flex-start"};
  flex-wrap: wrap;
  align-self: baseline;
`;

const ItemContainer = styled.section.attrs(() => ({
  className: `box-shadow-dark ${CARD_CONTAINER_LAZY_LOADING_TAG}`,
}))<{
  marginLeft?: string;
}>`
  background-color: ${BG_SECONDARY1};
  width: 18rem;
  height: 14rem;
  border-radius: 1.2rem;
  position: relative;
  margin-left: ${(props) => props.marginLeft || "1rem"};
  margin-right: 1rem;
  margin-bottom: 2rem;
  cursor: pointer;
  background-size: cover;

  &:last-child {
    margin-bottom: 0;
  }

  ${BREAKPOINT_PAD} {
    box-shadow: none;

    &:hover {
      box-shadow: ${BOX_SHADOW_DARK};
    }
  }
`;

const ItemHeader = styled.header`
  color: ${COLOR_SECONDARY2};
  width: 100%;
  height: fit-content;
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  z-index: ${Z_INDEX_LV1};
  padding: 0.6rem;
  border-radius: 0 0 1.2rem 1.2rem;
  background-color: ${BG_TRANSPARENT};
`;

const ItemInfo = styled.div`
  display: block;
  flex-shrink: 1;
`;

const ItemName = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY2};
`;

const ItemPrice = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY2};
  margin-top: 0.4rem;
`;

const FavoriteIcon = styled(heart)`
  width: 1.4rem;
  height: 1.4rem;
  flex-shrink: 0;
`;

const FavoriteFilledIcon = styled(heartFilled)`
  color: ${COLOR_PRIMARY2};
  width: 1.4rem;
  height: 1.4rem;
  flex-shrink: 0;
`;

interface CardContainerProps {
  items: {
    id: number;
    product: {
      name: string;
      price: string;
      img: string;
    };
    isLiked?: boolean;
  }[];
  useForLikedItem?: boolean;
  horizontalAlign?: string;
  marginTop?: string;
  marginLeft?: string;
  handleLiked: (id: number) => void;
  handleOnClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleOnLastItem?: () => void;
}

// 將帶有 CARD_CONTAINER_LAZY_LOADING_TAG 的 DOM elements 掛上 IntersectionObserver
function initLazyLoading(lastItemTriggerCallback?: () => void): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLDivElement;
          // 如果當前是最後一個，如果有傳入 callback 則執行，否則就不用
          if (element.dataset.lastItem === "true") {
            element.style.backgroundImage = `url(${
              element.dataset.src as string
            })`;
            if (typeof lastItemTriggerCallback === "function") {
              lastItemTriggerCallback();
            }
            observer.unobserve(element);
            return;
          }
          // 預設行為，如果出現在 view port 裡面，則從 data-src 欄位載入圖片
          element.style.backgroundImage = `url(${
            element.dataset.src as string
          })`;
          observer.unobserve(element);
        }
      });
    },
    {
      root: CARD_CONTAINER_LAZY_LOADING_CONFIG.root,
      rootMargin: CARD_CONTAINER_LAZY_LOADING_CONFIG.rootMargin,
      threshold: CARD_CONTAINER_LAZY_LOADING_CONFIG.threshold,
    }
  );

  const observedTargets = document.querySelectorAll(
    `.${CARD_CONTAINER_LAZY_LOADING_TAG}`
  );
  // 如果沒有任何 lazy-loading tag 的物件
  if (observedTargets.length === 0) {
    throw new Error(
      "can't select any lazy-loading items, check selector query"
    );
  }
  Array.from(observedTargets).forEach((target) => observer.observe(target));
}

export default function CardContainer({
  items,
  useForLikedItem,
  handleLiked,
  handleOnClick,
  handleOnLastItem,
  horizontalAlign,
  marginTop,
  marginLeft,
}: CardContainerProps) {
  // 從 redux-store 拿用戶資訊
  const userFromStore = useReduxSelector((store) => store.user.info);
  // 拿之前的 items 狀態
  const prevItems = usePrevious(items);

  // 當 items 有變動時，則重新初始化 lazy-loading
  useEffect(() => {
    // 確保 items 裡面 value 為不一致才做，避免不同 ref 相同 value 傳入，掛載重複的 IntersectionObserver
    if (JSON.stringify(items) === JSON.stringify(prevItems)) return;
    // 傳入 function 當作 lazy-loading 最後一個物件要觸發的 callback
    if (typeof handleOnLastItem === "function") {
      initLazyLoading(handleOnLastItem);
      return;
    }
    initLazyLoading();
    // eslint-disable-next-line
  }, [items]);
  return (
    <ItemsContainer horizontalAlign={horizontalAlign} marginTop={marginTop}>
      {items.map((item, index) => (
        <ItemContainer
          key={item.id}
          marginLeft={marginLeft}
          data-src={item.product.img}
          data-last-item={index === items.length - 1 ? true : false}
          data-id={item.id}
          onClick={handleOnClick}
        >
          <ItemHeader data-id={item.id}>
            <ItemInfo>
              <ItemName data-id={item.id}>{item.product.name}</ItemName>
              <ItemPrice data-id={item.id}>NTD {item.product.price}</ItemPrice>
            </ItemInfo>
            {useForLikedItem && (
              <>
                {!isEmptyObj(userFromStore) && (
                  <>
                    {item.isLiked && (
                      <FavoriteFilledIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLiked(item.id);
                        }}
                      />
                    )}
                    {!item.isLiked && (
                      <FavoriteIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLiked(item.id);
                        }}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </ItemHeader>
        </ItemContainer>
      ))}
    </ItemsContainer>
  );
}
