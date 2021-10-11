import Header from "../../components/header";
import Footer from "../../components/footer";
import {
  BREAKPOINT_MOBILE,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
} from "../../constant";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ReactComponent as heart } from "../../imgs/pages/home-page/hot-selling-item/heart.svg";
import { ReactComponent as heartFilled } from "../../imgs/pages/home-page/hot-selling-item/heart-fill.svg";
import BSCarousel from "../../components/bs-carousel/BSCarousel";
import {
  CategoryBlock,
  CategoryTitle,
  CategoriesContainer,
  Category,
} from "./styled-category";
import {
  HotSellingItemBlock,
  HotSellingItemTitle,
  HotSellingItemsContainer,
  HotSellingItem,
  HotSellingItemInfo,
  HotSellingItemHeader,
  HotSellingItemName,
  HotSellingItemPrice,
} from "./styled-hot-selling-item";
import {
  UserCommentBlock,
  UserCommentTitle,
  UserCommentsContainer,
  UserComment,
  UserAvatar,
} from "./styled-user-comment";
import { BREAKPOINT_PAD, MAX_CONTAINER_WIDTH } from "../../constant";

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

const FavoriteIcon = styled(heart)`
  width: 1.4rem;
  height: 1.4rem;
`;

const FavoriteFilledIcon = styled(heartFilled)`
  width: 1.4rem;
  height: 1.4rem;
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

export default function HomePage() {
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    const slideStyle = {};
    setSlides([
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
  }, []);

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
            <HotSellingItem>
              <HotSellingItemInfo>
                <HotSellingItemHeader>
                  <HotSellingItemName>長版針織衣</HotSellingItemName>
                  <FavoriteIcon />
                </HotSellingItemHeader>
                <HotSellingItemPrice>NTD 489</HotSellingItemPrice>
              </HotSellingItemInfo>
            </HotSellingItem>
            <HotSellingItem>
              <HotSellingItemInfo>
                <HotSellingItemHeader>
                  <HotSellingItemName>短版刺繡上衣</HotSellingItemName>
                  <FavoriteFilledIcon />
                </HotSellingItemHeader>
                <HotSellingItemPrice>NTD 329</HotSellingItemPrice>
              </HotSellingItemInfo>
            </HotSellingItem>
            <HotSellingItem>
              <HotSellingItemInfo>
                <HotSellingItemHeader>
                  <HotSellingItemName>涼感襯衫</HotSellingItemName>
                  <FavoriteFilledIcon />
                </HotSellingItemHeader>
                <HotSellingItemPrice>NTD 269</HotSellingItemPrice>
              </HotSellingItemInfo>
            </HotSellingItem>
            <HotSellingItem>
              <HotSellingItemInfo>
                <HotSellingItemHeader>
                  <HotSellingItemName>牛仔短褲</HotSellingItemName>
                  <FavoriteFilledIcon />
                </HotSellingItemHeader>
                <HotSellingItemPrice>NTD 799</HotSellingItemPrice>
              </HotSellingItemInfo>
            </HotSellingItem>
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
