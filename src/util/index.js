// 根據 name 拿到相對應的 cookie 內容
// 如果找步道則回傳 undefined
export const getCookie = function (name) {
  // 將開頭加上;，以便於 call split 分割
  const value = `;${document.cookie}`;
  // 透過 '; <名稱>=' 特定字符切分
  // 如果存在不只一個 cookie，則應該會輸出 2 個字串的 array
  const parts = value.split(`; ${name}=`);
  // 如果要找的名稱後面還有其他 cookie 名稱，則把不相干的刪掉
  if (parts.length === 2) return parts.pop().split(";").shift();
};

// 根據傳入參數，設定相對應的 cookie
export const setCookie = function (name, value, expireDays = 1) {
  const now = new Date();
  now.setDate(now.getDate() + expireDays);
  document.cookie = `${name}=${value};expires=${now.toUTCString()}`;
};

// 空物件，回傳 true，否則回傳 false
export const isEmptyObj = function (obj) {
  if (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  ) {
    return true;
  }
  return false;
};
