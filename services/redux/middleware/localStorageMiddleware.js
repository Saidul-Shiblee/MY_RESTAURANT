export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (typeof window !== "undefined") {
    if (
      action.type === "cart/addToCart" ||
      action.type === "cart/removeFromCart"
    ) {
      localStorage.setItem("foody_cart", JSON.stringify(store.getState().cart));
    }
    if (action.type === "auth/signIn" || action.type === "auth/signOut") {
      localStorage.setItem("foody_auth", JSON.stringify(store.getState().auth));
    }
  }

  return result;
};
