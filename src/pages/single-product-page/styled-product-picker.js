import styled, { keyframes } from "styled-components/macro";
import { ReactComponent as heart } from "../../imgs/pages/single-product-page/heart.svg";
import { ReactComponent as heartFilled } from "../../imgs/pages/single-product-page/heart-fill.svg";
import { ReactComponent as minusSquare } from "../../imgs/pages/single-product-page/dash-square.svg";
import { ReactComponent as plusSquare } from "../../imgs/pages/single-product-page/plus-square.svg";
import { ReactComponent as close } from "../../imgs/pages/single-product-page/x-lg.svg";
import { Z_INDEX_LV6, Z_INDEX_LV5, BREAKPOINT_PAD } from "../../constant";
import {
  PickerGhostSecondaryButton,
  PickerCTASecondaryButton,
  PickerGhostPrimaryButton,
  PickerCTAPrimaryButton,
} from "../../components/button";
import { slideInUp } from "react-animations";
import PropTypes from "prop-types";

const slideInUpAnimation = keyframes`${slideInUp}`;

const BackgroundContainer = styled.div.attrs(() => ({
  className: "bg-offcanva",
}))`
  width: 100;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${Z_INDEX_LV5};

  // 平板以上禁止顯示
  ${BREAKPOINT_PAD} {
    display: none;
  }
`;

const PickerContainer = styled.div.attrs(() => ({
  className: "bg-secondary3",
}))`
  width: 100%;
  height: fit-content;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${Z_INDEX_LV6};
  // 對 picker 套用 slide up 效果
  animation: 1s ${slideInUpAnimation};
`;

const PickerPaddingContainer = styled.div`
  padding: 1rem;
`;

const PickerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.6rem;
`;

const PickerProductName = styled.h1.attrs(() => ({
  className: "fs-h1 color-secondary2",
}))`
  margin-right: 1rem;
`;

const PickerHeaderButton = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const FavoriteIcon = styled(heart)`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
`;

const FavoriteFilledIcon = styled(heartFilled)`
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
`;

const CloseButton = styled(close)`
  width: 1.6rem;
  height: 1.6rem;
  margin-left: 1.4rem;
  cursor: pointer;
`;

const PickerSpecContainer = styled.div`
  margin-top: 2rem;
`;

const PickerColorContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.4rem;
`;

const PickerColorName = styled.h2.attrs(() => ({
  className: "fs-h2 color-secondary2",
}))`
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
  width: 1.6rem;
  height: 1.6rem;
  // 只有 flex wrapped item 才會套用 margin-top
  margin-top: 0.8rem;
  margin-right: 1.4rem;
  background-color: ${(props) => props.color};
  border: ${(props) => props.selected};

  &:last-child {
    margin-right: 0;
  }
`;

const PickerSizeContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1.4rem;
`;

const PickerSizeName = styled.h2.attrs(() => ({
  className: "fs-h2 color-secondary2",
}))`
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
  className: "fs-h2 color-secondary2",
}))`
  // 只有 flex wrapped item 才會套用 margin-top
  margin-top: 0.8rem;
  margin-right: 0.8rem;
  cursor: pointer;
  color: ${(props) => props.selected};

  &:last-child {
    margin-right: 0;
  }
`;

const PickerQuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.4rem;
`;

const PickerQuantityName = styled.h2.attrs(() => ({
  className: "fs-h2 color-secondary2",
}))`
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
  className: "fs-h2 color-secondary2",
}))``;

const PickerPriceShower = styled.div`
  display: flex;
  align-items: center;
`;

const PickerPriceName = styled.h2.attrs(() => ({
  className: "fs-h2 color-secondary2",
}))`
  margin-right: 1rem;
`;

const PickerPriceNumber = styled.h3.attrs(() => ({
  className: "fs-h2 color-secondary2",
}))``;

const PickerOPButtons = styled.div`
  margin-top: 2rem;
  display: flex;
`;

// 定義一些可以共用的 styled-component 元件
export const SharedPickerColorContainer = styled(PickerColorContainer)``;
export const SharedPickerColorName = styled(PickerColorName)``;
export const SharedPickerColors = styled(PickerColors)``;
export const SharedPickerColor = styled(PickerColor)``;
export const SharedPickerSizeContainer = styled(PickerSizeContainer)``;
export const SharedPickerSizeName = styled(PickerSizeName)``;
export const SharedPickerSizes = styled(PickerSizes)``;
export const SharedPickerSize = styled(PickerSize)``;
export const SharedPickerQuantityContainer = styled(PickerQuantityContainer)``;
export const SharedPickerQuantityName = styled(PickerQuantityName)``;
export const SharedQuantityMinus = styled(QuantityMinus)``;
export const SharedPickerQuantityNumber = styled(PickerQuantityNumber)``;
export const SharedQuantityPlus = styled(QuantityPlus)``;
export const SharedPickerPriceShower = styled(PickerPriceShower)``;
export const SharedPickerPriceName = styled(PickerPriceName)``;
export const SharedPickerPriceNumber = styled(PickerPriceNumber)``;

export default function ProductPicker({
  picker,
  handleSelectPickerColor,
  handleSelectPickerSize,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  activeOpState,
  setMobilePickerState,
  isLiked,
  handleAddToLikedItems,
}) {
  return (
    <BackgroundContainer>
      <PickerContainer>
        <PickerPaddingContainer>
          <PickerHeader>
            <PickerProductName>女版襯衫</PickerProductName>
            <PickerHeaderButton>
              {isLiked && (
                <FavoriteFilledIcon
                  onClick={() => {
                    handleAddToLikedItems();
                  }}
                />
              )}
              {!isLiked && (
                <FavoriteIcon
                  onClick={() => {
                    handleAddToLikedItems();
                  }}
                />
              )}
              <CloseButton
                onClick={() => {
                  setMobilePickerState(false);
                }}
              />
            </PickerHeaderButton>
          </PickerHeader>
          <PickerSpecContainer>
            <PickerColorContainer>
              <PickerColorName>顏色</PickerColorName>
              <PickerColors>
                {picker.colors.map((color) => (
                  <PickerColor
                    key={color.id}
                    color={color.hexcode}
                    selected={
                      color.selected === true ? "0.2rem solid #1F1E1C" : "unset"
                    }
                    onClick={() => {
                      handleSelectPickerColor(color.id);
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
                    selected={size.selected === true ? "#9DCBDF" : "unset"}
                    onClick={() => {
                      handleSelectPickerSize(size.id);
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
                  handleDecreaseQuantity();
                }}
              />
              <PickerQuantityNumber>{picker.quantity}</PickerQuantityNumber>
              <QuantityPlus
                onClick={() => {
                  handleIncreaseQuantity();
                }}
              />
            </PickerQuantityContainer>
          </PickerSpecContainer>
          <PickerPriceShower>
            <PickerPriceName>價格</PickerPriceName>
            <PickerPriceNumber>
              {picker.quantity * picker.unitPrice}
            </PickerPriceNumber>
          </PickerPriceShower>
        </PickerPaddingContainer>
        {/* 可以操作 "加入購物車" 跟 "直接購買" 等操作 */}
        {activeOpState && (
          <PickerOPButtons>
            <PickerGhostPrimaryButton>加入購物車</PickerGhostPrimaryButton>
            <PickerCTAPrimaryButton>直接購買</PickerCTAPrimaryButton>
          </PickerOPButtons>
        )}
        {/* 不可以操作 "加入購物車" 跟 "直接購買" 等操作 */}
        {!activeOpState && (
          <PickerOPButtons>
            <PickerGhostSecondaryButton>加入購物車</PickerGhostSecondaryButton>
            <PickerCTASecondaryButton>直接購買</PickerCTASecondaryButton>
          </PickerOPButtons>
        )}
      </PickerContainer>
    </BackgroundContainer>
  );
}

ProductPicker.propTypes = {
  picker: PropTypes.object,
  handleSelectPickerColor: PropTypes.func,
  handleSelectPickerSize: PropTypes.func,
  handleIncreaseQuantity: PropTypes.func,
  handleDecreaseQuantity: PropTypes.func,
  activeOpState: PropTypes.bool,
  setMobilePickerState: PropTypes.func,
  isLiked: PropTypes.bool,
  handleAddToLikedItems: PropTypes.func,
};
