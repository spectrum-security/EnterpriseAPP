<template>
  <div>
    <v-navigation-drawer absolute permanent class="menu">
      <template>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>
              <h1 class="menu-brand-text">
                <img src="../assets/LogoSDAzul.png" class="brand-avatar" />
                Spectrum
              </h1>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <template>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-img :src="avatarSrc" alt></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-if="user">
              {{
              user.name.first + " " + user.name.last
              }}
            </v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          exact
          :to="{ name: 'Dashboard' }"
          active-class="primary white--text rounded"
          link
        >
          <v-list-item-icon>
            <v-icon small>fas fa-tachometer-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'Companies' }" active-class="primary white--text rounded" link>
          <v-list-item-icon>
            <v-icon small>far fa-building</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Companies</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'Surveillance' }" active-class="primary white--text rounded" link>
          <v-list-item-icon>
            <v-icon small>fas fa-shield-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Surveillance</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'Users' }" active-class="primary white--text rounded" link>
          <v-list-item-icon>
            <v-icon small>fas fa-users</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'Settings' }" active-class="primary white--text rounded" link>
          <v-list-item-icon>
            <v-icon small>fas fa-cogs</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn @click="logout" class="primary" elevation="10" block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { clearJwt, clearUser } from "../utils/jwt";

export default {
  data: () => ({
    avatarSrc: ""
  }),
  methods: {
    logout() {
      try {
        clearUser();
        clearJwt();
        this.$store.dispatch("setIsAuthenticated", false);
        this.$router.push({ name: "login" });
      } catch (error) {
        throw error;
      }
    }
  },
  computed: {
    ...mapState(["user"])
  },
  watch: {
    user() {
      return (this.avatarSrc =
        process.env.VUE_APP_BASE_URL + `files/image/${this.user.avatar}`);
    }
  }
};
</script>

<style lang="scss">
.menu {
  // background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  //   url("../assets/menu-image.jpg");
  // background-position: center center;
  // background-size: cover;
  background-color: #f2f2f2 !important; //#e3e8ee alternative
  border-right: none;
}

.menu-brand-text {
  font-family: "Codec Cold Regular";
}

.v-list-item {
  margin: 10px;
}

.brand-avatar {
  height: 40px;
  width: 40px;
  vertical-align: middle;
  margin-right: 5px;
}

.v-divider {
  width: calc(100% - 30px);
  margin-left: 15px;
}

.rounded {
  border-radius: 5px;
  background: linear-gradient(to bottom right, #1374f2, #66a3f2);
  -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  -moz-box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>
