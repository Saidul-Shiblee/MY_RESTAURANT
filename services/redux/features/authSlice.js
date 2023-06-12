import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const cartSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      return action.payload;
    },
    signOut: (state, action) => {
      return initialState;
    },
    refresh: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { signIn, signOut, refresh } = cartSlice.actions;

export const getAuth = (state) => state?.auth;

export default cartSlice.reducer;
