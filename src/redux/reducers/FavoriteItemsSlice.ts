import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  API_RESP_FAILED_MSG,
  API_RESP_PARSE_JSON_ERROR_MSG,
  API_RESP_REQ_REJECT_ERR_MSG,
  API_RESP_SERVER_REJECT_OP_MSG,
  API_RESP_SESSION_NOT_SET_MSG,
  API_RESP_SUCCESSFUL_MSG,
} from "../../constant";
import { getFavoriteItemsApi, uploadFavoriteItemsApi } from "../../Webapi";

interface FavoriteItemsState {
  items: {
    id: number;
    product: {
      name: string;
      price: string;
      img: string;
    };
    isLiked: boolean;
  }[];
  req: {
    isProcessing: null | boolean;
  };
  err: {
    isShow: boolean;
    msg: string;
  };
}

interface AddFavoriteItemPayload {
  id: number;
  product: {
    name: string;
    price: string;
    img: string;
  };
  isLiked: boolean;
}

interface RemoveFavoriteItemPayload {
  pid: number;
}

export interface UploadFavoriteItemPayload {
  pid: number;
}

interface RespFavoriteItem {
  id: number;
  name: string;
  price: number;
  imgs: string;
}

const initialState: FavoriteItemsState = {
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
export const getFavoriteItems = createAsyncThunk(
  "favoriteItems/getItems",
  async () => {
    const resp = await getFavoriteItemsApi();
    return JSON.stringify(resp);
  }
);

export const uploadFavoriteItems = createAsyncThunk(
  "favoriteItems/uploadItems",
  async (upload_data: UploadFavoriteItemPayload[]) => {
    const resp = await uploadFavoriteItemsApi(upload_data);
    return JSON.stringify(resp);
  }
);

const favoriteItemsSlice = createSlice({
  name: "favoriteItems",
  initialState,
  reducers: {
    addFavoriteItem(state, action: PayloadAction<AddFavoriteItemPayload[]>) {
      state.items = action.payload;
    },
    removeFavoriteItem(
      state,
      action: PayloadAction<RemoveFavoriteItemPayload>
    ) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.pid
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFavoriteItems.pending, (state) => {
      state.req.isProcessing = true;
      state.err.isShow = false;
      state.err.msg = "";
    });
    builder.addCase(
      getFavoriteItems.fulfilled,
      (state, action: PayloadAction<string>) => {
        let parsed_json = null;
        try {
          parsed_json = JSON.parse(action.payload);
        } catch {
          state.req.isProcessing = false; // 修正 master
          state.err.isShow = true;
          state.err.msg = API_RESP_PARSE_JSON_ERROR_MSG;
          return;
        }
        if (parsed_json.data.isSuccessful === API_RESP_FAILED_MSG) {
          if (parsed_json.data.msg === API_RESP_SESSION_NOT_SET_MSG) {
            // 用戶為訪客，不做任何事
            state.req.isProcessing = false;
            return;
          }
          state.err.isShow = true;
          state.err.msg = API_RESP_SERVER_REJECT_OP_MSG;
        }
        if (parsed_json.data.isSuccessful === API_RESP_SUCCESSFUL_MSG) {
          try {
            state.items = parsed_json.data.data.map((item: RespFavoriteItem) => ({
              id: item.id,
              product: {
                name: item.name,
                price: `${item.price}`,
                img: JSON.parse(item.imgs)[0].src,
              },
              isLiked: true,
            }));
          } catch (e) {
            state.err.isShow = true;
            state.err.msg = API_RESP_PARSE_JSON_ERROR_MSG;
          }
        }
        state.req.isProcessing = false;
      }
    );
    builder.addCase(getFavoriteItems.rejected, (state, action) => {
      state.req.isProcessing = false;
      state.err.isShow = true;
      state.err.msg = `${API_RESP_REQ_REJECT_ERR_MSG} ${action.error.message}`;
    });
    builder.addCase(uploadFavoriteItems.pending, (state) => {
      state.req.isProcessing = true;
      state.err.isShow = false;
      state.err.msg = "";
    });
    builder.addCase(
      uploadFavoriteItems.fulfilled,
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
          state.err.isShow = true;
          state.err.msg = API_RESP_SERVER_REJECT_OP_MSG;
        }
        state.req.isProcessing = false;
      }
    );
    builder.addCase(uploadFavoriteItems.rejected, (state, action) => {
      state.req.isProcessing = false;
      state.err.isShow = true;
      state.err.msg = `${API_RESP_REQ_REJECT_ERR_MSG} ${action.error.message}`;
    });
  },
});

export const { addFavoriteItem, removeFavoriteItem } =
  favoriteItemsSlice.actions;
export default favoriteItemsSlice.reducer;
