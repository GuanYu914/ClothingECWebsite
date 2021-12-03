// Component Header 相關常數
export const HEADER_HEIGHT_MOBILE = "4rem";
export const HEADER_HEIGHT_PAD = "5.6rem";

// Z-Index 相關常數
// 利用等級區分，方便之後管理
export const Z_INDEX_LV1 = "9";
export const Z_INDEX_LV2 = "99";
export const Z_INDEX_LV3 = "999";
export const Z_INDEX_LV4 = "9999";
export const Z_INDEX_LV5 = "99999";
export const Z_INDEX_LV6 = "999999";

// 定義斷點，如果要修改數值，也請修改 src/css/fonts.css 檔案
export const BREAKPOINT_MOBILE = "@media (min-width: 320px)";
export const BREAKPOINT_PAD = "@media (min-width: 768px)";
export const BREAKPOINT_LAPTOP = "@media (min-width: 1440px)";

export const MAX_CONTAINER_WIDTH = "1440px";

// 定義一些 css 的屬性變數，方便在 styled-component 底下套用
// 若要更改也請修改 src/utils 底下的相關 .css 檔案
export const BOX_SHADOW_LIGHT = "rgba(0, 0, 0, 0.04) 0px 3px 5px";
export const BOX_SHADOW_DARK = "rgba(149, 157, 165, 0.2) 0px 8px 24px";

export const COLOR_PRIMARY1 = "#9DCBDF";
export const COLOR_PRIMARY2 = "#F07759";
export const COLOR_PRIMARY3 = "#22B45F";
export const COLOR_SECONDARY1 = "#909090";
export const COLOR_SECONDARY2 = "#1F1E1C";
export const COLOR_SECONDARY3 = "#FFFFFF";

export const BR_PRIMARY1 = "#9DCBDF";
export const BR_PRIMARY2 = "#F07759";
export const BR_PRIMARY3 = "#22B45F";
export const BR_SECONDARY1 = "#909090";
export const BR_SECONDARY2 = "#1F1E1C";
export const BR_SECONDARY3 = "#FFFFFF";

export const BG_PRIMARY1 = "#9DCBDF";
export const BG_PRIMARY2 = "#F07759";
export const BG_PRIMARY3 = "#22B45F";
export const BG_SECONDARY1 = "#909090";
export const BG_SECONDARY2 = "#1F1E1C";
export const BG_SECONDARY3 = "#FFFFFF";

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
