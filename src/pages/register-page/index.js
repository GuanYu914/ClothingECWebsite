import Header from "../../components/header";
import Footer from "../../components/footer";
import styled from "styled-components";
import { useState } from "react";
import Form from "../../components/form";
import {
  API_RESP_FAILED_MSG,
  API_RESP_NOT_ALLOW_TO_REGISTER_SAME_ACCOUNT,
  API_RESP_REQ_REJECT_ERR_MSG,
  API_RESP_SUCCESSFUL_MSG,
  BG_PRIMARY1,
  BG_SECONDARY3,
  BREAKPOINT_LAPTOP,
  BREAKPOINT_MOBILE,
  BREAKPOINT_PAD,
  COLOR_PRIMARY2,
  COLOR_PRIMARY3,
  COLOR_SECONDARY1,
  COLOR_SECONDARY3,
  HEADER_HEIGHT_MOBILE,
  HEADER_HEIGHT_PAD,
  MAX_CONTAINER_WIDTH,
} from "../../constant";
import Modal from "../../components/modal";
import { sendUserRegisterDataApi, getSessionDataApi } from "../../Webapi";
import { useHistory } from "react-router-dom";

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

const RegisterTitle = styled.h1.attrs(() => ({
  className: "fs-h1",
}))`
  color: ${COLOR_SECONDARY3};
  padding-top: 1rem;
  margin-bottom: 0.5rem;
`;

const RegisterSubTitle = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY3};
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

export default function RegisterPage() {
  // 透過 history hook 換頁
  const history = useHistory();
  // 表單欄位狀態資訊
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
  // 是否要顯示相同帳號 modal 提示訊息
  const [showModalForSameAccount, setShowModalForSameAccount] = useState(false);
  // 資料庫有相同帳號存在時的 modal 提示資訊
  const [modalInfoForSameAccount] = useState({
    selectionMode: false,
    title: "帳戶已被使用囉",
    content: "麻煩您換組帳號試試看",
  });
  // 是否要顯示註冊成功 modal 提示訊息
  const [
    showModalForRegisterSuccessfully,
    setShowModalForRegisterSuccessfully,
  ] = useState(false);
  // 註冊成功 modal 提示資訊
  const [modalInfoForRegisterSuccessfully] = useState({
    selectionMode: false,
    title: "註冊成功囉",
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
  // 處理註冊按鈕，送出資料事件
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
      sendUserRegisterDataFromApi(
        postData.nickname,
        postData.account,
        postData.password
      );
    }
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
  // 檢查每個輸入欄位的資料，有符合條件才給過
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
  // 當用戶切換到其他欄位的觸發事件
  function handleFocusOut(fieldName, e) {
    checkFieldValidation(fieldName, e.target.value);
  }
  // 送出用戶的資訊到後端 API
  function sendUserRegisterDataFromApi(nickname, account, password) {
    sendUserRegisterDataApi(nickname, account, password)
      .then((resp) => {
        const json_data = resp.data;
        if (json_data.isSuccessful === API_RESP_FAILED_MSG) {
          if (json_data.msg === API_RESP_NOT_ALLOW_TO_REGISTER_SAME_ACCOUNT) {
            setShowModalForSameAccount(true);
            return;
          }
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === API_RESP_SUCCESSFUL_MSG) {
          setShowModalForRegisterSuccessfully(true);
        }
      })
      .catch((e) => {
        console.log(API_RESP_REQ_REJECT_ERR_MSG, e);
        setShowModalForApiError(true);
      });
  }
  // modal 顯示情境: 資料庫有相同帳號
  // 處理點選按鈕的事件
  function handleSubmitOpForSameAccount() {
    setShowModalForSameAccount(false);
  }
  // modal 顯示情境: 資料庫有相同帳號
  // 處理點選按鈕以外的事件
  function handleCancelOpForSameAccount() {
    setShowModalForSameAccount(false);
  }
  // modal 顯示情境: 註冊成功
  // 處理點選按鈕的事件
  function handleSubmitOpForRegisterSuccessfully() {
    setShowModalForRegisterSuccessfully(false);
    getSessionDataApi()
      .then((resp) => {
        const json_data = resp.data;
        if (json_data.isSuccessful === API_RESP_FAILED_MSG) {
          setShowModalForApiError(true);
        }
        if (json_data.isSuccessful === API_RESP_SUCCESSFUL_MSG) {
          // 自動跳轉到首頁
          history.push("/");
        }
      })
      .catch((e) => {
        console.log(API_RESP_REQ_REJECT_ERR_MSG, e);
        setShowModalForApiError(true);
      });
  }
  // modal 顯示情境: 註冊成功
  // 處理點選按鈕以外的事件
  function handleCancelOpForRegisterSuccessfully() {
    setShowModalForRegisterSuccessfully(false);
    history.push("/");
    // 要做錯誤處理
  }
  // modal 顯示情境: 發送 API 過程有異常
  // 處理點選按鈕的事件
  function handleSubmitOpForApiError() {
    setShowModalForApiError(false);
  }
  // modal 顯示情境: 發送 API 過程有異常
  // 處理點選按鈕以外的事件
  function handleCancelOpForApiError() {
    setShowModalForApiError(false);
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
        {showModalForSameAccount && (
          <Modal
            modalInfo={modalInfoForSameAccount}
            handleSubmitOp={handleSubmitOpForSameAccount}
            handleCancelOp={handleCancelOpForSameAccount}
          />
        )}
        {showModalForRegisterSuccessfully && (
          <Modal
            modalInfo={modalInfoForRegisterSuccessfully}
            handleSubmitOp={handleSubmitOpForRegisterSuccessfully}
            handleCancelOp={handleCancelOpForRegisterSuccessfully}
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
