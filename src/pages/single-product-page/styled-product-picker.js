import styled, { keyframes } from "styled-components";
import { ReactComponent as heart } from "../../imgs/pages/single-product-page/heart.svg";
import { ReactComponent as heartFilled } from "../../imgs/pages/single-product-page/heart-fill.svg";
import { ReactComponent as minusSquare } from "../../imgs/pages/single-product-page/dash-square.svg";
import { ReactComponent as plusSquare } from "../../imgs/pages/single-product-page/plus-square.svg";
import { ReactComponent as close } from "../../imgs/pages/single-product-page/x-lg.svg";
import { Z_INDEX_LV6, Z_INDEX_LV5 } from "../../constant";
import { slideInUp } from "react-animations";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

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

const PickerActionName = styled.h2.attrs(() => ({
  className: "fs-h2",
}))``;

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

const QuantityNumber = styled.h2.attrs(() => ({
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

const PriceNumber = styled.h3.attrs(() => ({
  className: "fs-h2 color-secondary2",
}))``;

const PickerOPButtons = styled.div`
  margin-top: 2rem;
  display: flex;
  height: 4rem;
`;

const AddToBag = styled.div.attrs((props) => ({
  // 預設屬性為不可點擊，且設置顏色為 secondary
  className:
    props.state || "color-secondary1 br-secondary1 bg-secondary3 none-pointer",
}))`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-style: solid;
  border-width: 0.4rem;
  cursor: pointer;
`;

const Purchase = styled.div.attrs((props) => ({
  // 預設屬性為不可點擊，且設置顏色為 secondary
  className: props.state || "color-secondary3 bg-secondary1 none-pointer",
}))`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  cursor: pointer;
`;

export default function ProductPicker({
  setPickerEnable,
  isLiked,
  handleAddToLikedItems,
}) {
  // 使用假資料
  const [picker, setPicker] = useState({
    colors: [
      { id: 1, hexcode: "#ffce30", selected: false },
      { id: 2, hexcode: "#e83845", selected: false },
      { id: 3, hexcode: "#e389b9", selected: false },
      { id: 4, hexcode: "#746ab0", selected: false },
      { id: 5, hexcode: "#288ba8", selected: false },
    ],
    sizes: [
      { id: 1, name: "XS", selected: false },
      { id: 2, name: "S", selected: false },
      { id: 3, name: "M", selected: false },
      { id: 4, name: "L", selected: false },
      { id: 5, name: "XL", selected: false },
      { id: 6, name: "2L", selected: false },
    ],
    quantity: 1,
    unitPrice: 490,
  });
  const [activeOPState, setActiveOPState] = useState(false);

  function handleSelectPickerColor(id) {
    setPicker({
      ...picker,
      colors: picker.colors.map((color) =>
        color.id === id
          ? { ...color, selected: true }
          : { ...color, selected: false }
      ),
    });
  }

  function handleSelectPickerSize(id) {
    setPicker({
      ...picker,
      sizes: picker.sizes.map((size) =>
        size.id === id
          ? { ...size, selected: true }
          : { ...size, selected: false }
      ),
    });
  }

  useEffect(() => {
    // 這裡可以檢查目前 picker 狀態
    console.log(picker);
    // 每一次 render 完檢查是否可以進入到 "加入購物車" 跟 "直接購買" 等操作
    setActiveOPState(checkOP());
  }, [picker]);

  function handleIncreaseQuantity() {
    setPicker({
      ...picker,
      quantity: picker.quantity + 1,
    });
  }

  function handleDecreaseQuantity() {
    if (picker.quantity == 1) return;
    setPicker({
      ...picker,
      quantity: picker.quantity - 1,
    });
  }

  // 檢查 picker 中的 color 跟 size 是否有被選取
  function checkOP() {
    let colorChecked = false;
    let sizeChecked = false;
    for (let i = 0; i < picker.colors.length; i++) {
      if (picker.colors[i].selected) {
        colorChecked = true;
        break;
      }
    }
    for (let j = 0; j < picker.sizes.length; j++) {
      if (picker.sizes[j].selected) {
        sizeChecked = true;
        break;
      }
    }

    return colorChecked && sizeChecked;
  }

  return (
    <BackgroundContainer>
      <PickerContainer>
        <PickerPaddingContainer>
          <PickerHeader>
            <PickerProductName>女版襯衫</PickerProductName>
            <PickerHeaderButton>
              {isLiked && (
                <FavoriteFilledIcon onClick={handleAddToLikedItems} />
              )}
              {!isLiked && <FavoriteIcon onClick={handleAddToLikedItems} />}
              <CloseButton
                onClick={() => {
                  setPickerEnable(false);
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
              <QuantityMinus onClick={handleDecreaseQuantity} />
              <QuantityNumber>{picker.quantity}</QuantityNumber>
              <QuantityPlus onClick={handleIncreaseQuantity} />
            </PickerQuantityContainer>
          </PickerSpecContainer>
          <PickerPriceShower>
            <PickerPriceName>價格</PickerPriceName>
            <PriceNumber>{picker.quantity * picker.unitPrice}</PriceNumber>
          </PickerPriceShower>
        </PickerPaddingContainer>
        {/* 可以操作 "加入購物車" 跟 "直接購買" 等操作 */}
        {activeOPState && (
          <PickerOPButtons>
            <AddToBag state={"color-primary1 br-primary1 bg-secondary3"}>
              <PickerActionName>加入購物車</PickerActionName>
            </AddToBag>
            <Purchase state={"color-secondary3 bg-primary1"}>
              <PickerActionName>直接購買</PickerActionName>
            </Purchase>
          </PickerOPButtons>
        )}
        {/* 不可以操作 "加入購物車" 跟 "直接購買" 等操作 */}
        {!activeOPState && (
          <PickerOPButtons>
            <AddToBag>
              <PickerActionName>加入購物車</PickerActionName>
            </AddToBag>
            <Purchase>
              <PickerActionName>直接購買</PickerActionName>
            </Purchase>
          </PickerOPButtons>
        )}
      </PickerContainer>
    </BackgroundContainer>
  );
}

ProductPicker.propTypes = {
  setPickerEnable: PropTypes.func,
  isLiked: PropTypes.bool,
  handleAddToLikedItems: PropTypes.func,
};
