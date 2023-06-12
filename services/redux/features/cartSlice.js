import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (
        state?.items?.find(
          (el) =>
            el.productId === action.payload.productId &&
            el.size === action.payload.size &&
            _.isEqual(el.option, action.payload.option)
        )
      ) {
        state?.items?.map((el) => {
          if (
            el.productId === action.payload.productId &&
            el.size === action.payload.size &&
            _.isEqual(el.option, action.payload.option)
          ) {
            el.quantity = Number(el.quantity) + 1;
          }
          return el;
        });
      } else {
        state?.items?.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const itemToremove = state.items.find(
        (el) =>
          el.productId === action.payload.productId &&
          el.size === action.payload.size &&
          _.isEqual(el.option, action.payload.option)
      );

      if (itemToremove.quantity >= 2) {
        state?.items?.map((el) => {
          if (
            el.productId === action.payload.productId &&
            el.size === action.payload.size &&
            _.isEqual(el.option, action.payload.option)
          ) {
            el.quantity = Number(el.quantity) - 1;
          }
          return el;
        });
      } else {
        let newState = state?.items?.filter(
          (el) =>
            el.productId + el.size + el.option !==
            action.payload.productId +
              action.payload.size +
              action.payload.option
        );
        return { items: newState };
      }
    },
    resetCart: () => {
      return { items: [] };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  resetCart,
  setMessage,
  resetMessage,
} = cartSlice.actions;

export const getItems = (state) => state.cart.items;
export const getTotal = (state) =>
  state?.cart?.items?.reduce((iV, cV) => {
    return iV + cV.productPrice * cV.quantity;
  }, 0);
export const getTotalNoOfOrder = (state) =>
  state?.cart?.items?.reduce((iV, cV) => {
    return iV + Number(cV.quantity);
  }, 0);

export default cartSlice.reducer;
