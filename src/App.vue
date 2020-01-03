<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

export default {
  name: "App",

  components: {},

  data: () => ({
    //
  })
};
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";
</style>
