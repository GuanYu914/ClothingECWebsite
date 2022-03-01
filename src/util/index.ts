import { ROOT_DIR } from "../constant";
// 根據 name 拿到相對應的 cookie 內容
// 如果找不到則回傳 undefined
export const getCookie = function (name: string): string | undefined {
  // 將開頭加上;，以便於 call split 分割
  const value = `; ${document.cookie}`;
  // 透過 '; <名稱>=' 特定字符切分
  // 如果存在不只一個 cookie，則應該會輸出 2 個字串的 array
  const parts: string[] = value.split(`; ${name}=`);
  // 如果要找的名稱後面還有其他 cookie 名稱，則把不相干的刪掉
  if (parts.length === 2) {
    // 如果遇到中文，使用此編碼解決 Safari 上無法在 cookie 上儲存的問題
    // 使用型別斷言，保證一定是 string
    let value = parts.pop() as string;
    return decodeURIComponent(value.split(";").shift() as string);
  }
  return undefined;
};

// 根據傳入參數，設定相對應的 cookie
export const setCookie = function (
  name: string,
  value: string,
  expireDays: number = 1,
  path: string = ROOT_DIR
) {
  const now = new Date();
  now.setDate(now.getDate() + expireDays);
  // 如果遇到中文，使用此編碼解決 Safari 上無法在 cookie 上儲存的問題
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${now.toUTCString()}; path=${path}`;
};

// 空物件，回傳 true，否則回傳 false
export const isEmptyObj = function (obj: object): boolean {
  if (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  ) {
    return true;
  }
  return false;
};

// 試圖在 DOM 放上 1x1 webp 檔案
// 如果瀏覽器載入成功，則 resolve true，相反 resolve false
async function loadWebpImg(): Promise<boolean> {
  return new Promise((resolve) => {
    const imgSrc = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAgA0JaQAA3AA/vVSgAA=';
    const pixel = new Image();
    pixel.addEventListener('load', () => {
      const isSuccess = (pixel.width > 0) && (pixel.height > 0);
      resolve(isSuccess)
    })
    pixel.addEventListener('error', () => { resolve(false) })
    pixel.setAttribute('src', imgSrc);
  })
}

// 根據 loadWebpImg function 結果，執行相對應 callback
export const detectWebpSupport = async function (supportCallBack: () => void, noneSupportCallBack?: () => void) {
  const hasSupport: boolean = await loadWebpImg();
  if (hasSupport) {
    supportCallBack();
  } else {
    if (typeof noneSupportCallBack === 'function') {
      noneSupportCallBack();
    }
  }
}
