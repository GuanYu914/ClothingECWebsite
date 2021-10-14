import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styled from "styled-components";
import BSCarousel from "../../components/bs-carousel/BSCarousel";
import CardContainer from "../../components/card-container";
import ProductPicker from "./styled-product-picker";
import { useState } from "react";
import { ReactComponent as heart } from "../../imgs/pages/single-product-page/heart.svg";
import { ReactComponent as heartFilled } from "../../imgs/pages/single-product-page/heart-fill.svg";
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

const ProductInfoContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
`;

export default function SingleProductPage() {
  const slideStyle = {
    maxHeight: "22rem",
    borderRadius: "2rem",
  };
  const [slides, setSlides] = useState([
    {
      id: 1,
      src: "https://i.imgur.com/C7SYk0P.jpg",
      alt: "product_pic",
      style: slideStyle,
    },
    {
      id: 2,
      src: "https://i.imgur.com/Dfav1Yk.jpg",
      alt: "product_pic",
      style: slideStyle,
    },
  ]);
  const [pickerEnable, setPickerEnable] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
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

  function handleProductAdd() {
    // 叫出 offcanva picker
    setPickerEnable(true);
  }

  function handleAddToLikedItems() {
    setIsLiked(!isLiked);
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
        <BSCarousel slides={slides} />
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
      {pickerEnable && (
        <ProductPicker
          setPickerEnable={setPickerEnable}
          isLiked={isLiked}
          handleAddToLikedItems={handleAddToLikedItems}
        />
      )}
      <Footer marginTop="6rem" marginBottom="4rem" />
    </PageContainer>
  );
}
