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
import { CTAPrimaryButton } from "../../components/button";
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

const ErrorTitle = styled.h1.attrs(() => ({
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

const ErrorContent = styled.h2.attrs(() => ({
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

export default function ErrorPage() {
  // 使用 react history hook 引導頁面
  const history = useHistory();

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <ErrorTitle>發生一點錯誤</ErrorTitle>
        <ErrorContent>目前頁面不可使用或找不到該網址</ErrorContent>
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
        </ButtonContainer>
      </ContentContainer>
      <Footer />
    </PageContainer>
  );
}
