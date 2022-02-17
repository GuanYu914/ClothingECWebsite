import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartReducer from "./reducers/cartSlice";
import favoriteItemsReducer from "./reducers/FavoriteItemsSlice";
import userReducer from "./reducers/userSlice";
import watchedItemsReducer from "./reducers/watchedItemsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favoriteItems: favoriteItemsReducer,
    user: userReducer,
    watchedItems: watchedItemsReducer,
  },
});
export default store;

// define root state and dispatch types
export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;

// define typed hooks
export const useReduxDispatch = () => useDispatch<ReduxDispatch>();
export const useReduxSelector: TypedUseSelectorHook<ReduxState> = useSelector;
