// Component Header 相關常數
export const HEADER_HEIGHT_MOBILE = "4.8rem";
export const HEADER_HEIGHT_PAD = "5.6rem";

// Z-Index 相關常數
// 利用等級區分，方便之後管理
export const Z_INDEX_LV1 = "1";
export const Z_INDEX_LV2 = "2";
export const Z_INDEX_LV3 = "3";
export const Z_INDEX_LV4 = "4";
export const Z_INDEX_LV5 = "5";
export const Z_INDEX_LV6 = "6";

// 定義斷點，如果要修改數值，也請修改 src/css/fonts.css 檔案
export const BREAKPOINT_MOBILE = "@media (min-width: 320px)";
export const BREAKPOINT_PAD = "@media (min-width: 768px)";
export const BREAKPOINT_LAPTOP = "@media (min-width: 1440px)";

export const MAX_CONTAINER_WIDTH = "1440px";

// 定義一些 css 的屬性變數，方便在 styled-component 底下套用
// 若要更改也請修改 src/utils 底下的相關 .css 檔案
export const BOX_SHADOW_LIGHT = "rgba(0, 0, 0, 0.04) 0px 3px 5px";
export const BOX_SHADOW_DARK = "rgba(149, 157, 165, 0.2) 0px 8px 24px";

// 目前套用的主題配色
const THEME_PRIMARY1 = "#9ec6d9";
const THEME_PRIMARY2 = "#F07759";
const THEME_PRIMARY3 = "#22B45F";
const THEME_SECONDARY1 = "#909090";
const THEME_SECONDARY2 = "#1F1E1C";
const THEME_SECONDARY3 = "#ffffff";
const THEME_SECONDARY4 = "#FcFcFc";

export const COLOR_PRIMARY1 = THEME_PRIMARY1;
export const COLOR_PRIMARY2 = THEME_PRIMARY2;
export const COLOR_PRIMARY3 = THEME_PRIMARY3;
export const COLOR_SECONDARY1 = THEME_SECONDARY1;
export const COLOR_SECONDARY2 = THEME_SECONDARY2;
export const COLOR_SECONDARY3 = THEME_SECONDARY3;
export const COLOR_SECONDARY4 = THEME_SECONDARY4;

export const BR_PRIMARY1 = THEME_PRIMARY1;
export const BR_PRIMARY2 = THEME_PRIMARY2;
export const BR_PRIMARY3 = THEME_PRIMARY3;
export const BR_SECONDARY1 = THEME_SECONDARY1;
export const BR_SECONDARY2 = THEME_SECONDARY2;
export const BR_SECONDARY3 = THEME_SECONDARY3;
export const BR_SECONDARY4 = THEME_SECONDARY4;

export const BG_PRIMARY1 = THEME_PRIMARY1;
export const BG_PRIMARY2 = THEME_PRIMARY2;
export const BG_PRIMARY3 = THEME_PRIMARY3;
export const BG_SECONDARY1 = THEME_SECONDARY1;
export const BG_SECONDARY2 = THEME_SECONDARY2;
export const BG_SECONDARY3 = THEME_SECONDARY3;
export const BG_SECONDARY4 = THEME_SECONDARY4;

export const BG_OFFCANVA = "rgba(53, 53, 53, 0.8)";
export const BG_TRANSPARENT = "rgba(255, 255, 255, 0.8)";

/* 提供給需要遮罩元件使用 */
export const BG_MASK = "rgba(53, 53, 53, 0.8)";

// 控制 HomePage hotItems 的資料庫相關常數
export const HOT_ITEMS_QUERY_INIT_OFFSET = 0;
export const HOT_ITEMS_QUERY_INIT_LIMIT = 5;
export const HOT_ITEMS_QUERY_LIMIT = 3;

// 控制 HomePage comments 的資料庫相關常數
export const COMMENTS_QUERY_INIT_OFFSET = 0;
export const COMMENTS_QUERY_INIT_LIMIT = 5;
export const COMMENTS_QUERY_LIMIT = 3;

// 控制 ProductsPage products 的資料庫相關常數
export const PRODUCTS_QUERY_INIT_OFFSET = 0;
export const PRODUCTS_QUERY_INIT_LIMIT = 12;
export const PRODUCTS_QUERY_LIMIT = 3;

// 定義錯誤訊息
export const API_RESP_FAILED_MSG = "failed";
export const API_RESP_SUCCESSFUL_MSG = "successful";
export const API_RESP_PARSE_JSON_ERROR_MSG =
  "get response but parse JSON failed";
export const API_RESP_SERVER_REJECT_OP_MSG =
  "server side reject this operation";
export const API_RESP_REQ_REJECT_ERR_MSG = "send request failed. type is:";
export const API_RESP_SESSION_NOT_SET_MSG = "session variable not set";
export const API_RESP_USER_NOT_FOUND_MSG = "not founded in database";
export const API_RESP_NOT_ALLOW_TO_REGISTER_SAME_ACCOUNT =
  "detect same account";

// 定義相關 Cookie 變數
export const COOKIE_GUEST_CART_NAME = "cart-guest";

// 定義根目錄
export const ROOT_DIR = "/";

// 定義 Footer 元件的相關連結
export const FOOTER_GITHUB_LINK =
  "https://github.com/GuanYu914/clothing-ec-website";
export const FOOTER_MAIL_LINK = "mailto:yu.uiux.designer@gmail.com";

// 定義 Products page 的 filter 變數
export const FILTER_INIT_OPTION = "尚未套用篩選條件";
export const FILTER_OPTION_1 = "價格低至高";
export const FILTER_OPTION_2 = "價格高至低";
export const FILTER_RESET_OPTION = "取消套用篩選";
