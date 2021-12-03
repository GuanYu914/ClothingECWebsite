import styled, { keyframes } from "styled-components/macro";
import { ReactComponent as heart } from "../../imgs/components/product-picker/heart.svg";
import { ReactComponent as heartFilled } from "../../imgs/components/product-picker/heart-fill.svg";
import { ReactComponent as minusSquare } from "../../imgs/components/product-picker/dash-square.svg";
import { ReactComponent as plusSquare } from "../../imgs/components/product-picker/plus-square.svg";
import { ReactComponent as close } from "../../imgs/components/product-picker/x-lg.svg";
import {
  Z_INDEX_LV6,
  Z_INDEX_LV5,
  BREAKPOINT_PAD,
  COLOR_PRIMARY1,
  BR_SECONDARY2,
  BG_MASK,
  BG_SECONDARY3,
  COLOR_SECONDARY2,
} from "../../constant";
import {
  GhostSecondaryButton,
  CTASecondaryButton,
  GhostPrimaryButton,
  CTAPrimaryButton,
  PickerGhostPrimaryButton,
  PickerCTAPrimaryButton,
  PickerGhostSecondaryButton,
  PickerCTASecondaryButton,
} from "../../components/button";
import { slideInUp } from "react-animations";
import PropTypes from "prop-types";

const slideInUpAnimation = keyframes`${slideInUp}`;

const Switcher = styled.div``;

const BackgroundContainer = styled.div`
  background-color: ${BG_MASK};
  width: 100%;
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

const PickerContainerForMobile = styled.div`
  background-color: ${BG_SECONDARY3};
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

const PickerContainerForPad = styled.div``;

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
  className: "fs-h1",
}))`
  color: ${COLOR_SECONDARY2};
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
  width: 1.6rem;
  height: 1.6rem;
  // 只有 flex wrapped item 才會套用 margin-top
  margin-top: 0.8rem;
  margin-right: 1.4rem;
  cursor: pointer;
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

const PickerPriceShower = styled.div`
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

const PickerOPButtons = styled.div`
  margin-top: 2rem;
  display: flex;
`;

export default function ProductPicker({
  picker,
  usedOnMobile,
  usedOnPad,
  handleSelectPickerColor,
  handleSelectPickerSize,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  activeOpState,
  setMobilePickerState,
  isLiked,
  handleAddToLikedItems,
  handleAddToCart,
  handleCheckout,
}) {
  return (
    <Switcher>
      {usedOnMobile && (
        <BackgroundContainer>
          <PickerContainerForMobile>
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
                          color.selected === true
                            ? `0.2rem solid ${BR_SECONDARY2}`
                            : "unset"
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
                        selected={
                          size.selected === true ? COLOR_PRIMARY1 : "unset"
                        }
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
                <PickerGhostPrimaryButton
                  onClick={() => {
                    handleAddToCart(
                      picker.colors.filter((color) => color.selected)[0]
                        .hexcode,
                      picker.sizes.filter((size) => size.selected)[0].name
                    );
                  }}
                >
                  加入購物車
                </PickerGhostPrimaryButton>
                <PickerCTAPrimaryButton
                  onClick={() => {
                    handleCheckout(
                      picker.colors.filter((color) => color.selected)[0]
                        .hexcode,
                      picker.sizes.filter((size) => size.selected)[0].name
                    );
                  }}
                >
                  直接購買
                </PickerCTAPrimaryButton>
              </PickerOPButtons>
            )}
            {/* 不可以操作 "加入購物車" 跟 "直接購買" 等操作 */}
            {!activeOpState && (
              <PickerOPButtons>
                <PickerGhostSecondaryButton>
                  加入購物車
                </PickerGhostSecondaryButton>
                <PickerCTASecondaryButton>直接購買</PickerCTASecondaryButton>
              </PickerOPButtons>
            )}
          </PickerContainerForMobile>
        </BackgroundContainer>
      )}
      {usedOnPad && (
        <PickerContainerForPad>
          <PickerColorContainer>
            <PickerColorName>顏色</PickerColorName>
            <PickerColors>
              {picker.colors.map((color) => (
                <PickerColor
                  key={color.id}
                  color={color.hexcode}
                  selected={
                    color.selected === true
                      ? `0.2rem solid ${BR_SECONDARY2}`
                      : "unset"
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
                  selected={size.selected === true ? COLOR_PRIMARY1 : "unset"}
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
            ></QuantityMinus>
            <PickerQuantityNumber>{picker.quantity}</PickerQuantityNumber>
            <QuantityPlus
              onClick={() => {
                handleIncreaseQuantity();
              }}
            ></QuantityPlus>
          </PickerQuantityContainer>
          <PickerPriceShower>
            <PickerPriceName>價格</PickerPriceName>
            <PickerPriceNumber>
              {picker.quantity * picker.unitPrice}
            </PickerPriceNumber>
          </PickerPriceShower>
          {activeOpState && (
            <PickerOPButtons>
              {/* 應導引到 cart page */}
              <CTAPrimaryButton
                isRounded={true}
                onClick={() => {
                  handleCheckout(
                    picker.colors.filter((color) => color.selected)[0].hexcode,
                    picker.sizes.filter((size) => size.selected)[0].name
                  );
                }}
                margin={"0 0.4rem 0 0"}
              >
                直接購買
              </CTAPrimaryButton>
              <GhostPrimaryButton
                isRounded={true}
                onClick={() => {
                  handleAddToCart(
                    picker.colors.filter((color) => color.selected)[0].hexcode,
                    picker.sizes.filter((size) => size.selected)[0].name
                  );
                }}
              >
                加入購物車
              </GhostPrimaryButton>
            </PickerOPButtons>
          )}
          {!activeOpState && (
            <PickerOPButtons>
              <CTASecondaryButton isRounded={true} margin={"0 0.4rem 0 0"}>
                直接購買
              </CTASecondaryButton>
              <GhostSecondaryButton isRounded={true}>
                加入購物車
              </GhostSecondaryButton>
            </PickerOPButtons>
          )}
        </PickerContainerForPad>
      )}
    </Switcher>
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
 *  usedOnMobile: boolean  (跟下一個 props 屬性則一傳入)
 *  usedOnPad: boolean     (跟上一個 props 屬性則一傳入)
 *  handleSelectPickerColor:  function (required)
 *  handleSelectPickerSize:   function (required)
 *  handleIncreaseQuantity:   function (required)
 *  handleDecreaseQuantity:   function (required)
 *  activeOpState:        boolean (required)
 *  setMobilePickerState: boolean (required)
 *  isLiked:              boolean (required)
 *  handleAddToLikedItems: function (required)
 *  handleAddToCart: function (required)
 *  handleCheckout: function (required)
 */

ProductPicker.propTypes = {
  picker: PropTypes.shape({
    colors: PropTypes.arrayOf(PropTypes.object).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.object).isRequired,
    quantity: PropTypes.number.isRequired,
    unitPrice: PropTypes.number.isRequired,
  }),
  usedOnMobile: PropTypes.bool,
  usedOnPad: PropTypes.bool,
  handleSelectPickerColor: PropTypes.func.isRequired,
  handleSelectPickerSize: PropTypes.func.isRequired,
  handleIncreaseQuantity: PropTypes.func.isRequired,
  handleDecreaseQuantity: PropTypes.func.isRequired,
  activeOpState: PropTypes.bool.isRequired,
  setMobilePickerState: PropTypes.func.isRequired,
  isLiked: PropTypes.bool.isRequired,
  handleAddToLikedItems: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  handleCheckout: PropTypes.func.isRequired,
};
