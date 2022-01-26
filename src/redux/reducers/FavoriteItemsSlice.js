import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFavoriteItemsApi, uploadFavoriteItemsApi } from "../../Webapi";

// state structure
/* 
  {
    items: [
      {
        id: number,
        product: {
          name  : string,
          price : string,
          img   : string
        },
        isLiked: boolean
      }
    ],
    req: {
      isProcessing: false
    },
    err: {
      isShow: boolean,
      msg: string
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
export const getFavoriteItems = createAsyncThunk(
  "favoriteItems/getItems",
  async () => {
    const resp = await getFavoriteItemsApi();
    return JSON.stringify(resp);
  }
);

export const uploadFavoriteItems = createAsyncThunk(
  "favoriteItems/uploadItems",
  async (upload_data) => {
    const resp = await uploadFavoriteItemsApi(upload_data);
    return JSON.stringify(resp);
  }
);

const favoriteItemsSlice = createSlice({
  name: "favoriteItems",
  initialState,
  reducers: {
    addFavoriteItem(state, action) {
      state.items = action.payload;
    },
    removeFavoriteItem(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.pid
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFavoriteItems.pending, (state) => {
      state.req.isProcessing = true;
    });
    builder.addCase(getFavoriteItems.fulfilled, (state, action) => {
      let parsed_json = null;
      try {
        parsed_json = JSON.parse(action.payload);
      } catch {
        state.isProcessing = false;
        state.err.isShow = true;
        state.err.msg = "get response but parse JSON failed";
        return;
      }
      if (parsed_json.data.isSuccessful === "failed") {
        if (parsed_json.data.msg === "session variable not set") {
          // 用戶為訪客，不做任何事
          state.req.isProcessing = false;
          return;
        }
        state.err.isShow = true;
        state.err.msg = "server side reject this operation";
      }
      if (parsed_json.data.isSuccessful === "successful") {
        state.items = parsed_json.data.data.map((item) => ({
          id: item.id,
          product: {
            name: item.name,
            price: `${item.price}`,
            img: JSON.parse(item.imgs)[0].src,
          },
          isLiked: true,
        }));
      }
      state.req.isProcessing = false;
    });
    builder.addCase(getFavoriteItems.rejected, (state) => {
      state.req.isProcessing = false;
      // console.log("rejected: ", action.error);
      state.err.isShow = true;
      state.err.msg = "send request failed";
    });
    builder.addCase(uploadFavoriteItems.fulfilled, (state, action) => {
      let parsed_json = null;
      try {
        parsed_json = JSON.parse(action.payload);
      } catch {
        state.isProcessing = false;
        state.err.isShow = true;
        state.err.msg = "get response but parse JSON failed";
        return;
      }
      if (parsed_json.data.isSuccessful === "failed") {
        state.err.isShow = true;
        state.err.msg = "server side reject this operation";
      }
      state.req.isProcessing = false;
    });
    builder.addCase(uploadFavoriteItems.rejected, (state) => {
      state.req.isProcessing = false;
      // console.log("rejected: ", action.error);
      state.err.isShow = true;
      state.err.msg = "send request failed";
    });
  },
});

export const { addFavoriteItem, removeFavoriteItem } =
  favoriteItemsSlice.actions;
export default favoriteItemsSlice.reducer;
