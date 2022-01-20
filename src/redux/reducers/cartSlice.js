import { createSlice } from "@reduxjs/toolkit";
import { getCartItemsApi } from "../../Webapi";
import { getCookie, setCookie } from "../../util";

const initialState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.items = action.payload;
    },
  },
});

// redux-thunk
// 如果為用戶，透過 api 拿到購物車資訊
// 如果為訪客，透過 cookie 拿購物車資訊
export const getCart = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    getCartItemsApi()
      .then((resp) => {
        const json_data = resp.data;
        if (json_data.isSuccessful === "failed") {
          // 如果是訪客，則從 cookie 拿購物車資訊
          if (json_data.msg === "session variable not set") {
            if (getCookie("cart-guest") === undefined) {
              setCookie("cart-guest", JSON.stringify([]), 7);
            } else {
              dispatch(addCartItem(JSON.parse(getCookie("cart-guest"))));
            }
            // 如果用戶為訪客，則會觸發 failed 條件，所以加上 resolve() 解決
            return resolve();
          }
          return reject("server side error");
        }
        if (json_data.isSuccessful === "successful") {
          dispatch(
            addCartItem(
              json_data.data.map((item, index) => ({
                id: index,
                pid: item.pid,
                name: item.name,
                colors: JSON.parse(item.colors),
                sizes: JSON.parse(item.sizes),
                unitPrice: item.price,
                urls: JSON.parse(item.imgs),
                quantity: item.quantity,
              }))
            )
          );
          return resolve();
        }
      })
      .catch((e) => {
        return reject(e);
      });
  });
};

export const { addCartItem } = cartSlice.actions;
export default cartSlice.reducer;
