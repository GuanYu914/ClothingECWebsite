import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styled from "styled-components/macro";
import BSCarousel from "../../components/bs-carousel/BSCarousel";
import CardContainer from "../../components/card-container";
import ProductPicker from "./styled-product-picker";
import { useEffect, useState } from "react";
import { ReactComponent as heart } from "../../imgs/pages/single-product-page/heart.svg";
import { ReactComponent as heartFilled } from "../../imgs/pages/single-product-page/heart-fill.svg";
import {
  SharedPickerColorContainer,
  SharedPickerColorName,
  SharedPickerColors,
  SharedPickerColor,
  SharedPickerSizeContainer,
  SharedPickerSizeName,
  SharedPickerSizes,
  SharedPickerSize,
  SharedPickerQuantityContainer,
  SharedPickerQuantityName,
  SharedQuantityMinus,
  SharedPickerQuantityNumber,
  SharedQuantityPlus,
  SharedPickerPriceShower,
  SharedPickerPriceName,
  SharedPickerPriceNumber,
} from "./styled-product-picker";
import {
  CTAPrimaryButton,
  GhostPrimaryButton,
  CTASecondaryButton,
  GhostSecondaryButton,
} from "../../components/button";
import {
  BREAKPOINT_MOBILE,
  BREAKPOINT_LAPTOP,
  BREAKPOINT_PAD,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
  MAX_CONTAINER_WIDTH,
  Z_INDEX_LV2,
} from "../../constant";

const PageContainer = styled.div``;
const ContentContainer = styled.div`
  // 定義容器最大寬度
  max-width: ${MAX_CONTAINER_WIDTH};
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;

  // 從頁面頂端計算 Header Component 目前的高度，並從這當作起點開始 render
  ${BREAKPOINT_MOBILE} {
    margin-top: ${HEADER_HEIGHT_MOBILE};
  }

  ${BREAKPOINT_PAD} {
    margin-top: ${HEADER_HEIGHT_PAD};
  }
  // 大於 1440px 寬度時，改變左右 padding
  ${BREAKPOINT_LAPTOP} {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const ProductCategoryPath = styled.h3.attrs(() => ({
  className: "fs-h3 color-secondary2",
}))`
  margin-bottom: 1rem;
  // 根據不同裝置寬度預設跟 Header 保持 margin-top: 1rem
  ${BREAKPOINT_MOBILE} {
    margin-top: calc(${HEADER_HEIGHT_MOBILE} + 1rem);
  }

  ${BREAKPOINT_PAD} {
    margin-top: calc(${HEADER_HEIGHT_PAD} + 1rem);
  }
`;

const ProductInfoForMobile = styled.div`
  ${BREAKPOINT_MOBILE} {
    display: block;
  }

  ${BREAKPOINT_PAD} {
    display: none;
  }
`;

const ProductInfoContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${BREAKPOINT_PAD} {
    display: block;
    margin-top: 0;
    flex-grow: 1;
    padding-left: 0.8rem;
  }
`;

const ProductHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProductName = styled.h1.attrs(() => ({
  className: "fs-h1 color-secondary2",
}))``;

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

const DetailInfoContainer = styled.div`
  margin-top: 3rem;
`;

const DetailInfoTitle = styled.h2.attrs(() => ({
  className: "fs-h2 color-secondary2",
}))``;

const DetailInfoDesc = styled.h3.attrs(() => ({
  className: "fs-h3 color-secondary2",
}))`
  margin-top: 1rem;
`;

const ProductInfoContainerForPad = styled.div`
  ${BREAKPOINT_MOBILE} {
    display: none;
  }

  ${BREAKPOINT_PAD} {
    display: flex;
  }
`;

// 適用於 pad breakpoint
const ProductPickerContainer = styled.div``;
const ProductPickerOPButtons = styled.div`
  margin-top: 2rem;
  display: flex;
`;

const WatchedItemsContainer = styled.div`
  margin-top: 2rem;
`;

const WatchedItemsTitle = styled.h2.attrs(() => ({
  className: "fs-h2 color-secondary2",
}))``;

const ProductAddButton = styled.div.attrs(() => ({
  className: "fs-h2 bg-primary1 color-secondary3",
}))`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.04) 0px -3px 5px;
  z-index: ${Z_INDEX_LV2};

  ${BREAKPOINT_PAD} {
    display: none;
  }
`;

export default function SingleProductPage() {
  // 根據螢幕寬度給不同 props 到 BSCarousel 元件
  // 使用假資料
  const [slidesForMobile, setSlidesForMobile] = useState({
    frame: {
      maxHeight: "22rem",
      borderRadius: "2rem",
    },
    slide: [
      {
        id: 1,
        src: "https://i.imgur.com/C7SYk0P.jpg",
        alt: "product_pic",
      },
      {
        id: 2,
        src: "https://i.imgur.com/Dfav1Yk.jpg",
        alt: "product_pic",
      },
    ],
  });

  const [slidesForPad, setSlidesForPad] = useState({
    frame: {
      borderRadius: "2rem",
    },
    slide: [
      {
        id: 1,
        src: "https://i.imgur.com/C7SYk0P.jpg",
        alt: "product_pic",
      },
      {
        id: 2,
        src: "https://i.imgur.com/Dfav1Yk.jpg",
        alt: "product_pic",
      },
    ],
  });
  // mobile 裝置底下， styled-product-picker 元件啟用狀態
  const [mobilePickerState, setMobilePickerState] = useState(false);
  // 儲存當前頁面，愛心是否被點擊狀態
  const [isLiked, setIsLiked] = useState(false);
  // 給 picker 的資訊，適用於 mobile 跟 pad
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
  const [activeOpState, setActiveOpState] = useState(false);
  // 使用假資料
  const [watchedItems, setWatchItems] = useState([
    {
      id: 1,
      product: { name: "牛仔短褲", price: "489" },
      isLiked: false,
    },
    {
      id: 2,
      product: { name: "修身寬褲", price: "699" },
      isLiked: true,
    },
    {
      id: 3,
      product: {
        name: "迪士尼聯名短袖",
        price: "899",
      },
      isLiked: true,
    },
  ]);

  // Render 完會做的事
  useEffect(() => {
    // 這裡可以檢查目前 picker 狀態
    console.log(picker);
    // 更新底部按鈕配色
    setActiveOpState(checkOP());
  }, [picker, activeOpState]);

  function handleProductAdd() {
    // 叫出 mobile 裝置底下的 styled-product-picker 元件
    setMobilePickerState(true);
  }
  // 更新當前頁面愛心狀態
  function handleAddToLikedItems() {
    setIsLiked(!isLiked);
  }

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

  // 更新 watchedItems 裡面物件的 isLiked 屬性
  function handleUpdateItemLikedState(id) {
    setWatchItems(
      watchedItems.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : { ...item }
      )
    );
  }

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <ProductCategoryPath>
          首頁 &gt; 分類 &gt; 女裝 &gt; 秋冬款
        </ProductCategoryPath>
        <ProductInfoForMobile>
          <BSCarousel slides={slidesForMobile} />
          <ProductInfoContainer>
            <ProductName>女版襯衫</ProductName>
            {isLiked && <FavoriteFilledIcon onClick={handleAddToLikedItems} />}
            {!isLiked && <FavoriteIcon onClick={handleAddToLikedItems} />}
          </ProductInfoContainer>
          <DetailInfoContainer>
            <DetailInfoTitle>詳細資訊</DetailInfoTitle>
            <DetailInfoDesc>
              這邊會需要提供運費、尺寸、商品材質以及清洗注意事項
            </DetailInfoDesc>
          </DetailInfoContainer>
        </ProductInfoForMobile>
        <ProductInfoContainerForPad>
          <BSCarousel slides={slidesForPad} />
          <ProductInfoContainer>
            <ProductHeaderContainer>
              <ProductName>女版襯衫</ProductName>
              {isLiked && (
                <FavoriteFilledIcon onClick={handleAddToLikedItems} />
              )}
              {!isLiked && <FavoriteIcon onClick={handleAddToLikedItems} />}
            </ProductHeaderContainer>
            <ProductPickerContainer>
              <SharedPickerColorContainer>
                <SharedPickerColorName>顏色</SharedPickerColorName>
                <SharedPickerColors>
                  {picker.colors.map((color) => (
                    <SharedPickerColor
                      key={color.id}
                      color={color.hexcode}
                      selected={
                        color.selected === true
                          ? "0.2rem solid #1F1E1C"
                          : "unset"
                      }
                      onClick={() => {
                        handleSelectPickerColor(color.id);
                      }}
                    ></SharedPickerColor>
                  ))}
                </SharedPickerColors>
              </SharedPickerColorContainer>
              <SharedPickerSizeContainer>
                <SharedPickerSizeName>尺寸</SharedPickerSizeName>
                <SharedPickerSizes>
                  {picker.sizes.map((size) => (
                    <SharedPickerSize
                      key={size.id}
                      selected={size.selected === true ? "#9DCBDF" : "unset"}
                      onClick={() => {
                        handleSelectPickerSize(size.id);
                      }}
                    >
                      {size.name}
                    </SharedPickerSize>
                  ))}
                </SharedPickerSizes>
              </SharedPickerSizeContainer>
              <SharedPickerQuantityContainer>
                <SharedPickerQuantityName>數量</SharedPickerQuantityName>
                <SharedQuantityMinus
                  onClick={() => {
                    handleDecreaseQuantity();
                  }}
                ></SharedQuantityMinus>
                <SharedPickerQuantityNumber>
                  {picker.quantity}
                </SharedPickerQuantityNumber>
                <SharedQuantityPlus
                  onClick={() => {
                    handleIncreaseQuantity();
                  }}
                ></SharedQuantityPlus>
              </SharedPickerQuantityContainer>
              <SharedPickerPriceShower>
                <SharedPickerPriceName>價格</SharedPickerPriceName>
                <SharedPickerPriceNumber>
                  {picker.quantity * picker.unitPrice}
                </SharedPickerPriceNumber>
              </SharedPickerPriceShower>
              {/* 這邊要放按鈕 */}
              {activeOpState && (
                <ProductPickerOPButtons>
                  <CTAPrimaryButton isRounded={true} margin={"0 0.4rem 0 0"}>
                    直接購買
                  </CTAPrimaryButton>
                  <GhostPrimaryButton isRounded={true}>
                    加入購物車
                  </GhostPrimaryButton>
                </ProductPickerOPButtons>
              )}
              {!activeOpState && (
                <ProductPickerOPButtons>
                  <CTASecondaryButton isRounded={true} margin={"0 0.4rem 0 0"}>
                    直接購買
                  </CTASecondaryButton>
                  <GhostSecondaryButton isRounded={true}>
                    加入購物車
                  </GhostSecondaryButton>
                </ProductPickerOPButtons>
              )}
            </ProductPickerContainer>
            <DetailInfoContainer>
              <DetailInfoTitle>詳細資訊</DetailInfoTitle>
              <DetailInfoDesc>
                這邊會需要提供運費、尺寸、商品材質以及清洗注意事項
              </DetailInfoDesc>
            </DetailInfoContainer>
          </ProductInfoContainer>
        </ProductInfoContainerForPad>
        <WatchedItemsContainer>
          <WatchedItemsTitle>近期看過的商品</WatchedItemsTitle>
          <CardContainer
            items={watchedItems}
            handleLiked={handleUpdateItemLikedState}
            marginLeft={"0"}
          />
        </WatchedItemsContainer>
      </ContentContainer>
      <ProductAddButton onClick={handleProductAdd}>
        選擇商品規格
      </ProductAddButton>
      {mobilePickerState && (
        // 適用於 mobile breakpoint
        <ProductPicker
          picker={picker}
          handleSelectPickerColor={handleSelectPickerColor}
          handleSelectPickerSize={handleSelectPickerSize}
          handleIncreaseQuantity={handleIncreaseQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          activeOpState={activeOpState}
          setMobilePickerState={setMobilePickerState}
          isLiked={isLiked}
          handleAddToLikedItems={handleAddToLikedItems}
        />
      )}
      <Footer marginTop="6rem" marginBottom="4rem" />
    </PageContainer>
  );
}
