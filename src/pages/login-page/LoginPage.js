import Header from "../../components/header";
import Footer from "../../components/footer";
import styled from "styled-components/macro";
import { useState } from "react";
import Form from "../../components/form";
import {
  BG_SECONDARY3,
  BREAKPOINT_LAPTOP,
  BREAKPOINT_MOBILE,
  BREAKPOINT_PAD,
  COLOR_PRIMARY1,
  COLOR_PRIMARY2,
  COLOR_PRIMARY3,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
  MAX_CONTAINER_WIDTH,
} from "../../constant";
import { useEffect } from "react";

const PageContainer = styled.div.attrs(() => ({
  className: "bg-primary1",
}))``;
const ContentContainer = styled.div`
  // 設定容器最大寬度
  max-width: ${MAX_CONTAINER_WIDTH};
  margin-left: auto;
  margin-right: auto;
  padding: 4rem 1rem 4rem;

  // 從頁面頂端開始計算 Header Component 目前的高度，並從這當作起點開始 render
  ${BREAKPOINT_MOBILE} {
    margin-top: ${HEADER_HEIGHT_MOBILE};
  }

  ${BREAKPOINT_PAD} {
    margin-top: ${HEADER_HEIGHT_PAD};
  }
`;

const LoginTitle = styled.h1.attrs(() => ({
  className: "fs-h1 color-secondary3",
}))`
  padding-top: 1rem;
  margin-bottom: 0.5rem;
`;

const LoginSubTitle = styled.h3.attrs(() => ({
  className: "fs-h3 color-secondary3",
}))`
  margin-bottom: 1rem;
`;

const FormForMobile = styled.div`
  display: block;

  ${BREAKPOINT_MOBILE} {
    display: block;
  }
  ${BREAKPOINT_PAD} {
    display: none;
  }
`;

const FormForPad = styled.div`
  display: none;

  ${BREAKPOINT_MOBILE} {
    display: none;
  }
  ${BREAKPOINT_PAD} {
    width: 46rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  ${BREAKPOINT_LAPTOP} {
    width: 52rem;
  }
`;

const BrandInfo = styled.div``;
const BrandName = styled.h1.attrs(() => ({
  className: "fs-h1 color-secondary3",
}))``;

const BrandSlogan = styled.h2.attrs(() => ({
  className: "fs-h2 color-secondary3",
}))`
  margin-bottom: 2rem;
`;

export default function LoginPage() {
  const [form, setForm] = useState([
    {
      id: 1,
      type: "text",
      maxLength: 12,
      field: "帳號",
      inputValue: "",
    },
    {
      id: 2,
      type: "password",
      maxLength: 12,
      field: "密碼",
      inputValue: "",
    },
  ]);

  useEffect(() => {
    console.log(form);
  }, [form]);

  function handleInputChange(id, e) {
    setForm(
      form.map((formData) =>
        formData.id === id
          ? { ...formData, inputValue: e.target.value }
          : { ...formData }
      )
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    // 拿到帳號跟密碼的 inputValue
    let postData = form.map((data) => data.inputValue);
    // call api 送出 postData
    console.log("送出");
  }

  function handleFocusOut(fieldName, e) {
    const inputValue = e.target.value;
    if (fieldName === "帳號") {
      if (inputValue === "") {
        setForm(
          form.map((formData) =>
            formData.field === "帳號"
              ? {
                  ...formData,
                  helperMsg: "帳號不得為空",
                  helperColor: COLOR_PRIMARY2,
                }
              : { ...formData }
          )
        );
      } else if (
        inputValue.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[ ]).{8,20}/g) !==
        null
      ) {
        setForm(
          form.map((formData) =>
            formData.field === "帳號"
              ? {
                  ...formData,
                  helperMsg: "此帳號可以使用",
                  helperColor: COLOR_PRIMARY3,
                }
              : { ...formData }
          )
        );
        return;
      } else {
        setForm(
          form.map((formData) =>
            formData.field === "帳號"
              ? {
                  ...formData,
                  helperMsg:
                    "至少 8 位數，由且包含一位英文大小寫跟數字組成，不得包含空白鍵",
                  helperColor: COLOR_PRIMARY2,
                }
              : { ...formData }
          )
        );
      }
    }
    if (fieldName === "密碼") {
      if (e.target.value === "") {
        setForm(
          form.map((formData) =>
            formData.field === "密碼"
              ? {
                  ...formData,
                  helperMsg: "密碼不得為空",
                  helperColor: COLOR_PRIMARY2,
                }
              : { ...formData }
          )
        );
      } else if (
        inputValue.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/g) !== null
      ) {
        setForm(
          form.map((formData) =>
            formData.field === "密碼"
              ? {
                  ...formData,
                  helperMsg: "此密碼可以使用",
                  helperColor: COLOR_PRIMARY3,
                }
              : { ...formData }
          )
        );
      } else {
        setForm(
          form.map((formData) =>
            formData.field === "密碼"
              ? {
                  ...formData,
                  helperMsg: "至少 8 位數，由且包含一位英文大小寫跟數字",
                  helperColor: COLOR_PRIMARY2,
                }
              : { ...formData }
          )
        );
      }
    }
  }

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <FormForMobile>
          <LoginTitle>登入</LoginTitle>
          <LoginSubTitle>您好，歡迎再次回來</LoginSubTitle>
          <Form
            width={"100%"}
            formState={form}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleFocusOut={handleFocusOut}
            useForLogin={true}
          />
        </FormForMobile>
        <FormForPad>
          <BrandInfo>
            <BrandName>懶人購物網站</BrandName>
            <BrandSlogan>線上一點，送貨到家</BrandSlogan>
            <LoginSubTitle>您好，歡迎再次回來</LoginSubTitle>
          </BrandInfo>
          <Form
            formState={form}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleFocusOut={handleFocusOut}
            useForLogin={true}
          />
        </FormForPad>
      </ContentContainer>
      <Footer
        marginTop={"0"}
        bgColor={BG_SECONDARY3}
        iconColor={COLOR_PRIMARY1}
      />
    </PageContainer>
  );
}
