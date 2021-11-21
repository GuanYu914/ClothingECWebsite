import axios from "axios";
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
    offset = 0;
  }
  if (limit === undefined) {
    limit = 5;
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
    offset = 0;
  }
  if (limit === undefined) {
    limit = 5;
  }
  return await axios(
    `${DevURL}/handleGetUserComments.php?offset=${offset}&&limit=${limit}`
  ).catch(errorHandling);
};
