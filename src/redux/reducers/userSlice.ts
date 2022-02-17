import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  API_RESP_FAILED_MSG,
  API_RESP_PARSE_JSON_ERROR_MSG,
  API_RESP_REQ_REJECT_ERR_MSG,
  API_RESP_SERVER_REJECT_OP_MSG,
  API_RESP_SUCCESSFUL_MSG,
} from "../../constant";
import { getSessionDataApi, LogoutApi } from "../../Webapi";

interface UserState {
  info: {
    userId?: number;
    nickname?: string;
    account?: string;
    pass?: string;
  };
  req: {
    isProcessing: null | boolean;
  };
  err: {
    isShow: boolean;
    msg: string;
  };
}

const initialState: UserState = {
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.req.isProcessing = true;
      state.err.isShow = false;
      state.err.msg = "";
    });
    builder.addCase(
      getUser.fulfilled,
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
          state.info = {};
        }
        if (parsed_json.data.isSuccessful === API_RESP_SUCCESSFUL_MSG) {
          state.info = {
            userId: parsed_json.data.data.id,
            nickname: parsed_json.data.data.nickname,
            account: parsed_json.data.data.account,
            pass: parsed_json.data.data.password,
          };
        }
        state.req.isProcessing = false;
      }
    );
    builder.addCase(getUser.rejected, (state, action) => {
      state.req.isProcessing = false;
      state.err.isShow = true;
      state.err.msg = `${API_RESP_REQ_REJECT_ERR_MSG} ${action.error.message}`;
    });
    builder.addCase(logoutUser.pending, (state) => {
      state.req.isProcessing = true;
      state.err.isShow = false;
      state.err.msg = "";
    });
    builder.addCase(
      logoutUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        let parsed_json = null;
        try {
          parsed_json = JSON.parse(action.payload);
        } catch {
          state.req.isProcessing = false; // bug 修正 master
          state.err.isShow = true;
          state.err.msg = API_RESP_PARSE_JSON_ERROR_MSG;
          return;
        }
        if (parsed_json.data.isSuccessful === API_RESP_FAILED_MSG) {
          state.err.isShow = true;
          state.err.msg = API_RESP_SERVER_REJECT_OP_MSG;
        }
        if (parsed_json.data.isSuccessful === API_RESP_SUCCESSFUL_MSG) {
          state.info = {};
        }
        state.req.isProcessing = false;
      }
    );
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.req.isProcessing = false;
      state.err.isShow = true;
      state.err.msg = `${API_RESP_REQ_REJECT_ERR_MSG} ${action.error.message}`;
    });
  },
});

export default userSlice.reducer;
