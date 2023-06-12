export const reHydrateStoreWithCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("foody_cart") !== null) {
      return JSON.parse(localStorage.getItem("foody_cart"));
    }
  }
};

export const reHydrateStoreWithAuth = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("foody_auth") !== null) {
      return JSON.parse(localStorage.getItem("foody_auth"));
    }
  }
};
