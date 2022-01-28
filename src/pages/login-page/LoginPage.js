import Header from "../../components/header";
import Footer from "../../components/footer";
import styled from "styled-components";
import { useState } from "react";
import Form from "../../components/form";
import {
  BG_SECONDARY3,
  BREAKPOINT_LAPTOP,
  BREAKPOINT_MOBILE,
  BREAKPOINT_PAD,
  COLOR_PRIMARY2,
  COLOR_PRIMARY3,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
  MAX_CONTAINER_WIDTH,
  COLOR_SECONDARY3,
  BG_PRIMARY1,
  API_RESP_FAILED_MSG,
  API_RESP_USER_NOT_FOUND_MSG,
  API_RESP_SUCCESSFUL_MSG,
  API_RESP_REQ_REJECT_ERR_MSG,
} from "../../constant";
import { useHistory } from "react-router-dom";
import Modal from "../../components/modal";
import { sendUserLoginDataApi } from "../../Webapi";

const PageContainer = styled.div`
  background-color: ${BG_PRIMARY1};
`;
const ContentContainer = styled.main`
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
  className: "fs-h1",
}))`
  color: ${COLOR_SECONDARY3};
  padding-top: 1rem;
  margin-bottom: 0.5rem;
`;

const LoginSubTitle = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY3};
  margin-bottom: 1rem;
`;

const FormForMobile = styled.section`
  display: block;

  ${BREAKPOINT_MOBILE} {
    display: block;
  }
  ${BREAKPOINT_PAD} {
    display: none;
  }
`;

const FormForPad = styled.section`
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

const BrandInfo = styled.section``;
const BrandName = styled.h1.attrs(() => ({
  className: "fs-h1",
}))`
  color: ${COLOR_SECONDARY3};
`;

const BrandSlogan = styled.h2.attrs(() => ({
  className: "fs-h2",
}))`
  color: ${COLOR_SECONDARY3};
  margin-bottom: 2rem;
`;

export default function LoginPage() {
  const history = useHistory();
  // 表單欄位狀態資訊
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
  // 是否要顯示登入失敗 modal 提示訊息
  const [showModalForLoginFailed, setShowModalForLoginFailed] = useState(false);
  // 登入失敗 modal 提示資訊
  const [modalInfoForLoginFailed] = useState({
    selectionMode: false,
    title: "帳號或密碼有誤",
    content: "請更換其中一項並再試一次",
  });
  // 是否要顯示登入成功 modal 提示訊息
  const [showModalForLoginSuccessfully, setShowModalForLoginSuccessfully] =
    useState(false);
  // 登入成功 modal 提示資訊
  const [modalInfoForLoginSuccessfully] = useState({
    selectionMode: false,
    title: "登入成功",
    content: "關閉後將自動登入，並返回首頁",
  });
  // 是否要顯示 api 錯誤 modal 提示訊息
  const [showModalForApiError, setShowModalForApiError] = useState(false);
  // api 錯誤 modal 提示資訊
  const [modalInfoForApiError] = useState({
    selectionMode: false,
    title: "發生一點小錯誤",
    content: "由於伺服器或網路異常，請稍後再試一次",
  });

  // 處理輸入框改變事件
  function handleInputChange(id, e) {
    setForm(
      form.map((formData) =>
        formData.id === id
          ? { ...formData, inputValue: e.target.value }
          : { ...formData }
      )
    );
  }
  // 處理登入按鈕，送出資料事件
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
      sendUserLoginDataFromApi(postData.account, postData.password);
    }
  }
  // 當用戶切換到其他欄位觸發事件
  function handleFocusOut(fieldName, e) {
    checkFieldValidation(fieldName, e.target.value);
  }
  // 更新 form 狀態，並傳入 function 拿到最新的 state，防止被 batch
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
  // 檢查每個欄位的資料，有符合條件才給過
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
  // 送出登入資料到後端 API
  function sendUserLoginDataFromApi(account, password) {
    sendUserLoginDataApi(account, password)
      .then((resp) => {
        const json_data = resp.data;
        if (json_data.isSuccessful === API_RESP_FAILED_MSG) {
          if (json_data.msg === API_RESP_USER_NOT_FOUND_MSG) {
            setShowModalForLoginFailed(true);
            return;
          }
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === API_RESP_SUCCESSFUL_MSG) {
          setShowModalForLoginSuccessfully(true);
        }
      })
      .catch((e) => {
        console.log(API_RESP_REQ_REJECT_ERR_MSG, e);
        setShowModalForApiError(true);
      });
  }
  // modal 顯示情境: 登入失敗
  // 處理點選按鈕事件
  function handleSubmitOpForLoginFailed() {
    setShowModalForLoginFailed(false);
  }
  // modal顯示情境: 登入失敗
  // 處理點選按鈕之外事件
  function handleCancelOpForLoginFailed() {
    setShowModalForLoginFailed(false);
  }
  // modal 顯示情境: 登入成功
  // 處理點選按鈕事件
  function handleSubmitOpForLoginSuccessfully() {
    setShowModalForLoginSuccessfully(false);
    history.push("/");
  }
  // modal 顯示情漸: 登入成功
  // 處理點選按鈕以外事件
  function handleCancelOpForLoginSuccessfully() {
    setShowModalForLoginSuccessfully(false);
    history.push("/");
  }
  // modal 顯示情境: 發送 API 過程有異常
  // 處理點選按鈕事件
  function handleSubmitOpForApiError() {
    setShowModalForApiError(false);
  }
  // modal 顯示情境: 發送 API 過程中有異常
  // 處理點選按鈕以外事件
  function handleCancelOpForApiError() {
    setShowModalForApiError(false);
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
        {showModalForLoginFailed && (
          <Modal
            modalInfo={modalInfoForLoginFailed}
            handleSubmitOp={handleSubmitOpForLoginFailed}
            handleCancelOp={handleCancelOpForLoginFailed}
          />
        )}
        {showModalForLoginSuccessfully && (
          <Modal
            modalInfo={modalInfoForLoginSuccessfully}
            handleSubmitOp={handleSubmitOpForLoginSuccessfully}
            handleCancelOp={handleCancelOpForLoginSuccessfully}
          />
        )}
        {showModalForApiError && (
          <Modal
            modalInfo={modalInfoForApiError}
            handleSubmitOp={handleSubmitOpForApiError}
            handleCancelOp={handleCancelOpForApiError}
          />
        )}
      </ContentContainer>
      <Footer marginTop={"0"} bgColor={BG_SECONDARY3} />
    </PageContainer>
  );
}
