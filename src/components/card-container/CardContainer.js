import styled from "styled-components/macro";
import PropTypes from "prop-types";
import { ReactComponent as heart } from "../../imgs/components/card-container/heart.svg";
import { ReactComponent as heartFilled } from "../../imgs/components/card-container/heart-fill.svg";
import { BOX_SHADOW_DARK, BREAKPOINT_PAD, Z_INDEX_LV1 } from "../../constant";

const ItemsContainer = styled.div`
  margin-top: ${(props) => props.marginTop || "1.5rem"};
  width: 100%;
  display: flex;
  justify-content: ${(props) => props.horizontalAlign || "flex-start"};
  flex-wrap: wrap;
  align-self: baseline;
`;

const ItemContainer = styled.div.attrs(() => ({
  className: "bg-secondary1 box-shadow-dark",
}))`
  width: 18rem;
  height: 14rem;
  border-radius: 1.2rem;
  position: relative;
  margin-left: ${(props) => props.marginLeft || "1rem"};
  margin-right: 1rem;
  margin-bottom: 2rem;
  cursor: pointer;

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

const ItemHeader = styled.div.attrs(() => ({
  className: "bg-secondary3",
}))`
  width: 100%;
  height: fit-content;
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: 0;
  z-index: ${Z_INDEX_LV1};
  padding: 0.6rem;
  border-radius: 0 0 1.2rem 1.2rem;
`;

const ItemInfo = styled.div`
  display: block;
  flex-shrink: 1;
`;

const ItemName = styled.h3.attrs(() => ({
  className: "fs-h3",
}))``;

const ItemPrice = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  margin-top: 0.4rem;
`;

const FavoriteIcon = styled(heart)`
  width: 1.4rem;
  height: 1.4rem;
  flex-shrink: 0;
`;

const FavoriteFilledIcon = styled(heartFilled)`
  width: 1.4rem;
  height: 1.4rem;
  flex-shrink: 0;
`;

export default function CardContainer({
  items,
  handleLiked,
  horizontalAlign,
  marginTop,
  marginLeft,
}) {
  return (
    <ItemsContainer horizontalAlign={horizontalAlign} marginTop={marginTop}>
      {items.map((item) => (
        <ItemContainer key={item.id} marginLeft={marginLeft}>
          <ItemHeader>
            <ItemInfo>
              <ItemName>{item.product.name}</ItemName>
              <ItemPrice>NTD {item.product.price}</ItemPrice>
            </ItemInfo>
            {item.isLiked && (
              <FavoriteFilledIcon
                onClick={() => {
                  handleLiked(item.id);
                }}
              />
            )}
            {!item.isLiked && (
              <FavoriteIcon
                onClick={() => {
                  handleLiked(item.id);
                }}
              />
            )}
          </ItemHeader>
        </ItemContainer>
      ))}
    </ItemsContainer>
  );
}

/*  props 參數
    items (required) {
      id: number      (required)
      product: {
        name: string  (required)
        price: string (required)
      },
      isLiked: boolean(required)
    }

    handleLinked: function (required)
    ps. toggle item 物件的 isLiked 屬性

    horizontalAlign: string (optional)
    ps. 決定 ItemsContainer 是否 justify-content: center

    marginLeft: string (optional) 
    ps. 設置 ItemContainer 的 margin-left，預設為 1rem
*/

CardContainer.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
      }),
      isLiked: PropTypes.bool.isRequired,
    })
  ),
  horizontalAlign: PropTypes.string,
  marginTop: PropTypes.string,
  marginLeft: PropTypes.string,
  handleLiked: PropTypes.func.isRequired,
};
