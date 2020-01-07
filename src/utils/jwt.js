import store from "../store/index";

export const getJwt = () => {
  try {
    return store.state.token;
  } catch {
    console.log("Error getting token");
  }
};
export const clearJwt = () => {
  try {
    return store.dispatch("setToken", null);
  } catch {
    console.log("Error removing token");
  }
};
export const setJwt = token => {
  try {
    store.dispatch("setToken", token);
  } catch {
    console.log("Error setting token");
  }
};

export const getUser = () => {
  try {
    return store.state.user;
  } catch {
    console.log("Error retrieving user");
  }
};
export const clearUser = () => {
  try {
    return store.dispatch("setLoggedUser", null);
  } catch {
    console.log("Error clearing user");
  }
};
export const setUser = token => {
  try {
    store.dispatch("setLoggedUser", JSON.stringify(token));
  } catch {
    console.log("Error setting user");
  }
};
