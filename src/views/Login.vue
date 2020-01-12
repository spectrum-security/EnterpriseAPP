<template>
  <v-content class="login-content">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col class="hero-container" cols="7"></v-col>
        <v-col class="form-container" cols="5">
          <v-row align="center" justify="center">
            <v-col class="text-center" cols="8">
              <h1 class="primary--text mb-10">Login</h1>
              <v-form ref="form" @submit.prevent="login" v-model="valid" lazy-validation>
                <v-text-field
                  outlined
                  validate-on-blur
                  v-model="email"
                  label="Email"
                  name="email"
                  prepend-inner-icon="fas fa-at"
                  type="email"
                  :rules="emailRules"
                  placeholder="Enter your email..."
                />
                <v-text-field
                  outlined
                  validate-on-blur
                  id="password"
                  v-model="password"
                  label="Password"
                  name="password"
                  :rules="passwordRules"
                  prepend-inner-icon="fas fa-lock"
                  type="password"
                  placeholder="Enter your password..."
                />
                <p
                  v-if="resError.length"
                  rounded
                  class="error--text text-center mb-5"
                >{{ resError }}</p>
                <v-row align="center" justify="center">
                  <v-col cols="6">
                    <a>Forgot your password?</a>
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      type="submit"
                      width="100%"
                      color="primary"
                      :loading="loading"
                      @click="login"
                    >Login</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    loading: false,
    email: "",
    password: "",
    emailRules: [
      el => !!el || "Email is required",
      el => /.+@.+\..+/.test(el) || "Email must be valid"
    ],
    passwordRules: [el => !!el || "Password is required"],
    resError: ""
  }),
  methods: {
    async login() {
      this.resError = "";
      this.loading = true;
      await this.validate();
      if (this.valid) {
        await axios
          .post("/auth/admin_login", {
            email: this.email,
            password: this.password
          })
          .then(res => {
            if (res.data.content.user.userType === 1) {
              this.$store.dispatch("setToken", res.data.content.jwt);
              this.$store.dispatch("setLoggedUser", res.data.content.user);
              this.$store.dispatch("setIsAuthenticated", true);
              this.loading = false;
              this.$router.push({ name: "dashboard" });
            }
          })
          .catch(err => {
            this.resError = err.response.data.message.en;
            this.loading = false;
          });
      }
      this.loading = false;
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  },
  computed: {}
};
</script>

<style lang="scss">
.login-content {
  padding: 0px 0px 0px 0px !important;
  margin: 0px !important;
  height: 100vh !important;
}

.container,
.hero-container,
.form-container {
  padding: 0px !important;
}

.hero-img {
  height: 100vh;
}

.hero-container {
  height: 100vh;
  // background: linear-gradient(to right bottom, #1374f2, #66a3f2);
  background-image: url("../assets/bg-login.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  background-color: black;
}
</style>
