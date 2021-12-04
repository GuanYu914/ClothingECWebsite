import Header from "../../components/header";
import Footer from "../../components/footer";
import styled from "styled-components/macro";
import Form from "../../components/form";
import { useState, useContext } from "react";
import {
  BG_SECONDARY3,
  COLOR_PRIMARY1,
  MAX_CONTAINER_WIDTH,
  BREAKPOINT_MOBILE,
  HEADER_HEIGHT_MOBILE,
  BREAKPOINT_PAD,
  BREAKPOINT_LAPTOP,
  HEADER_HEIGHT_PAD,
  COLOR_SECONDARY1,
  COLOR_PRIMARY2,
  COLOR_PRIMARY3,
  BG_PRIMARY1,
  COLOR_SECONDARY3,
} from "../../constant";
import { UserContext } from "../../context";
import Modal from "../../components/modal";
import { sendUpdatedUserDataApi } from "../../Webapi";
import { useHistory } from "react-router";

const PageContainer = styled.div`
  background-color: ${BG_PRIMARY1};
`;

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

const FormForMobile = styled.div`
  display: block;

  ${BREAKPOINT_PAD} {
    display: none;
  }
`;

const FormForPad = styled.div`
  display: none;

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

const ProfileEditingTitle = styled.h1.attrs(() => ({
  className: "fs-h1",
}))`
  color: ${COLOR_SECONDARY3};
  padding-top: 1rem;
  margin-bottom: 0.5rem;
`;

const ProfileEditingSubTitle = styled.h3.attrs(() => ({
  className: "fs-h3",
}))`
  color: ${COLOR_SECONDARY3};
  margin-bottom: 1rem;
`;

const BrandInfo = styled.div``;
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

export default function ProfileEditPage() {
  // 透過 UserContext 拿到用戶資訊
  const { user } = useContext(UserContext);
  // 透過 useHistory 換頁
  const history = useHistory();
  // 表單欄位狀態資訊
  const [form, setForm] = useState([
    {
      id: 1,
      type: "text",
      maxLength: 10,
      field: "暱稱",
      inputValue: user.nickname,
      helperColor: COLOR_SECONDARY1,
      helperMsg: "最多 10 個字",
      isValid: true,
    },
    {
      id: 2,
      type: "text",
      maxLength: 12,
      readOnly: true,
      field: "帳號",
      inputValue: user.account,
      helperColor: COLOR_PRIMARY2,
      helperMsg: "您不可更改帳號名稱",
      isValid: true,
    },
    {
      id: 3,
      type: "password",
      maxLength: 12,
      field: "目前密碼",
      inputValue: "",
      helperColor: COLOR_SECONDARY1,
      helperMsg: "請輸入原本的密碼",
      isValid: false,
    },
    {
      id: 4,
      type: "password",
      maxLength: 12,
      field: "新的密碼",
      inputValue: "",
      helperColor: COLOR_SECONDARY1,
      helperMsg: "為 8 到 12 位數，由且包含一位英文大小寫跟數字",
      isValid: false,
    },
  ]);
  // 是否要顯示 api 錯誤 modal 提示訊息
  const [showModalForApiError, setShowModalForApiError] = useState(false);
  // api 錯誤 modal 提示資訊
  const [modalInfoForApiError] = useState({
    selectionMode: false,
    title: "發生一點小錯誤",
    content: "由於伺服器或網路異常，請稍後再試一次",
  });
  // 是否要顯示更新成功的 modal 提示訊息
  const [showModalForUpdatedSuccessfully, setShowModalForUpdatedSuccessfully] =
    useState(false);
  // 更新成功的 modal 提示訊息
  const [modalInfoForUpdatedSuccessfully] = useState({
    selectionMode: false,
    title: "修改用戶資料成功",
    content: "視窗關閉後將自動登出，請使用修改後的帳密登入",
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
  // 處理修改按鈕，送出資料事件
  function handleSubmit() {
    // check all field's validation state
    let postData = {
      nickname: form.filter((formData) => formData.field === "暱稱")[0]
        .inputValue,
      account: user.account,
      currentPassword: form.filter(
        (formData) => formData.field === "目前密碼"
      )[0].inputValue,
      newPassword: form.filter((formData) => formData.field === "新的密碼")[0]
        .inputValue,
    };

    // 只檢查暱稱、目前密碼、新的密碼
    checkFieldValidation("暱稱", postData.nickname);
    checkFieldValidation("目前密碼", postData.currentPassword);
    checkFieldValidation("新的密碼", postData.newPassword);

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
      sendUpdatedUserDataApi(
        postData.nickname,
        postData.account,
        postData.newPassword
      )
        .then((resp) => {
          const json_data = resp.data;
          if (json_data.isSuccessful === "failed") {
            setShowModalForApiError(true);
          }
          if (json_data.isSuccessful === "successful") {
            setShowModalForUpdatedSuccessfully(true);
          }
        })
        .catch((e) => {
          console.log(
            "some errors were happened when setting data from api, error is ",
            e
          );
          setShowModalForApiError(true);
        });
    }
  }
  // 當用戶切換到其他欄位的觸發事件
  function handleFocusOut(fieldName, e) {
    checkFieldValidation(fieldName, e.target.value);
  }
  // 檢查每個輸入欄位的資料，有符合條件才給過
  function checkFieldValidation(fieldName, fieldValue) {
    if (fieldName === "暱稱") {
      if (fieldValue === "") {
        setFieldState("暱稱", "暱稱不能為空", COLOR_PRIMARY2, false);
      } else if (fieldValue.length > 0 && fieldValue.length <= 10) {
        if (fieldValue === user.nickname) {
          setFieldState(
            "暱稱",
            "此暱稱並未修改，如果您不想變更，則忽略此訊息",
            COLOR_PRIMARY3,
            true
          );
        } else {
          setFieldState("暱稱", "暱稱可以使用", COLOR_PRIMARY3, true);
        }
      } else {
        setFieldState(
          "暱稱",
          "暱稱不得為空，最多為 10 個字",
          COLOR_PRIMARY2,
          false
        );
      }
    }
    // 修改
    if (fieldName === "目前密碼") {
      if (fieldValue === "") {
        setFieldState("目前密碼", "密碼不得為空", COLOR_PRIMARY2, false);
      } else if (fieldValue === user.pass) {
        setFieldState("目前密碼", "密碼輸入正確", COLOR_PRIMARY3, true);
      } else {
        setFieldState(
          "目前密碼",
          "密碼輸入錯誤，請再試一次",
          COLOR_PRIMARY2,
          false
        );
      }
    }
    if (fieldName === "新的密碼") {
      if (fieldValue === "") {
        setFieldState("新的密碼", "密碼不得為空", COLOR_PRIMARY2, false);
      } else if (fieldValue === user.pass) {
        setFieldState(
          "新的密碼",
          "目前新設的密碼與原本密碼相同，如果您不想變更，則忽略此訊息",
          COLOR_PRIMARY3,
          true
        );
      } else if (
        fieldValue.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/g) !== null
      ) {
        setFieldState("新的密碼", "密碼可以使用", COLOR_PRIMARY3, true);
      } else {
        setFieldState(
          "新的密碼",
          "為 8-12 位數，由且包含一位英文大小寫跟數字",
          COLOR_PRIMARY2,
          false
        );
      }
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
  // modal 顯示情境: 修改用戶資料成功
  // 處理點選按鈕的事件
  function handleSubmitOpForUpdatedSuccessfully() {
    history.push("/logout");
  }
  // modal 顯示情境: 修改用戶資料成功
  // 處理點選按鈕以外的事件
  function handleCancelOpForUpdatedSuccessfully() {
    history.push("/logout");
  }
  return (
    <PageContainer>
      <Header />
      <ContentContainer>
        <FormForMobile>
          <ProfileEditingTitle>編輯會員資料</ProfileEditingTitle>
          <ProfileEditingSubTitle>
            請輸入相對應欄位，以利修改會員資訊
          </ProfileEditingSubTitle>
          <Form
            width={"100%"}
            formState={form}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleFocusOut={handleFocusOut}
            useForProfileEditing={true}
          />
        </FormForMobile>
        <FormForPad>
          <BrandInfo>
            <BrandName>懶人購物網站</BrandName>
            <BrandSlogan>線上一點，送貨到家</BrandSlogan>
            <ProfileEditingSubTitle>
              請輸入相對應欄位，以利修改會員資訊
            </ProfileEditingSubTitle>
          </BrandInfo>
          <Form
            formState={form}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleFocusOut={handleFocusOut}
            useForProfileEditing={true}
          />
        </FormForPad>
        {showModalForApiError && (
          <Modal
            modalInfo={modalInfoForApiError}
            handleSubmitOp={handleSubmitOpForApiError}
            handleCancelOp={handleCancelOpForApiError}
          />
        )}
        {showModalForUpdatedSuccessfully && (
          <Modal
            modalInfo={modalInfoForUpdatedSuccessfully}
            handleSubmitOp={handleSubmitOpForUpdatedSuccessfully}
            handleCancelOp={handleCancelOpForUpdatedSuccessfully}
          />
        )}
      </ContentContainer>
      <Footer
        marginTop={"0"}
        bgColor={BG_SECONDARY3}
        iconColor={COLOR_PRIMARY1}
      />
    </PageContainer>
  );
}
