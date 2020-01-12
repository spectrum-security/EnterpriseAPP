import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: "",
    user: {},
    isAuthenticated: false,
    users: []
  },
  mutations: {
    SET_LOGGED_USER(state, user) {
      state.user = user;
    },
    SET_IS_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USERS(state, users) {
      state.users = users;
    }
  },
  actions: {
    setLoggedUser({ commit }, user) {
      commit("SET_LOGGED_USER", user);
    },
    setIsAuthenticated({ commit }, isAuthenticated) {
      commit("SET_IS_AUTHENTICATED", isAuthenticated);
    },
    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    },
    setUsers({ commit }, users) {
      commit("SET_USERS", users);
    }
  },
  modules: {}
});
