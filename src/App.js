import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
import { UserContext, IntroductionModalContext } from "./context";
import ScrollToTop from "./components/scroll-to-top";
import { useEffect, useRef } from "react";
import { getSessionDataApi } from "./Webapi";
import Modal from "./components/modal";
import { setCookie } from "./util";
import AsyncComponent from "./components/async-component";
import { uploadCartItemsApi, LogoutApi } from "./Webapi";
import { isEmptyObj } from "./util";
import { getCart } from "./redux/reducers/cartSlice";
import {
  getFavoriteItems,
  uploadFavoriteItems,
} from "./redux/reducers/FavoriteItemsSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  // 產生 dispatch
  const dispatch = useDispatch();
  // 從 redux-store 拿購物車物品
  const cartItemsFromStore = useSelector((store) => store.cart.items);
  // 從 redux-store 拿喜好清單
  const favoriteItemsFromStore = useSelector(
    (store) => store.favoriteItems.items
  );
  // 用戶資訊
  const [user, setUser] = useState({});
  // 當 user 更新時，才更新此數值
  const memorizedUser = useMemo(() => ({ user, setUser }), [user]);
  // 紀錄 Home Page 的 introduction modal 是否有被看過
  const [introductionModalIsDisplayed, setIntroductionModalIsDisplayed] =
    useState(false);
  // 用來儲存目前是否有抓到當前用戶資訊
  const flagGetUser = useRef(false);
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

  // 在 react router render 頁面前，會先 call
  // 如果是用戶，從 api 拿用戶資訊、收藏清單、購物車資訊
  // 如果非用戶，從 api 拿用戶資訊，從 cookie 的 cart-guest 欄位拿購物車資訊
  function getUserNecessaryInfoFromApis() {
    return getUserFromApi()
      .then(() => {
        // 同時發送多個非同步任務
        return Promise.all([getFavoriteItemsFromApi(), getCartItemsFromApi()]);
      })
      .catch((e) => {
        console.log(
          "some errors were happened when setting data from api, error is ",
          e
        );
        setShowModalForApiError(true);
      });
  }
  // 在 react router render 頁面前，會先 call
  // 如果是用戶，從 api 登出用戶，再拿用戶資訊，從 cookie 的 cart-guest 欄位拿購物車資訊
  function userLogoutFromApis() {
    return logoutFromApi()
      .then(() => {
        return getUserFromApi();
      })
      .then(() => {
        // 同時發送多個非同步任務
        return Promise.all([getFavoriteItemsFromApi(), getCartItemsFromApi()]);
      })
      .catch((e) => {
        console.log(
          "some errors were happened when setting data from api, error is ",
          e
        );
        setShowModalForApiError(true);
      });
  }
  // 用戶用戶
  function logoutFromApi() {
    return new Promise((resolve, reject) => {
      LogoutApi()
        .then((resp) => {
          const json_data = resp.data;
          if (json_data.isSuccessful === "failed") {
            setShowModalForApiError(true);
            return reject();
          }
          if (json_data.isSuccessful === "successful") {
            setUser({});
            return resolve();
          }
        })
        .catch((e) => {
          return reject(e);
        });
    });
  }
  // 取得目前用戶身分
  function getUserFromApi() {
    return new Promise((resolve, reject) => {
      getSessionDataApi()
        .then((resp) => {
          const json_data = resp.data;
          if (json_data.isSuccessful === "failed") {
            setUser({});
            flagGetUser.current = true;
            // 如果用戶為訪客，則會觸發 failed 條件，所以加上 resolve() 解決
            return resolve();
          }
          if (json_data.isSuccessful === "successful") {
            setUser({
              userId: json_data.data.id,
              nickname: json_data.data.nickname,
              account: json_data.data.account,
              pass: json_data.data.password,
            });
            flagGetUser.current = true;
            return resolve();
          }
        })
        .catch((e) => {
          return reject(e);
        });
    });
  }
  // 呼叫 action 拿到相對應的喜好清單
  function getFavoriteItemsFromApi() {
    dispatch(getFavoriteItems());
    // 先產生假的 resolve 狀態...
    return new Promise((resolve) => {
      return resolve();
    });
  }
  // 呼叫 action 拿到相對應的購物車物品
  function getCartItemsFromApi() {
    dispatch(getCart());
    // 先產生假的 resolve 狀態...
    return new Promise((resolve) => {
      resolve();
    });
  }

  // 收藏清單更新時，如果當前為用戶，透過 api 上傳到 server 同步
  useEffect(() => {
    if (isEmptyObj(user)) return;
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
    if (isEmptyObj(user) && flagGetUser.current) {
      setCookie("cart-guest", JSON.stringify(cartItemsFromStore), 7);
      return;
    }
    // 如果有抓到當前用戶資訊，且身分為用戶
    if (!isEmptyObj(user) && flagGetUser.current) {
      const upload_data = cartItemsFromStore.map((item) => ({
        id: item.id,
        pid: item.pid,
        size: item.sizes.filter((size) => size.selected === true)[0].name,
        color: item.colors.filter((color) => color.selected === true)[0]
          .hexcode,
        quantity: item.quantity,
      }));
      uploadCartItemsApi(upload_data)
        .then((resp) => {
          const json_data = resp.data;
          if (json_data.isSuccessful === "failed") {
            setShowModalForApiError(true);
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
  }, [cartItemsFromStore]);

  return (
    <Router basename="/clothing-ec/demo">
      <ScrollToTop />
      <Switch>
        <UserContext.Provider value={memorizedUser}>
          <IntroductionModalContext.Provider
            value={{
              introductionModalIsDisplayed,
              setIntroductionModalIsDisplayed,
            }}
          >
            <Route exact path="/">
              <AsyncComponent componentPromise={getUserNecessaryInfoFromApis}>
                <HomePage />
              </AsyncComponent>
            </Route>
          </IntroductionModalContext.Provider>
          <Route exact path="/register">
            <AsyncComponent componentPromise={getUserNecessaryInfoFromApis}>
              {/* 防止用戶透過 url 存取註冊頁面 */}
              {isEmptyObj(user) ? <RegisterPage /> : <ErrorPage />}
            </AsyncComponent>
          </Route>
          <Route exact path="/login">
            <AsyncComponent componentPromise={getUserNecessaryInfoFromApis}>
              {/* 防止用戶透過 url 存取登入頁面 */}
              {isEmptyObj(user) ? <LoginPage /> : <ErrorPage />}
            </AsyncComponent>
          </Route>
          <Route exact path="/logout">
            <AsyncComponent componentPromise={userLogoutFromApis}>
              <LogoutPage />
            </AsyncComponent>
          </Route>
          <Route exact path="/profile-edit">
            <AsyncComponent componentPromise={getUserNecessaryInfoFromApis}>
              {/* 防止訪客透過 url 存取編輯個人資訊頁面 */}
              {isEmptyObj(user) ? <ErrorPage /> : <ProfileEditPage />}
            </AsyncComponent>
          </Route>
          <Route exact path="/favorite">
            <AsyncComponent componentPromise={getUserNecessaryInfoFromApis}>
              {/* 防止訪客透過 url 存取收藏清單頁面 */}
              {isEmptyObj(user) ? <ErrorPage /> : <FavoritePage />}
            </AsyncComponent>
          </Route>
          {/* 使用 ? 代表可能沒有的欄位 */}
          <Route
            exact
            path="/products/:mainCategoryFromRouter/:subCategoryFromRouter?/:detailedCategoryFromRouter?"
          >
            <AsyncComponent componentPromise={getUserNecessaryInfoFromApis}>
              <ProductsPage />
            </AsyncComponent>
          </Route>
          <Route exact path="/product/:productID">
            <AsyncComponent componentPromise={getUserNecessaryInfoFromApis}>
              <SingleProductPage />
            </AsyncComponent>
          </Route>
          <Route exact path="/cart">
            <AsyncComponent componentPromise={getUserNecessaryInfoFromApis}>
              <CartPage />
            </AsyncComponent>
          </Route>
          {showModalForApiError && (
            <Modal
              modalInfo={modalInfoForApiError}
              handleSubmitOp={handleSubmitOpForApiError}
              handleCancelOp={handleCancelOpForApiError}
            />
          )}
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
