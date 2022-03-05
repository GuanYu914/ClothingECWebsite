import styled, { keyframes } from "styled-components";
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
  BR_PRIMARY1,
  COLOR_PRIMARY2,
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
} from "../button";
import { slideInUp } from "react-animations";
import { isEmptyObj } from "../../util";
import { useReduxSelector } from "../../redux/store";

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

const PickerContainerForMobile = styled.section`
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

const PickerContainerForPad = styled.section``;

const PickerPaddingContainer = styled.section`
  padding: 1rem;
`;

const PickerHeader = styled.header`
  color: ${COLOR_SECONDARY2};
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
  color: ${COLOR_PRIMARY2};
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

const PickerColor = styled.div<{
  color: string;
  selected: string;
}>`
  width: 2.2rem;
  height: 2.2rem;
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
}))<{ selected: string }>`
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

const PickerOPButtons = styled.section`
  margin-top: 2rem;
  display: flex;
`;

interface ProductPickerProps {
  name?: string;
  picker: {
    colors: {
      id: number;
      hexcode: string;
      selected: boolean;
    }[];
    sizes: {
      id: number;
      name: string;
      selected: boolean;
    }[];
    quantity: number;
    unitPrice: number;
  };
  usedOnMobile?: boolean;
  usedOnPad?: boolean;
  activeOpState: boolean;
  isLiked: boolean;
  handleSelectPickerColor: (colorID: number) => void;
  handleSelectPickerSize: (sizeID: number) => void;
  handleIncreaseQuantity: () => void;
  handleDecreaseQuantity: () => void;
  setMobilePickerState: (boolValue: boolean) => void;
  handleAddToLikedItems: () => void;
  handleAddToCart: (
    isSelected: boolean,
    selectedColorHexcode?: string,
    selectedSizeName?: string
  ) => void;
  handleCheckout: (
    isSelected: boolean,
    selectedColorHexcode?: string,
    selectedSizeName?: string
  ) => void;
}

export default function ProductPicker({
  name,
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
}: ProductPickerProps) {
  // 從 redux-store 拿用戶資訊
  const userFromStore = useReduxSelector((store) => store.user.info);
  return (
    <Switcher>
      {usedOnMobile && (
        <BackgroundContainer>
          <PickerContainerForMobile>
            <PickerPaddingContainer>
              <PickerHeader>
                <PickerProductName>{name}</PickerProductName>
                <PickerHeaderButton>
                  {!isEmptyObj(userFromStore) ? (
                    <>
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
                    </>
                  ) : (
                    <></>
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
                            ? `0.2rem solid ${BR_PRIMARY1}`
                            : `0.2rem solid ${BR_SECONDARY2}`
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
                      true,
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
                      true,
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
                <PickerGhostSecondaryButton
                  onClick={() => {
                    handleAddToCart(false);
                  }}
                >
                  加入購物車
                </PickerGhostSecondaryButton>
                <PickerCTASecondaryButton
                  onClick={() => {
                    handleCheckout(false);
                  }}
                >
                  直接購買
                </PickerCTASecondaryButton>
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
                      ? `0.2rem solid ${BR_PRIMARY1}`
                      : `0.2rem solid ${BR_SECONDARY2}`
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
                    true,
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
                    true,
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
              <CTASecondaryButton
                isRounded={true}
                margin={"0 0.4rem 0 0"}
                onClick={() => {
                  handleCheckout(false);
                }}
              >
                直接購買
              </CTASecondaryButton>
              <GhostSecondaryButton
                isRounded={true}
                onClick={() => {
                  handleAddToCart(false);
                }}
              >
                加入購物車
              </GhostSecondaryButton>
            </PickerOPButtons>
          )}
        </PickerContainerForPad>
      )}
    </Switcher>
  );
}
