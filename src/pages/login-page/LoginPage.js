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
      isValid: false,
    },
    {
      id: 2,
      type: "password",
      maxLength: 12,
      field: "密碼",
      inputValue: "",
      isValid: false,
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

  function handleSubmit() {
    // check all field's validation state
    let postData = {
      account: form.filter((formData) => formData.field === "帳號")[0]
        .inputValue,
      password: form.filter((formData) => formData.field === "密碼")[0]
        .inputValue,
    };

    checkFieldValidation("帳號", postData.account);
    checkFieldValidation("密碼", postData.password);

    let allValidationState = form.map((formData) => formData.isValid);
    let isValidPostData = false;
    for (let i = 0; i < allValidationState.length; i++) {
      if (!allValidationState[i]) {
        isValidPostData = false;
        break;
      }
      isValidPostData = true;
    }

    if (isValidPostData) {
      console.log("送出", postData);
    } else {
      console.log("資料有誤");
    }
  }

  function handleFocusOut(fieldName, e) {
    checkFieldValidation(fieldName, e.target.value);
  }

  function setFieldState(fieldName, helperMsg, helperColor, validationState) {
    // 防止多次呼叫造成 state 資料被 overwrite
    setForm((prevForm) => {
      return prevForm.map((formData) =>
        formData.field === fieldName
          ? {
              ...formData,
              helperMsg,
              helperColor,
              isValid: validationState,
            }
          : { ...formData }
      );
    });
  }
  // form field validation
  function checkFieldValidation(fieldName, fieldValue) {
    if (fieldName === "帳號") {
      if (fieldValue === "") {
        setFieldState("帳號", "帳號不得為空", COLOR_PRIMARY2, false);
      } else if (
        fieldValue.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[ ]).{8,12}/g) !==
        null
      ) {
        setFieldState("帳號", "此帳號可以使用", COLOR_PRIMARY3, true);
      } else {
        setFieldState(
          "帳號",
          "為 8-12 位數，由且包含一位英文大小寫跟數字組成，不得包含空白鍵",
          COLOR_PRIMARY2,
          false
        );
      }
    }
    if (fieldName === "密碼") {
      if (fieldValue === "") {
        setFieldState("密碼", "密碼不得為空", COLOR_PRIMARY2, false);
      } else if (
        fieldValue.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/g) !== null
      ) {
        setFieldState("密碼", "密碼可以使用", COLOR_PRIMARY3, true);
      } else {
        setFieldState(
          "密碼",
          "為 8-12 位數，由且包含一位英文大小寫跟數字",
          COLOR_PRIMARY2,
          false
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
