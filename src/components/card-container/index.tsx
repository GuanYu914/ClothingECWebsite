import styled from "styled-components";
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
  className: "box-shadow-dark",
}))<{
  marginLeft?: string;
  img: string;
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
  background-image: url("${(props) => props.img}");
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
    isLiked: boolean;
  }[];
  horizontalAlign?: string;
  marginTop?: string;
  marginLeft?: string;
  handleLiked: (id: number) => void;
  handleOnClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function CardContainer({
  items,
  handleLiked,
  handleOnClick,
  horizontalAlign,
  marginTop,
  marginLeft,
}: CardContainerProps) {
  // 從 redux-store 拿用戶資訊
  const userFromStore = useReduxSelector((store) => store.user.info);
  return (
    <ItemsContainer horizontalAlign={horizontalAlign} marginTop={marginTop}>
      {items.map((item) => (
        <ItemContainer
          key={item.id}
          marginLeft={marginLeft}
          img={item.product.img}
          data-id={item.id}
          onClick={handleOnClick}
        >
          <ItemHeader data-id={item.id}>
            <ItemInfo>
              <ItemName data-id={item.id}>{item.product.name}</ItemName>
              <ItemPrice data-id={item.id}>NTD {item.product.price}</ItemPrice>
            </ItemInfo>
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
          </ItemHeader>
        </ItemContainer>
      ))}
    </ItemsContainer>
  );
}
