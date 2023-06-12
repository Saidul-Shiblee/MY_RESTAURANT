import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";
import authReducer from "../features/authSlice";
import cartReducer from "../features/cartSlice";
import { reHydrateStoreWithCart, reHydrateStoreWithAuth } from "../helper";
import { localStorageMiddleware } from "../middleware/localStorageMiddleware";
apiSlice;
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  preloadedState: {
    cart: reHydrateStoreWithCart(),
    auth: reHydrateStoreWithAuth(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware, apiSlice.middleware),
});
