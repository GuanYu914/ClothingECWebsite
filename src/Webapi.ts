import axios from "axios";
import {
  COMMENTS_QUERY_INIT_LIMIT,
  COMMENTS_QUERY_INIT_OFFSET,
  HOT_ITEMS_QUERY_INIT_LIMIT,
  HOT_ITEMS_QUERY_INIT_OFFSET,
  PRODUCTS_QUERY_INIT_LIMIT,
  PRODUCTS_QUERY_INIT_OFFSET,
} from "./constant";
import { UploadFavoriteItemPayload } from "./redux/reducers/FavoriteItemsSlice"
import { UploadCartItemPayload } from "./redux/reducers/cartSlice"
// 這邊會串接後端 api
const DevURL = "http://localhost/clothing_ec";
// 將來要發佈到前端網站上的網域
// const ProdURL = "https://emory.work/clothing-ec/api";

const apiExtraConfig = {
  useWebp: false
}

interface initApiExtraConfigPayload {
  useWebp?: boolean;
}

export const initApiExtraConfig = function (config: initApiExtraConfigPayload): void {
  if (config.useWebp) {
    apiExtraConfig.useWebp = true;
  }
}

// 拿 HomePage 的 Banner
export const getBannersApi = async function () {
  if (apiExtraConfig.useWebp) {
    return await axios(`${DevURL}/handleGetBanners.php?webp=true`)
  }
  return await axios(`${DevURL}/handleGetBanners.php`);
};

// 拿 HomePage 的商品分類
export const getMainCategoriesApi = async function () {
  if (apiExtraConfig.useWebp) {
    return await axios(`${DevURL}/handleGetCategories.php?type=main&&webp=true`);
  }
  return await axios(`${DevURL}/handleGetCategories.php?type=main`);
};

// offset 從第幾筆開始回傳
// limit  限制多少筆回傳
// (offset, limit) = (0, 5) => 代表拿一開的 5 筆資料
// 拿 HomePage 的熱銷品項
export const getHotItemsApi = async function (offset: number, limit: number) {
  if (offset === undefined) {
    offset = HOT_ITEMS_QUERY_INIT_OFFSET;
  }
  if (limit === undefined) {
    limit = HOT_ITEMS_QUERY_INIT_LIMIT;
  }
  if (apiExtraConfig.useWebp) {
    return await axios(
      `${DevURL}/handleGetHotItems.php?offset=${offset}&&limit=${limit}&&webp=true`
    );
  }
  return await axios(
    `${DevURL}/handleGetHotItems.php?offset=${offset}&&limit=${limit}`
  );
};

// offset 從第幾筆開始回傳
// limit  限制多少筆回傳
// (offset, limit) = (0, 5) => 代表拿一開的 5 筆資料
// 拿 HomePage 的顧客評價
export const getUserCommentsApi = async function (offset: number, limit: number) {
  if (offset === undefined) {
    offset = COMMENTS_QUERY_INIT_OFFSET;
  }
  if (limit === undefined) {
    limit = COMMENTS_QUERY_INIT_LIMIT;
  }
  if (apiExtraConfig.useWebp) {
    return await axios(
      `${DevURL}/handleGetUserComments.php?offset=${offset}&&limit=${limit}&&webp=true`
    );
  }
  return await axios(
    `${DevURL}/handleGetUserComments.php?offset=${offset}&&limit=${limit}`
  );
};

// 拿 ProductsPage 的所有商品分類列表
export const getAllCategoriesApi = async function () {
  return await axios(`${DevURL}/handleGetCategories.php?type=detail`);
};

// 拿 ProductsPage 的當前分類產品
export const getProductsByCategoryApi = async function (
  mainCategory: string,
  subCategory: string | undefined,
  detailedCategory: string,
  offset: number,
  limit: number
) {
  if (offset === undefined) {
    offset = PRODUCTS_QUERY_INIT_OFFSET;
  }
  if (limit === undefined) {
    limit = PRODUCTS_QUERY_INIT_LIMIT;
  }
  if (apiExtraConfig.useWebp) {
    return await axios(
      `${DevURL}/handleGetProducts.php?main=${mainCategory}&&sub=${subCategory}&&detailed=${detailedCategory}&&offset=${offset}&&limit=${limit}&&webp=true`
    );
  }
  return await axios(
    `${DevURL}/handleGetProducts.php?main=${mainCategory}&&sub=${subCategory}&&detailed=${detailedCategory}&&offset=${offset}&&limit=${limit}`
  );
};

// 拿 SingeProductPage 當前頁面產品
export const getProductByIDApi = async function (pid: number) {
  if (apiExtraConfig.useWebp) {
    return await axios(`${DevURL}/handleGetProduct.php?id=${pid}&&webp=true`);
  }
  return await axios(`${DevURL}/handleGetProduct.php?id=${pid}`);
};

// 發送用戶註冊資訊
export const sendUserRegisterDataApi = async function (
  nickname: string,
  account: string,
  password: string
) {
  return await axios.post(
    `${DevURL}/handleRegister.php`,
    {
      nickname,
      account,
      password,
    },
    { withCredentials: true }
  );
};

// 發送用戶登入資訊
export const sendUserLoginDataApi = async function (account: string, password: string) {
  return await axios.post(
    `${DevURL}/handleLogin.php`,
    { account, password },
    {
      withCredentials: true,
    }
  );
};

// 修改用戶資訊
export const sendUpdatedUserDataApi = async function (nickname: string, password: string) {
  return await axios.post(
    `${DevURL}/handleProfileEdit.php`,
    { nickname, password },
    { withCredentials: true }
  );
};

// 取得 session 資料
export const getSessionDataApi = async function () {
  return await axios(`${DevURL}/handleGetSession.php`, {
    withCredentials: true,
  });
};

// 登出 api
export const LogoutApi = async function () {
  return await axios(`${DevURL}/handleLogout.php`, {
    withCredentials: true,
  });
};

// 取得用戶收藏清單
export const getFavoriteItemsApi = async function () {
  if (apiExtraConfig.useWebp) {
    return await axios(`${DevURL}/handleGetFavoriteItems.php?webp=true`, {
      withCredentials: true,
    });
  }
  return await axios(`${DevURL}/handleGetFavoriteItems.php`, {
    withCredentials: true,
  });
};

// 上傳用戶收藏清單
export const uploadFavoriteItemsApi = async function (productsInfo: UploadFavoriteItemPayload[]) {
  return await axios.post(
    `${DevURL}/handleUploadFavoriteItems.php`,
    { productsInfo },
    { withCredentials: true }
  );
};

// 取得用戶購物車清單
export const getCartItemsApi = async function () {
  if (apiExtraConfig.useWebp) {
    return await axios(`${DevURL}/handleGetCartItems.php?webp=true`, {
      withCredentials: true,
    });
  }
  return await axios(`${DevURL}/handleGetCartItems.php`, {
    withCredentials: true,
  });
};

// 上傳用戶購買
export const uploadCartItemsApi = async function (productsInfo: UploadCartItemPayload[]) {
  return await axios.post(
    `${DevURL}/handleUploadCartItems.php`,
    { productsInfo },
    { withCredentials: true }
  );
};
