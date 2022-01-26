import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCartItemsApi, uploadCartItemsApi } from "../../Webapi";
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
    req: {
      isProcessing: boolean
    },
    err: {
      isShow: boolean,
      msg   : string
    }
  }
*/

const initialState = {
  items: [],
  req: {
    isProcessing: null,
  },
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

export const uploadCart = createAsyncThunk(
  "cart/uploadCart",
  async (upload_data) => {
    const resp = await uploadCartItemsApi(upload_data);
    return JSON.stringify(resp);
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.req.isProcessing = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      let parsed_json = null;
      try {
        parsed_json = JSON.parse(action.payload);
      } catch {
        state.isProcessing = false;
        state.err.isShow = true;
        state.err.msg = "get response but parsed JSON failed";
        return;
      }
      if (parsed_json.data.isSuccessful === "failed") {
        if (parsed_json.data.msg === "session variable not set") {
          const localCart = getCookie("cart-guest");
          if (localCart === undefined) {
            setCookie("cart-guest", JSON.stringify([]), 7);
            state.req.isProcessing = false;
          } else {
            state.items = JSON.parse(localCart);
            state.req.isProcessing = false;
          }
          return;
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
      state.req.isProcessing = false;
    });
    builder.addCase(getCart.rejected, (state) => {
      state.req.isProcessing = false;
      // console.log("rejected: ", action.error);
      state.err.isShow = true;
      state.err.msg = "send request failed";
    });
    builder.addCase(uploadCart.pending, (state) => {
      state.req.isProcessing = true;
    });
    builder.addCase(uploadCart.fulfilled, (state, action) => {
      let parsed_json = null;
      try {
        parsed_json = JSON.parse(action.payload);
      } catch {
        state.isProcessing = false;
        state.err.isShow = true;
        state.err.msg = "get response but parse JSON failed";
      }
      if (parsed_json.data.isSuccessful === "failed") {
        state.err.isShow = true;
        state.err.msg = "server side reject this operation";
      }
      state.req.isProcessing = false;
    });
    builder.addCase(uploadCart.rejected, (state) => {
      state.req.isProcessing = false;
      // console.log("rejected: ", action.error);
      state.err.isShow = true;
      state.err.msg = "send request failed";
    });
  },
});

export const { addCartItem } = cartSlice.actions;
export default cartSlice.reducer;
