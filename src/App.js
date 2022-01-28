import React, { useRef, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/home-page";
import ProductsPage from "./pages/products-page";
import SingleProductPage from "./pages/single-product-page";
import CartPage from "./pages/cart-page";
import LoginPage from "./pages/login-page";
import LogoutPage from "./pages/logout-page";
import RegisterPage from "./pages/register-page";
import ProfileEditPage from "./pages/profile-edit-page";
import FavoritePage from "./pages/favorite-page";
import ErrorPage from "./pages/error-page";
import { IntroductionModalContext } from "./context";
import ScrollToTop from "./components/scroll-to-top";
import AsyncComponent from "./components/async-component";
import { useEffect } from "react";
import Modal from "./components/modal";
import { setCookie } from "./util";
import { isEmptyObj } from "./util";
import { getCart, uploadCart } from "./redux/reducers/cartSlice";
import {
  getFavoriteItems,
  uploadFavoriteItems,
} from "./redux/reducers/FavoriteItemsSlice";
import { getUser, logoutUser } from "./redux/reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { COOKIE_GUEST_CART_NAME } from "./constant";

function App() {
  // 從 react-router 拿 URL 資訊
  const location = useLocation();
  // 產生 dispatch
  const dispatch = useDispatch();
  // 從 redux-store 拿用戶資訊
  const userFromStore = useSelector((store) => store.user.info);
  // 從 redux-store 拿用戶請求處理狀態
  const userReqProcessingState = useSelector(
    (store) => store.user.req.isProcessing
  );
  // 從 redux-store 拿用戶請求錯誤狀態
  const userReqErrState = useSelector((store) => store.user.err);
  // 從 redux-store 拿購物車物品
  const cartItemsFromStore = useSelector((store) => store.cart.items);
  // 從 redux-store 拿購物車資訊請求狀態
  const cartReqProcessingState = useSelector(
    (store) => store.cart.req.isProcessing
  );
  // 從 redux-store 拿購物車資訊請求錯誤狀態
  const cartReqErrState = useSelector((store) => store.cart.err);
  // 從 redux-store 拿喜好清單
  const favoriteItemsFromStore = useSelector(
    (store) => store.favoriteItems.items
  );
  // 從 redux-store 拿喜好清單請求狀態
  const favoriteItemsReqProcessingState = useSelector(
    (store) => store.favoriteItems.req.isProcessing
  );
  // 從 redux-store 拿喜好清單請求錯誤狀態
  const favoriteItemsReqErrState = useSelector(
    (store) => store.favoriteItems.err
  );
  // 紀錄頁面是否讀取完畢
  // ps. 只會在重新讀取頁面時有效
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  // 紀錄 Home Page 的 introduction modal 是否有被看過
  const [introductionModalIsDisplayed, setIntroductionModalIsDisplayed] =
    useState(false);
  // 用來儲存當前是否有送出用戶資訊請求
  const flagSendUserReq = useRef(false);
  // 是否要顯示 api 發送錯誤的 modal
  const [showModalForApiError, setShowModalForApiError] = useState(false);
  // api 發送錯誤的 modal 資訊
  const [modalInfoForApiError] = useState({
    selectionMode: false,
    title: "發生一點小錯誤",
    content: "由於伺服器或網路異常，請稍後再試一次",
  });

  // modal 顯示情境: api 發送過程中有誤
  // 處理點選按鈕事件
  function handleSubmitOpForApiError() {
    setShowModalForApiError(false);
  }
  // modal 顯示情境: api 發送過程中有誤
  // 處理點選按鈕之外事件
  function handleCancelOpForApiError() {
    setShowModalForApiError(false);
  }

  useEffect(() => {
    // 重置相關紀錄
    setIsLoadingPage(true);
    setShowModalForApiError(false);
    flagSendUserReq.current = false;
    flagSendUserReq.current = false;
    if (location.pathname === "/logout") {
      dispatch(logoutUser());
      return;
    }
    dispatch(getUser());
  }, [location.pathname]);
  // 在 dispatch user 相關的 action 後，一些後續的流程
  useEffect(() => {
    // 用來解決 unmount 的時候，可以透過 store 的狀態更改 isLoading state
    let isCancelled = false;
    // 獲取用戶資訊後再拿喜好清單跟購物車
    if (
      userReqProcessingState === false &&
      userReqErrState.isShow === false &&
      flagSendUserReq.current === false
    ) {
      dispatch(getFavoriteItems());
      dispatch(getCart());
      flagSendUserReq.current = true;
    }
    // 做錯誤處裡...
    if (
      userReqErrState.isShow === true ||
      cartReqErrState.isShow === true ||
      favoriteItemsReqErrState.isShow === true
    ) {
      if (!isCancelled) {
        setShowModalForApiError(true);
      }
    }
    // 可以載入畫面了...
    if (
      userReqErrState.isShow === false &&
      cartReqErrState.isShow === false &&
      favoriteItemsReqErrState.isShow === false &&
      userReqProcessingState === false &&
      cartReqProcessingState === false &&
      favoriteItemsReqProcessingState === false
    ) {
      if (!isCancelled) {
        setIsLoadingPage(false);
      }
    }
    // unmount 的時候將 isCancelled 設為 true，防止非同步操作改動 state
    return () => {
      isCancelled = true;
    };
  }, [
    userReqProcessingState,
    cartReqProcessingState,
    favoriteItemsReqProcessingState,
    userReqErrState.isShow,
    cartReqErrState.isShow,
    favoriteItemsReqErrState.isShow,
  ]);
  // 收藏清單更新時，如果當前為用戶，透過 api 上傳到 server 同步
  useEffect(() => {
    if (isEmptyObj(userFromStore)) return;
    const upload_data = favoriteItemsFromStore.map((item) => ({
      pid: item.id,
    }));
    dispatch(uploadFavoriteItems(upload_data));
    // 這邊要做錯誤處理...
  }, [favoriteItemsFromStore]);
  // 購物車資訊更新時，如果當前為用戶，透過 api 上傳到 server 同步
  // 購物車資訊更新時，如果當前為訪客，透過 cookie 儲存
  useEffect(() => {
    // 如果有抓到當前用戶資訊，且身分為訪客
    if (
      isEmptyObj(userFromStore) &&
      cartReqProcessingState !== null &&
      !cartReqProcessingState &&
      !cartReqErrState.isShow
    ) {
      setCookie(COOKIE_GUEST_CART_NAME, JSON.stringify(cartItemsFromStore), 7);
      return;
    }
    // 如果有抓到當前用戶資訊，且身分為用戶
    if (!isEmptyObj(userFromStore)) {
      const upload_data = cartItemsFromStore.map((item) => ({
        id: item.id,
        pid: item.pid,
        size: item.sizes.filter((size) => size.selected === true)[0].name,
        color: item.colors.filter((color) => color.selected === true)[0]
          .hexcode,
        quantity: item.quantity,
      }));
      dispatch(uploadCart(upload_data));
      // 要加錯誤處理
    }
  }, [cartItemsFromStore]);

  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <AsyncComponent
            isLoading={isLoadingPage}
            modalInfoFromProps={modalInfoForApiError}
            isShowModal={showModalForApiError}
            handleSubmitOp={handleSubmitOpForApiError}
            handleCancelOp={handleCancelOpForApiError}
          >
            <IntroductionModalContext.Provider
              value={{
                introductionModalIsDisplayed,
                setIntroductionModalIsDisplayed,
              }}
            >
              <HomePage />
            </IntroductionModalContext.Provider>
          </AsyncComponent>
        </Route>
        <Route exact path="/register">
          <AsyncComponent
            isLoading={isLoadingPage}
            modalInfoFromProps={modalInfoForApiError}
            isShowModal={showModalForApiError}
            handleSubmitOp={handleSubmitOpForApiError}
            handleCancelOp={handleCancelOpForApiError}
          >
            {/* 防止用戶透過 url 存取註冊頁面 */}
            {isEmptyObj(userFromStore) ? <RegisterPage /> : <ErrorPage />}
          </AsyncComponent>
        </Route>
        <Route exact path="/login">
          <AsyncComponent
            isLoading={isLoadingPage}
            modalInfoFromProps={modalInfoForApiError}
            isShowModal={showModalForApiError}
            handleSubmitOp={handleSubmitOpForApiError}
            handleCancelOp={handleCancelOpForApiError}
          >
            {/* 防止用戶透過 url 存取登入頁面 */}
            {isEmptyObj(userFromStore) ? <LoginPage /> : <ErrorPage />}
          </AsyncComponent>
        </Route>
        <Route exact path="/logout">
          <AsyncComponent
            isLoading={isLoadingPage}
            modalInfoFromProps={modalInfoForApiError}
            isShowModal={showModalForApiError}
            handleSubmitOp={handleSubmitOpForApiError}
            handleCancelOp={handleCancelOpForApiError}
          >
            <LogoutPage />
          </AsyncComponent>
        </Route>
        <Route exact path="/profile-edit">
          <AsyncComponent
            isLoading={isLoadingPage}
            modalInfoFromProps={modalInfoForApiError}
            isShowModal={showModalForApiError}
            handleSubmitOp={handleSubmitOpForApiError}
            handleCancelOp={handleCancelOpForApiError}
          >
            {/* 防止訪客透過 url 存取編輯個人資訊頁面 */}
            {isEmptyObj(userFromStore) ? <ErrorPage /> : <ProfileEditPage />}
          </AsyncComponent>
        </Route>
        <Route exact path="/favorite">
          <AsyncComponent
            isLoading={isLoadingPage}
            modalInfoFromProps={modalInfoForApiError}
            isShowModal={showModalForApiError}
            handleSubmitOp={handleSubmitOpForApiError}
            handleCancelOp={handleCancelOpForApiError}
          >
            {/* 防止訪客透過 url 存取收藏清單頁面 */}
            {isEmptyObj(userFromStore) ? <ErrorPage /> : <FavoritePage />}
          </AsyncComponent>
        </Route>
        {/* 使用 ? 代表可能沒有的欄位 */}
        <Route
          exact
          path="/products/:mainCategoryFromRouter/:subCategoryFromRouter?/:detailedCategoryFromRouter?"
        >
          <ProductsPage />
          {showModalForApiError && (
            <>
              <Modal
                modalInfo={modalInfoForApiError}
                handleSubmitOp={handleSubmitOpForApiError}
                handleCancelOp={handleCancelOpForApiError}
              />
            </>
          )}
        </Route>
        <Route exact path="/product/:productID">
          <AsyncComponent
            isLoading={isLoadingPage}
            modalInfoFromProps={modalInfoForApiError}
            isShowModal={showModalForApiError}
            handleSubmitOp={handleSubmitOpForApiError}
            handleCancelOp={handleCancelOpForApiError}
          >
            <SingleProductPage />
          </AsyncComponent>
        </Route>
        <Route exact path="/cart">
          <AsyncComponent
            isLoading={isLoadingPage}
            modalInfoFromProps={modalInfoForApiError}
            isShowModal={showModalForApiError}
            handleSubmitOp={handleSubmitOpForApiError}
            handleCancelOp={handleCancelOpForApiError}
          >
            <CartPage />
          </AsyncComponent>
        </Route>
      </Switch>
    </>
  );
}

export default App;
