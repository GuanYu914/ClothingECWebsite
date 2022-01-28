import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSessionDataApi, LogoutApi } from "../../Webapi";

// state structure
/* 
  {
    info: {
      userId  : number,
      nickname: string,
      account : string,
      pass    : string,
    },
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
  info: {},
  req: {
    isProcessing: null,
  },
  err: {
    isShow: false,
    msg: "",
  },
};

export const getUser = createAsyncThunk("user/getUser", async () => {
  const resp = await getSessionDataApi();
  return JSON.stringify(resp);
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  const resp = await LogoutApi();
  return JSON.stringify(resp);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.info = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.req.isProcessing = true;
      state.err.isShow = false;
      state.err.msg = "";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      let parsed_json = null;
      try {
        parsed_json = JSON.parse(action.payload);
      } catch {
        state.req.isProcessing = false;
        state.err.isShow = true;
        state.err.msg = "get response but parse JSON failed";
        return;
      }
      if (parsed_json.data.isSuccessful === "failed") {
        state.info = {};
      }
      if (parsed_json.data.isSuccessful === "successful") {
        state.info = {
          userId: parsed_json.data.data.id,
          nickname: parsed_json.data.data.nickname,
          account: parsed_json.data.data.account,
          pass: parsed_json.data.data.password,
        };
      }
      state.req.isProcessing = false;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.req.isProcessing = false;
      state.err.isShow = true;
      state.err.msg = `send request failed. type is: ${action.error.message}`;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.req.isProcessing = true;
      state.err.isShow = false;
      state.err.msg = "";
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
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
      if (parsed_json.data.isSuccessful === "successful") {
        state.info = {};
      }
      state.req.isProcessing = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.req.isProcessing = false;
      state.err.isShow = true;
      state.err.msg = `send request failed. type is: ${action.error.message}`;
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
