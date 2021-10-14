import Header from "../../components/header";
import Footer from "../../components/footer";
import {
  BREAKPOINT_MOBILE,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
} from "../../constant";
import styled from "styled-components";
import { useState } from "react";
import BSCarousel from "../../components/bs-carousel/BSCarousel";
import {
  CategoryBlock,
  CategoryTitle,
  CategoriesContainer,
  Category,
} from "./styled-category";

import {
  UserCommentBlock,
  UserCommentTitle,
  UserCommentsContainer,
  UserComment,
  UserAvatar,
} from "./styled-user-comment";
import { BREAKPOINT_PAD, MAX_CONTAINER_WIDTH } from "../../constant";
import CardContainer from "../../components/card-container";

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

const LoadMoreButton = styled.div.attrs(() => ({
  className: "fs-h2 bg-secondary1 color-secondary3",
}))`
  // 文字水平垂直置中
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.4rem;
  width: 8.6rem;
  height: 3.2rem;
  margin: 3rem auto 0;
  cursor: pointer;

  ${BREAKPOINT_PAD} {
    width: 10.6rem;
    height: 3.6rem;
  }
`;

const HotSellingItemBlock = styled.div`
  margin-top: 5rem;

  ${BREAKPOINT_PAD} {
    margin-top: 10rem;
  }
`;

const HotSellingItemTitle = styled.h1.attrs(() => ({
  className: "fs-h1",
}))`
  text-align: center;
`;

const HotSellingItemsContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  max-width: ${MAX_CONTAINER_WIDTH};
`;

export default function HomePage() {
  const slideStyle = {};
  const [slides, setSlides] = useState([
    {
      id: 1,
      src: "https://i.imgur.com/wHozlKZ.jpg",
      alt: "banner1",
      style: slideStyle,
    },
    {
      id: 2,
      src: "https://i.imgur.com/Eyg3mUD.jpg",
      alt: "banner2",
      style: slideStyle,
    },
    {
      id: 3,
      src: "https://i.imgur.com/RVnJagG.jpg",
      alt: "banner3",
      style: slideStyle,
    },
  ]);
  // 使用假資料
  const [hotItems, SetHotItems] = useState([
    {
      id: 1,
      product: { name: "針織上衣", price: "599" },
      isLiked: false,
    },
    {
      id: 2,
      product: { name: "短版 T-Shirt", price: "389" },
      isLiked: true,
    },
    {
      id: 3,
      product: { name: "古著髮帶", price: "189" },
      isLiked: false,
    },
  ]);

  // 更新 hotItems 裡面物件的 isLiked 屬性
  function handleUpdateItemLikedState(id) {
    SetHotItems(
      hotItems.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : { ...item }
      )
    );
  }

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <BSCarousel slides={slides} />
        <CategoryBlock>
          <CategoryTitle>商品分類</CategoryTitle>
          <CategoriesContainer>
            <Category>男裝</Category>
            <Category>女裝</Category>
            <Category>小孩</Category>
            <Category>飾品</Category>
            <Category>鞋子</Category>
            <Category>包包</Category>
          </CategoriesContainer>
        </CategoryBlock>
        <HotSellingItemBlock>
          <HotSellingItemTitle>熱賣品項</HotSellingItemTitle>
          <HotSellingItemsContainer>
            <CardContainer
              items={hotItems}
              horizontalAlign={"center"}
              handleLiked={handleUpdateItemLikedState}
            />
          </HotSellingItemsContainer>
          <LoadMoreButton>載入更多</LoadMoreButton>
        </HotSellingItemBlock>
        <UserCommentBlock>
          <UserCommentTitle>顧客評價</UserCommentTitle>
          <UserCommentsContainer>
            <UserComment>
              “ 衣服品質真的不錯，已加入下次購物清單 “<UserAvatar></UserAvatar>
            </UserComment>
            <UserComment>
              “ 衣服品質真的不錯，已加入下次購物清單 “<UserAvatar></UserAvatar>
            </UserComment>
            <UserComment>
              “ 衣服品質真的不錯，已加入下次購物清單 “<UserAvatar></UserAvatar>
            </UserComment>
            <UserComment>
              “ 衣服品質真的不錯，已加入下次購物清單 “<UserAvatar></UserAvatar>
            </UserComment>
          </UserCommentsContainer>
          <LoadMoreButton>載入更多</LoadMoreButton>
        </UserCommentBlock>
      </ContentContainer>
      <Footer marginTop={"6rem"} />
    </PageContainer>
  );
}
