<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import axios from "axios";
import { getJwt, clearJwt, clearUser, setUser } from "./utils/jwt";

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  methods: {
    me() {
      axios
        .get("/auth/me")
        .then(res => {
          const me = res.data.content.users;
          if (me) {
            setUser(me);
            this.$store.dispatch("setLoggedUser", me);
          } else {
            const Exception = { message: "Unexpected error" };
            throw Exception;
          }
        })
        .catch(err => {
          this.$store.dispatch("setLoggedUser", null);
          clearJwt();
          clearUser();
          throw err;
        });
    },

    initAuth() {
      clearUser();
      const jwt = getJwt();
      if (!jwt) {
        this.$store.dispatch("setToken", null);
        this.$store.dispatch("setLoggedUser", null);
      }

      axios.interceptors.request.use(
        config => {
          const jwtAxios = getJwt();
          config.headers.authorization = "";
          if (jwtAxios) {
            config.headers.authorization = "Bearer " + jwtAxios;
          }
          return config;
        },
        error => Promise.reject(error)
      );

      if (jwt) {
        this.me(jwt);
      }
    }
  },
  computed: {},
  async beforeMount() {
    try {
      await this.initAuth();
    } catch (error) {
      throw error;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";
.v-application {
  background-color: #e3e8ee !important;
}

.content {
  padding: 75px 0px 0px 260px !important;
}
</style>
