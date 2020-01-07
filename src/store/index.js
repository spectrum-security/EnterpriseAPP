import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null
  },
  mutations: {
    SET_LOGGED_USER(state, user) {
      state.user = user;
    },

    SET_TOKEN(state, token) {
      state.token = token;
    }
  },
  actions: {
    setLoggedUser({ commit }, user) {
      commit("SET_LOGGED_USER", user);
    },

    setToken({ commit }, token) {
      commit("SET_TOKEN", token);
    }
  },
  modules: {}
});
