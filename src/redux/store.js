import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import favoriteItemsReducer from "./reducers/FavoriteItemsSlice";
import userReducer from "./reducers/userSlice";
import watchedItemsReducer from "./reducers/watchedItemsSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    favoriteItems: favoriteItemsReducer,
    user: userReducer,
    watchedItems: watchedItemsReducer,
  },
});
