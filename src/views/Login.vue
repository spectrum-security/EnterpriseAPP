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
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                outlined
                dense
                v-model="email"
                label="Email"
                name="email"
                prepend-icon="fas fa-at"
                type="email"
                :rules="emailRules"
                placeholder="Enter your email..."
              />
              <v-text-field
                outlined
                dense
                id="password"
                v-model="password"
                label="Password"
                name="password"
                :rules="passwordRules"
                prepend-icon="fas fa-lock"
                type="password"
                placeholder="Enter your password..."
              />
            </v-form>
            <h4 v-if="notFound">No user found</h4>
            <h4 v-if="wrongPassword">The password is incorrect</h4>
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
    valid: true,
    email: "",
    password: "",
    emailRules: [
      el => !!el || "Email is required",
      el => /.+@.+\..+/.test(el) || "Email must be valid"
    ],
    passwordRules: [el => !!el || "Password is required"],
    notFound: false,
    wrongPassword: false
  }),
  methods: {
    async login() {
      await this.validate();
      if (this.valid) {
        const res = await axios.post("/auth/login", {
          email: this.email,
          password: this.password
        });

        await this.$store.dispatch("setToken", res.data.content.jwt);
        await this.$store.dispatch("setLoggedUser", res.data.content.user);

        await localStorage.setItem("token", res.data.content.jwt);
        this.$router.push({ name: "dashboard" });
      }
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
