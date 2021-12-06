import axios from "axios";
import {
  COMMENTS_QUERY_INIT_LIMIT,
  COMMENTS_QUERY_INIT_OFFSET,
  HOT_ITEMS_QUERY_INIT_LIMIT,
  HOT_ITEMS_QUERY_INIT_OFFSET,
  PRODUCTS_QUERY_INIT_LIMIT,
  PRODUCTS_QUERY_INIT_OFFSET,
} from "./constant";
// 這邊會串接後端 api
const DevURL = "http://192.168.0.15/clothing_ec";
// 將來要發佈到前端網站上的網域
// const ProdURL = "https://emorychen.com/clothing-ec";

function errorHandling(error) {
  if (error.response) {
    console.log(
      "receive response but status code out falls out the range of 2xx"
    );
    // console.log("response data: ", error.response.data);
    // console.log("response status: ", error.response.status);
    // console.log("response headers: ", error.response.headers);
  } else if (error.request) {
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log("request was made but on response was received");
    // console.log("request of xhr:", error.request);
  } else {
    console.log("setting up the request maybe wrong...");
    // console.log("error message", error.message);
  }
  // config of error
  // console.log(error.config);
  throw error;
}

// 拿 HomePage 的 Banner
export const getBannersApi = async function () {
  return await axios(`${DevURL}/handleGetBanners.php`).catch(errorHandling);
};

// 拿 HomePage 的商品分類
export const getMainCategoriesApi = async function () {
  return await axios(`${DevURL}/handleGetCategories.php?type=main`).catch(
    errorHandling
  );
};

// offset 從第幾筆開始回傳
// limit  限制多少筆回傳
// (offset, limit) = (0, 5) => 代表拿一開的 5 筆資料
// 拿 HomePage 的熱銷品項
export const getHotItemsApi = async function (offset, limit) {
  if (offset === undefined) {
    offset = HOT_ITEMS_QUERY_INIT_OFFSET;
  }
  if (limit === undefined) {
    limit = HOT_ITEMS_QUERY_INIT_LIMIT;
  }
  return await axios(
    `${DevURL}/handleGetHotItems.php?offset=${offset}&&limit=${limit}`
  ).catch(errorHandling);
};

// offset 從第幾筆開始回傳
// limit  限制多少筆回傳
// (offset, limit) = (0, 5) => 代表拿一開的 5 筆資料
// 拿 HomePage 的顧客評價
export const getUserCommentsApi = async function (offset, limit) {
  if (offset === undefined) {
    offset = COMMENTS_QUERY_INIT_OFFSET;
  }
  if (limit === undefined) {
    limit = COMMENTS_QUERY_INIT_LIMIT;
  }
  return await axios(
    `${DevURL}/handleGetUserComments.php?offset=${offset}&&limit=${limit}`
  ).catch(errorHandling);
};

// 拿 ProductsPage 的所有商品分類列表
export const getAllCategoriesApi = async function () {
  return await axios(`${DevURL}/handleGetCategories.php?type=detail`).catch(
    errorHandling
  );
};

// 拿 ProductsPage 的當前分類產品
export const getProductsByCategoryApi = async function (
  mainCategory,
  subCategory,
  detailedCategory,
  offset,
  limit
) {
  if (offset === undefined) {
    offset = PRODUCTS_QUERY_INIT_OFFSET;
  }
  if (limit === undefined) {
    limit = PRODUCTS_QUERY_INIT_LIMIT;
  }
  return await axios(
    `${DevURL}/handleGetProducts.php?main=${mainCategory}&&sub=${subCategory}&&detailed=${detailedCategory}&&offset=${offset}&&limit=${limit}`
  ).catch(errorHandling);
};

// 拿 SingeProductPage 當前頁面產品
export const getProductByIDApi = async function (pid) {
  return await axios(`${DevURL}/handleGetProduct.php?id=${pid}`).catch(
    errorHandling
  );
};

// 發送用戶註冊資訊
export const sendUserRegisterDataApi = async function (
  nickname,
  account,
  password
) {
  return await axios
    .post(
      `${DevURL}/handleRegister.php`,
      {
        nickname,
        account,
        password,
      },
      { withCredentials: true }
    )
    .catch(errorHandling);
};

// 發送用戶登入資訊
export const sendUserLoginDataApi = async function (account, password) {
  return await axios
    .post(
      `${DevURL}/handleLogin.php`,
      { account, password },
      {
        withCredentials: true,
      }
    )
    .catch(errorHandling);
};

// 修改用戶資訊
export const sendUpdatedUserDataApi = async function (nickname, password) {
  return await axios
    .post(
      `${DevURL}/handleProfileEdit.php`,
      { nickname, password },
      { withCredentials: true }
    )
    .catch(errorHandling);
};

// 取得 session 資料
export const getSessionDataApi = async function () {
  return await axios(`${DevURL}/handleGetSession.php`, {
    withCredentials: true,
  }).catch(errorHandling);
};

// 登出 api
export const LogoutApi = async function () {
  return await axios(`${DevURL}/handleLogout.php`, {
    withCredentials: true,
  }).catch(errorHandling);
};

// 取得用戶收藏清單
export const getFavoriteProductsApi = async function () {
  return await axios
    .post(`${DevURL}/handleGetFavoriteItems.php`, {}, { withCredentials: true })
    .catch(errorHandling);
};
