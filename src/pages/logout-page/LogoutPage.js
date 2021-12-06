import styled from "styled-components/macro";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {
  MAX_CONTAINER_WIDTH,
  BREAKPOINT_MOBILE,
  HEADER_HEIGHT_MOBILE,
  BREAKPOINT_PAD,
  HEADER_HEIGHT_PAD,
  COLOR_SECONDARY2,
} from "../../constant";
import { CTAPrimaryButton, GhostPrimaryButton } from "../../components/button";
import Loader from "../../components/loader";
import Modal from "../../components/modal";
import {
  FavoriteItemsContext,
  UserContext,
  WatchedProductsContext,
} from "../../context";
import { useContext, useEffect, useState } from "react";
import { LogoutApi } from "../../Webapi";
import { useHistory } from "react-router";

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

const LogoutTitle = styled.h1.attrs(() => ({
  className: "fs-h1",
}))`
  color: ${COLOR_SECONDARY2};
  text-align: center;

  ${BREAKPOINT_MOBILE} {
    margin-top: calc(${HEADER_HEIGHT_MOBILE} + 1rem);
  }

  ${BREAKPOINT_PAD} {
    margin-top: calc(${HEADER_HEIGHT_PAD} + 1rem);
  }
`;

const LogoutContent = styled.h2.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY2};
  margin-top: 2rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default function LogoutPage() {
  // 使用 react history hook 引導頁面
  const history = useHistory();
  // 從 UserContext 拿到用戶的 setter function
  const { setUser } = useContext(UserContext);
  // 透過 FavoriteItemsContext 拿到用戶收藏清單的 setter function
  const { setFavoriteItems } = useContext(FavoriteItemsContext);
  // 透過 WatchedProductsContext 拿到產品觀看紀錄清單跟 setter function
  const { setWatchedProducts } = useContext(WatchedProductsContext);
  // 頁面讀取狀態
  const [isLoading, setIsLoading] = useState(true);
  // 是否顯示 api error 的 modal
  const [showModalForApiError, setShowModalForApiError] = useState(false);
  // 顯示 api error 的 modal 資訊
  const [modalInfoForApiError] = useState({
    selectionMode: false,
    title: "發生一點小錯誤",
    content: "由於伺服器或網路異常，請稍後再試一次",
  });

  // modal 情境: 發送 api 過程中有誤
  // 處理點選按鈕的事件
  function handleSubmitOpForApiError() {
    setShowModalForApiError(false);
  }
  // modal 情境: 發送 api 過程中有誤
  // 處理點選按鈕以外的事件
  function handleCancelOpForApiError() {
    setShowModalForApiError(false);
  }

  // 第一次 render 結束
  useEffect(() => {
    LogoutApi()
      .then((resp) => {
        const json_data = resp.data;
        if (json_data.isSuccessful === "failed") {
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === "successful") {
          setIsLoading(false);
          // 重設所有 Context 狀態
          setFavoriteItems([]);
          setWatchedProducts([]);
          setUser(null);
        }
      })
      .catch((e) => {
        console.log(
          "some errors were happened when setting data from api, error is ",
          e
        );
        setShowModalForApiError(true);
      });
  }, []);

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <LogoutTitle>您已登出</LogoutTitle>
            <LogoutContent>
              您可以點擊按鈕返回首頁，或登入其他帳號
            </LogoutContent>
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
          </>
        )}
        {showModalForApiError && (
          <Modal
            modalInfo={modalInfoForApiError}
            handleSubmitOp={handleSubmitOpForApiError}
            handleCancelOp={handleCancelOpForApiError}
          />
        )}
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
}
