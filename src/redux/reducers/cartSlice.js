import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartItemsApi } from "../../Webapi";
import { getCookie, setCookie } from "../../util";

// state structure
/* 
  {
    items: [
      id  : number
      pid : number
      name: string
      colors: [{
        id      : number
        hexcode :  string
        selected: boolean
      },...],
      sizes: [{
        id      : number
        name    : string
        selected: boolean
      },...],
      unitPrice : number,
      quantity  : number
    ],
    err: {
      isShow: boolean,
      msg   : string
    }
  }
*/

const initialState = {
  items: [],
  err: {
    isShow: false,
    msg: "",
  },
};

// redux-thunk
export const getCart = createAsyncThunk("cart/getCart", async () => {
  const resp = await getCartItemsApi();
  return JSON.stringify(resp); // avoid 'non-serializable-data' warning
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      let parsed_json = null;
      try {
        parsed_json = JSON.parse(action.payload);
      } catch {
        state.err.isShow = true;
        state.err.msg = "get response but parsed JSON failed";
      }
      if (parsed_json.data.isSuccessful === "failed") {
        if (parsed_json.data.msg === "session variable not set") {
          if (getCookie("cart-guest") === undefined) {
            state.items = [];
            setCookie("cart-guest", JSON.stringify([]), 7);
          } else {
            state.items = JSON.parse(getCookie("cart-guest"));
          }
        }
        state.err.isShow = true;
        state.err.msg = "server side reject this operation";
      }
      if (parsed_json.data.isSuccessful === "successful") {
        state.items = parsed_json.data.data.map((item, index) => ({
          id: index,
          pid: item.pid,
          name: item.name,
          colors: JSON.parse(item.colors),
          sizes: JSON.parse(item.sizes),
          unitPrice: item.price,
          urls: JSON.parse(item.imgs),
          quantity: item.quantity,
        }));
      }
    });
    builder.addCase(getCart.rejected, (state) => {
      // console.log("rejected: ", action.error);
      state.err.isShow = true;
      state.err.msg = "send request failed";
    });
  },
});

export const { addCartItem } = cartSlice.actions;
export default cartSlice.reducer;
