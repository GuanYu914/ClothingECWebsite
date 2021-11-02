import styled from "styled-components/macro";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {
  BREAKPOINT_MOBILE,
  BREAKPOINT_PAD,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
  MAX_CONTAINER_WIDTH,
} from "../../constant";
import CardContainer from "../../components/card-container";
import { useState } from "react";

const PageContainer = styled.div``;
const ContentContainer = styled.div`
  // 設定容器最大寬度
  max-width: ${MAX_CONTAINER_WIDTH};
  margin-left: auto;
  margin-right: auto;

  // 從頁面頂端計算 Header Component 目前的高度，並從這當作起點開始 render
  ${BREAKPOINT_MOBILE} {
    margin-top: ${HEADER_HEIGHT_MOBILE};
  }

  ${BREAKPOINT_PAD} {
    margin-top: ${HEADER_HEIGHT_PAD};
  }
`;

const PageTitle = styled.h1.attrs(() => ({
  className: "fs-h1 color-secondary2",
}))`
  margin-left: 1rem;
  margin-bottom: 2rem;

  ${BREAKPOINT_MOBILE} {
    margin-top: calc(${HEADER_HEIGHT_MOBILE} + 1rem);
  }

  ${BREAKPOINT_PAD} {
    margin-top: calc(${HEADER_HEIGHT_PAD} + 1rem);
  }
`;

export default function FavoritePage() {
  const [items, setItems] = useState([
    {
      id: 1,
      product: {
        name: "修身寬褲",
        price: "499",
      },
      isLiked: true,
    },
    {
      id: 2,
      product: {
        name: "短版針織罩衫",
        price: "699",
      },
      isLiked: true,
    },
    {
      id: 3,
      product: {
        name: "短版西裝外套",
        price: "1299",
      },
      isLiked: true,
    },
    {
      id: 4,
      product: {
        name: "針織洋裝",
        price: "699",
      },
      isLiked: true,
    },
  ]);

  function handleLiked(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : { ...item }
      )
    );
  }
  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <PageTitle>收藏清單</PageTitle>
        <CardContainer items={items} handleLiked={handleLiked}></CardContainer>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
}
