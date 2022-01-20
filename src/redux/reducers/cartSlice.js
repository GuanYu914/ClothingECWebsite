import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: "cart" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
});

export default cartSlice.reducer;
