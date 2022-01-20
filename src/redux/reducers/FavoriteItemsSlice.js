import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const favoriteItemsSlice = createSlice({
  name: "favoriteItems",
  initialState,
});

export default favoriteItemsSlice.reducer;
