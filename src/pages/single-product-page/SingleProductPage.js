import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import styled from "styled-components";
import BSCarousel from "../../components/bs-carousel/BSCarousel";
import { useEffect, useState } from "react";
import { ReactComponent as heart } from "../../imgs/pages/single-product-page/heart.svg";
import { ReactComponent as heartFilled } from "../../imgs/pages/single-product-page/heart-fill.svg";
import {
  BREAKPOINT_MOBILE,
  BREAKPOINT_LAPTOP,
  BREAKPOINT_PAD,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
  MAX_CONTAINER_WIDTH,
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
  // 根據不同裝置寬度預設跟 Header 保持 margin-top: 1rem
  ${BREAKPOINT_MOBILE} {
    margin-top: calc(${HEADER_HEIGHT_MOBILE} + 1rem);
  }

  ${BREAKPOINT_PAD} {
    margin-top: calc(${HEADER_HEIGHT_PAD} + 1rem);
  }
`;

const ProductInfoContainer = styled.div`
  margin-top: 1rem;
`;

const ProductInfoHeader = styled.div`
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

const ProductBody = styled.div`
  margin-top: 3rem;
`;

const BodyTitle = styled.h2.attrs(() => ({
  className: "fs-h2 color-secondary2",
}))``;

const BodyContent = styled.h3.attrs(() => ({
  className: "fs-h3 color-secondary2",
}))`
  margin-top: 1rem;
`;

const PickerContainer = styled.div`
  width: 100%;
  height: 4.8rem;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const AddToBag = styled.div.attrs(() => ({
  className: "color-primary1 br-primary1 bg-secondary3",
}))`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-style: solid;
  border-width: 0.4rem;
`;

const Purchase = styled.div.attrs(() => ({
  className: "color-secondary3 bg-primary1",
}))`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const PickerActionName = styled.h2.attrs(() => ({
  className: "fs-h2",
}))``;

function Picker() {
  return (
    <PickerContainer>
      <AddToBag>
        <PickerActionName>加入購物車</PickerActionName>
      </AddToBag>
      <Purchase>
        <PickerActionName>直接購買</PickerActionName>
      </Purchase>
    </PickerContainer>
  );
}

export default function SingleProductPage() {
  const [slides, setSlides] = useState([]);
  const slideStyle = {
    maxHeight: "22rem",
    borderRadius: "2rem",
  };
  useEffect(() => {
    setSlides([
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
  }, []);

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <ProductCategoryPath>
          首頁 &gt; 分類 &gt; 女裝 &gt; 秋冬款
        </ProductCategoryPath>
        <ProductInfoContainer>
          <BSCarousel slides={slides} />
          <ProductInfoHeader>
            <ProductName>女版襯衫</ProductName>
            <FavoriteIcon />
          </ProductInfoHeader>
          <ProductBody>
            <BodyTitle>詳細資訊</BodyTitle>
            <BodyContent>
              這邊會需要提供運費、尺寸、商品材質以及清洗注意事項
            </BodyContent>
          </ProductBody>
        </ProductInfoContainer>
      </ContentContainer>
      <Picker />
      <Footer marginTop="6rem" marginBottom="4.8rem" />
    </PageContainer>
  );
}
