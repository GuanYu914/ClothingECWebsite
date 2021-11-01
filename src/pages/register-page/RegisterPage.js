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
  COLOR_SECONDARY1,
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

const RegisterTitle = styled.h1.attrs(() => ({
  className: "fs-h1 color-secondary3",
}))`
  padding-top: 1rem;
  margin-bottom: 0.5rem;
`;

const RegisterSubTitle = styled.h3.attrs(() => ({
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

export default function RegisterPage() {
  const [form, setForm] = useState([
    {
      id: 1,
      type: "text",
      maxLength: 10,
      field: "暱稱",
      inputValue: "",
      helperColor: COLOR_SECONDARY1,
      helperMsg: "最多 10 個字",
      isValid: false,
    },
    {
      id: 2,
      type: "text",
      maxLength: 12,
      field: "帳號",
      inputValue: "",
      helperColor: COLOR_SECONDARY1,
      helperMsg: "為 8 到 12 位數，由且包含英文大小寫跟數字，且不包括空白鍵",
      isValid: false,
    },
    {
      id: 3,
      type: "password",
      maxLength: 12,
      field: "密碼",
      inputValue: "",
      helperColor: COLOR_SECONDARY1,
      helperMsg: "為 8 到 12 位數，由且包含一位英文大小寫跟數字",
      isValid: false,
    },
    {
      id: 4,
      type: "password",
      maxLength: 12,
      field: "密碼確認",
      inputValue: "",
      helperColor: COLOR_SECONDARY1,
      helperMsg: "請輸入上述密碼一次",
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
      nickname: form.filter((formData) => formData.field === "暱稱")[0]
        .inputValue,
      account: form.filter((formData) => formData.field === "帳號")[0]
        .inputValue,
      password: form.filter((formData) => formData.field === "密碼")[0]
        .inputValue,
      passConfirmation: form.filter(
        (formData) => formData.field === "密碼確認"
      )[0].inputValue,
    };

    checkFieldValidation("暱稱", postData.nickname);
    checkFieldValidation("帳號", postData.account);
    checkFieldValidation("密碼", postData.password);
    checkFieldValidation("密碼確認", postData.passConfirmation);

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

  function checkFieldValidation(fieldName, fieldValue) {
    if (fieldName === "暱稱") {
      if (fieldValue === "") {
        setFieldState("暱稱", "暱稱不能為空", COLOR_PRIMARY2, false);
      } else if (fieldValue.length > 0 && fieldValue.length <= 10) {
        setFieldState("暱稱", "暱稱可以使用", COLOR_PRIMARY3, true);
      } else {
        setFieldState(
          "暱稱",
          "暱稱不得為空，最多為 10 個字",
          COLOR_PRIMARY2,
          false
        );
      }
    }
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
    if (fieldName === "密碼確認") {
      let currentValidPass = form.filter(
        (formData) => formData.field === "密碼"
      )[0].inputValue;
      if (fieldValue === "") {
        setFieldState("密碼確認", "請輸入上述密碼", COLOR_PRIMARY2, false);
      } else if (fieldValue === currentValidPass) {
        setFieldState("密碼確認", "與上述密碼符合", COLOR_PRIMARY3, true);
      } else {
        setFieldState(
          "密碼確認",
          "跟上述密碼不一致，請再試一次",
          COLOR_PRIMARY2,
          false
        );
      }
    }
  }

  function handleFocusOut(fieldName, e) {
    checkFieldValidation(fieldName, e.target.value);
  }

  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <FormForMobile>
          <RegisterTitle>註冊</RegisterTitle>
          <RegisterSubTitle>現在註冊就送 100 元購物金～</RegisterSubTitle>
          <Form
            width={"100%"}
            formState={form}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleFocusOut={handleFocusOut}
            useForRegister={true}
          />
        </FormForMobile>
        <FormForPad>
          <BrandInfo>
            <BrandName>懶人購物網站</BrandName>
            <BrandSlogan>線上一點，送貨到家</BrandSlogan>
            <RegisterSubTitle>現在註冊就送 100 元購物金～</RegisterSubTitle>
          </BrandInfo>
          <Form
            formState={form}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleFocusOut={handleFocusOut}
            useForRegister={true}
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
