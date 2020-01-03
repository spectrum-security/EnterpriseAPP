<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text class="mt-5">
            <v-form>
              <v-text-field
                outlined
                dense
                v-model="email"
                label="Email"
                name="email"
                prepend-icon="fas fa-at"
                type="email"
                :error="emailError.length"
                :error-messages="emailError"
                placeholder="Enter your email..."
              />
              <v-text-field
                outlined
                dense
                id="password"
                v-model="password"
                label="Password"
                name="password"
                :error="passwordError.length"
                :error-messages="passwordError"
                prepend-icon="fas fa-lock"
                type="password"
                placeholder="Enter your password..."
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    email: "",
    password: "",
    emailError: "",
    passwordError: ""
  }),
  methods: {
    async login() {
      this.checkFields();
      if (!this.emailError && !this.passwordError) {
        await axios
          .post("/auth/login", {
            email: this.email,
            password: this.password
          })
          .then(data => console.log(data));
      }
    },

    // if (!this.emailError && !this.passwordError) {
    //       await this.$store.dispatch("setToken", res.data.token);
    //       await this.$store.dispatch("setLoggedUser", res.data.user);

    //       localStorage.setItem("token", this.$store.state.token);
    //       this.$router.push({ name: "dashboard" });
    //     }
    checkFields() {
      this.email === ""
        ? (this.emailError = "Email is required")
        : (this.emailError = "");

      this.password === ""
        ? (this.passwordError = "Password is required")
        : (this.passwordError = "");
    }
  },
  computed: {}
};
</script>

<style lang="scss">
// .login-container {
//   padding: 0 !important;
// }

// #left-hero {
//   background: linear-gradient(to bottom right, #1374f2, #66a3f2);
//   height: 100vh;
// }

// .hero-shield {
//   box-shadow: -12px -12px 12px 0 rgba($color: white, $alpha: 1),
//     -12px -12px 12px 0 rgba($color: black, $alpha: 0.03);
// }
</style>
