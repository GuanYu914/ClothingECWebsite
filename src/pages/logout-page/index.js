import styled from "styled-components";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {
  MAX_CONTAINER_WIDTH,
  BREAKPOINT_MOBILE,
  HEADER_HEIGHT_MOBILE,
  BREAKPOINT_PAD,
  HEADER_HEIGHT_PAD,
  COLOR_SECONDARY2,
  BG_SECONDARY4,
  BG_PRIMARY1,
} from "../../constant";
import { CTAPrimaryButton, GhostPrimaryButton } from "../../components/button";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { logoutUser } from "../../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { getCart } from "../../redux/reducers/cartSlice";
import { getFavoriteItems } from "../../redux/reducers/FavoriteItemsSlice";

const PageContainer = styled.div`
  background-color: ${BG_SECONDARY4};
`;
const ContentContainer = styled.main`
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

const LogoutTitle = styled.h1.attrs(() => ({
  className: "fs-h1",
}))`
  color: ${COLOR_SECONDARY2};
  text-align: center;
  padding-top: 2rem;

  // 根據不同裝置寬度預設跟 Header 保持 margin-top: 0
  ${BREAKPOINT_MOBILE} {
    margin-top: calc(${HEADER_HEIGHT_MOBILE});
  }

  ${BREAKPOINT_PAD} {
    margin-top: calc(${HEADER_HEIGHT_PAD});
  }
`;

const LogoutContent = styled.h2.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY2};
  margin-top: 2rem;
  text-align: center;
`;

const ButtonContainer = styled.section`
  display: flex;
  justify-content: center;
`;

export default function LogoutPage() {
  // 使用 react history hook 引導頁面
  const history = useHistory();
  // 產生 dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
    dispatch(getFavoriteItems());
    dispatch(getCart());
  }, []);

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <LogoutTitle>您已登出</LogoutTitle>
        <LogoutContent>您可以點擊按鈕返回首頁，或登入其他帳號</LogoutContent>
        <ButtonContainer>
          <CTAPrimaryButton
            margin={"1rem 0.5rem"}
            isRounded={true}
            onClick={() => {
              history.push("/");
            }}
          >
            返回首頁
          </CTAPrimaryButton>
          <GhostPrimaryButton
            margin={"1rem 0.5rem"}
            isRounded={true}
            onClick={() => {
              history.push("/login");
            }}
          >
            登入
          </GhostPrimaryButton>
        </ButtonContainer>
      </ContentContainer>
      <Footer bgColor={BG_PRIMARY1} />
    </PageContainer>
  );
}
