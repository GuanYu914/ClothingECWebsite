import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

const watchedItemsSlice = createSlice({
  name: "watchedItems",
  initialState,
  reducers: {
    // 如果添加的產品已經在裡面了，則移動到第一個元素
    addWatchedItem: (state, action) => {
      state.items.forEach((item, index) => {
        if (item.id === action.payload.pid) {
          state.items.splice(index, 1);
        }
      });
      state.items.unshift(action.payload.item);
    },
    toggleItemLikedState: (state, action) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.pid
          ? { ...item, isLiked: !item.isLiked }
          : { ...item }
      );
    },
  },
});

export const { addWatchedItem, toggleItemLikedState } =
  watchedItemsSlice.actions;
export default watchedItemsSlice.reducer;
