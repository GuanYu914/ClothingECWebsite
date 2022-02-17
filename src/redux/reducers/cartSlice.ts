import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getCartItemsApi, uploadCartItemsApi } from "../../Webapi";
import { getCookie, setCookie } from "../../util";
import {
  API_RESP_FAILED_MSG,
  API_RESP_PARSE_JSON_ERROR_MSG,
  API_RESP_REQ_REJECT_ERR_MSG,
  API_RESP_SERVER_REJECT_OP_MSG,
  API_RESP_SESSION_NOT_SET_MSG,
  API_RESP_SUCCESSFUL_MSG,
  COOKIE_GUEST_CART_NAME,
} from "../../constant";

export interface CartItemsState {
  items: {
    id: number;
    pid: number;
    name: string;
    colors: {
      id: number;
      hexcode: string;
      selected: boolean;
    }[];
    sizes: {
      id: number;
      name: string;
      selected: boolean;
    }[];
    unitPrice: number;
    urls: {
      id: number;
      alt: string;
      src: string;
    }[];
    quantity: number;
  }[];
  req: {
    isProcessing: null | boolean;
  };
  err: {
    isShow: boolean;
    msg: string;
  };
}

interface AddCartItemPayload {
  id: number;
  pid: number;
  name: string;
  colors: {
    id: number;
    hexcode: string;
    selected: boolean;
  }[];
  sizes: {
    id: number;
    name: string;
    selected: boolean;
  }[];
  unitPrice: number;
  urls: {
    id: number;
    alt: string;
    src: string;
  }[];
  quantity: number;
}

interface UploadCartItemPayload {
  id: number;
  pid: number;
  size: string;
  color: string;
  quantity: number;
}

interface RespCartItem {
  id: number;
  pid: number;
  name: string;
  colors: string;
  sizes: string;
  price: number;
  imgs: string;
  quantity: number;
}

const initialState: CartItemsState = {
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
  async (upload_data: UploadCartItemPayload[]) => {
    const resp = await uploadCartItemsApi(upload_data);
    return JSON.stringify(resp);
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<AddCartItemPayload[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.req.isProcessing = true;
      state.err.isShow = false;
      state.err.msg = "";
    });
    builder.addCase(
      getCart.fulfilled,
      (state, action: PayloadAction<string>) => {
        let parsed_json = null;
        try {
          parsed_json = JSON.parse(action.payload);
        } catch {
          state.req.isProcessing = false;
          state.err.isShow = true;
          state.err.msg = API_RESP_PARSE_JSON_ERROR_MSG;
          return;
        }
        if (parsed_json.data.isSuccessful === API_RESP_FAILED_MSG) {
          if (parsed_json.data.msg === API_RESP_SESSION_NOT_SET_MSG) {
            const localCart = getCookie(COOKIE_GUEST_CART_NAME);
            if (localCart === undefined) {
              setCookie(COOKIE_GUEST_CART_NAME, JSON.stringify([]), 7);
              state.req.isProcessing = false;
            } else {
              state.items = JSON.parse(localCart);
              state.req.isProcessing = false;
            }
            return;
          }
          state.err.isShow = true;
          state.err.msg = API_RESP_SERVER_REJECT_OP_MSG;
        }
        if (parsed_json.data.isSuccessful === API_RESP_SUCCESSFUL_MSG) {
          state.items = parsed_json.data.data.map(
            (item: RespCartItem, index: number) => ({
              id: index,
              pid: item.pid,
              name: item.name,
              colors: JSON.parse(item.colors),
              sizes: JSON.parse(item.sizes),
              unitPrice: item.price,
              urls: JSON.parse(item.imgs),
              quantity: item.quantity,
            })
          );
        }
        state.req.isProcessing = false;
      }
    );
    builder.addCase(getCart.rejected, (state, action) => {
      state.req.isProcessing = false;
      state.err.isShow = true;
      state.err.msg = `${API_RESP_REQ_REJECT_ERR_MSG} ${action.error.message}`;
    });
    builder.addCase(uploadCart.pending, (state) => {
      state.req.isProcessing = true;
      state.err.isShow = false;
      state.err.msg = "";
    });
    builder.addCase(
      uploadCart.fulfilled,
      (state, action: PayloadAction<string>) => {
        let parsed_json = null;
        try {
          parsed_json = JSON.parse(action.payload);
        } catch {
          state.req.isProcessing = false;
          state.err.isShow = true;
          state.err.msg = API_RESP_PARSE_JSON_ERROR_MSG;
        }
        if (parsed_json.data.isSuccessful === API_RESP_FAILED_MSG) {
          state.err.isShow = true;
          state.err.msg = API_RESP_SERVER_REJECT_OP_MSG;
        }
        state.req.isProcessing = false;
      }
    );
    builder.addCase(uploadCart.rejected, (state, action) => {
      console.log(action);
      state.req.isProcessing = false;
      state.err.isShow = true;
      state.err.msg = `${API_RESP_REQ_REJECT_ERR_MSG} ${action.error.message}`;
    });
  },
});

export const { addCartItem } = cartSlice.actions;
export default cartSlice.reducer;
