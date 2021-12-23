import styled from "styled-components";
import { ReactComponent as minusSquare } from "../../imgs/pages/cart-page/dash-square.svg";
import { ReactComponent as plusSquare } from "../../imgs/pages/cart-page/plus-square.svg";
import PropTypes from "prop-types";
import { COLOR_PRIMARY1, COLOR_SECONDARY2, BR_PRIMARY1 } from "../../constant";

const Container = styled.section``;

const PickerColorContainer = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 1.4rem;
`;

const PickerColorName = styled.h2.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY2};
  margin-right: 1rem;
  flex-shrink: 0;
`;

const PickerColors = styled.div`
  display: flex;
  flex-wrap: wrap;
  // 只有 flex wrapped item 才會套用 margin-top
  margin-top: -0.8rem;
`;

const PickerColor = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  // 只有 flex wrapped item 才會套用 margin-top
  margin-top: 0.8rem;
  margin-right: 1.4rem;
  cursor: pointer;
  background-color: ${(props) => props.color};
  border: ${(props) => props.selected || BR_PRIMARY1};

  &:last-child {
    margin-right: 0;
  }
`;

const PickerSizeContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1.4rem;
`;

const PickerSizeName = styled.h2.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY2};
  margin-right: 1rem;
  flex-shrink: 0;
`;

const PickerSizes = styled.div`
  display: flex;
  flex-wrap: wrap;
  // 只有 flex wrapped item 才會套用 margin-top
  margin-top: -0.8rem;
`;

const PickerSize = styled.h3.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY2};
  // 只有 flex wrapped item 才會套用 margin-top
  margin-top: 0.8rem;
  margin-right: 0.8rem;
  cursor: pointer;
  color: ${(props) => props.selected || COLOR_SECONDARY2};

  &:last-child {
    margin-right: 0;
  }
`;

const PickerQuantityContainer = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 1.4rem;
`;

const PickerQuantityName = styled.h2.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY2};
  margin-right: 1rem;
`;

const QuantityMinus = styled(minusSquare)`
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
  margin-right: 2rem;
`;

const QuantityPlus = styled(plusSquare)`
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
  margin-left: 2rem;
`;

const PickerQuantityNumber = styled.h2.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY2};
`;

const PickerPriceShower = styled.section`
  display: flex;
  align-items: center;
`;

const PickerPriceName = styled.h2.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY2};
  margin-right: 1rem;
`;

const PickerPriceNumber = styled.h3.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY2};
`;

export default function CartPicker({
  picker,
  productId,
  handleSelectPickerColor,
  handleSelectPickerSize,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
}) {
  return (
    <Container>
      <PickerColorContainer>
        <PickerColorName>顏色</PickerColorName>
        <PickerColors>
          {picker.colors.map((color) => (
            <PickerColor
              key={color.id}
              color={color.hexcode}
              selected={
                color.selected === true ? `0.2rem solid ${BR_PRIMARY1}` : ""
              }
              onClick={() => {
                handleSelectPickerColor(productId, color.id);
              }}
            ></PickerColor>
          ))}
        </PickerColors>
      </PickerColorContainer>
      <PickerSizeContainer>
        <PickerSizeName>尺寸</PickerSizeName>
        <PickerSizes>
          {picker.sizes.map((size) => (
            <PickerSize
              key={size.id}
              selected={size.selected === true ? COLOR_PRIMARY1 : ""}
              onClick={() => {
                handleSelectPickerSize(productId, size.id);
              }}
            >
              {size.name}
            </PickerSize>
          ))}
        </PickerSizes>
      </PickerSizeContainer>
      <PickerQuantityContainer>
        <PickerQuantityName>數量</PickerQuantityName>
        <QuantityMinus
          onClick={() => {
            handleDecreaseQuantity(productId);
          }}
        ></QuantityMinus>
        <PickerQuantityNumber>{picker.quantity}</PickerQuantityNumber>
        <QuantityPlus
          onClick={() => {
            handleIncreaseQuantity(productId);
          }}
        ></QuantityPlus>
      </PickerQuantityContainer>
      <PickerPriceShower>
        <PickerPriceName>價格</PickerPriceName>
        <PickerPriceNumber>
          {picker.quantity * picker.unitPrice}
        </PickerPriceNumber>
      </PickerPriceShower>
    </Container>
  );
}

/**
 *  props 屬性
 *  picker: {
 *   color: object array (required)
 *   sizes: object array (required)
 *   quantity: number    (required)
 *   unitPrice: number   (required)
 *  }
 *  productId: number    (required)
 *  handleSelectPickerColor:  function (required)
 *  handleSelectPickerSize:   function (required)
 *  handleIncreaseQuantity:   function (required)
 *  handleDecreaseQuantity:   function (required)
 */

CartPicker.propTypes = {
  picker: PropTypes.shape({
    colors: PropTypes.arrayOf(PropTypes.object).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.object).isRequired,
    quantity: PropTypes.number.isRequired,
    unitPrice: PropTypes.number.isRequired,
  }),
  productId: PropTypes.number.isRequired,
  handleSelectPickerColor: PropTypes.func.isRequired,
  handleSelectPickerSize: PropTypes.func.isRequired,
  handleIncreaseQuantity: PropTypes.func.isRequired,
  handleDecreaseQuantity: PropTypes.func.isRequired,
};
