import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const userSlice = createSlice({
  name: "user",
  initialState,
});

export default userSlice.reducer;
