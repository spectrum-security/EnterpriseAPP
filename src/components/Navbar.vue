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
      <!-- <v-list dense>
        <v-list-group active-class="secondary--text">
          <template v-slot:activator>
            <v-list-item-avatar>
              <img v-if="user && user.profilePic" :src="user.profilePic" alt />
              <v-icon v-else large>fas fa-user-circle</v-icon>
            </v-list-item-avatar>
            <v-list-item-title v-if="user">
              {{
              user.name.first + " " + user.name.last
              }}
            </v-list-item-title>
          </template>
          <v-list-item active-class="secondary" link>
            <v-list-item-icon>
              <v-icon>fas fa-cog</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Account Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>-->
      <template>
        <v-list-item two-line>
          <v-list-item-avatar>
            <v-icon x-large>fas fa-user-circle</v-icon>
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
        <v-list-item :to="{ name: 'dashboard' }" active-class="primary white--text" link>
          <v-list-item-icon>
            <v-icon small>fas fa-tachometer-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'companies' }" active-class="primary white--text" link>
          <v-list-item-icon>
            <v-icon small>far fa-building</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Companies</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'surveillance' }" active-class="primary white--text raised" link>
          <v-list-item-icon>
            <v-icon small>fas fa-shield-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Surveillance</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'users' }" active-class="primary white--text" link>
          <v-list-item-icon>
            <v-icon small>fas fa-users</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{ name: 'settings' }" active-class="primary white--text" link>
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
          <v-btn @click="logout" class="primary" block>Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { clearJwt, clearUser } from "../utils/jwt";

export default {
  data: () => ({}),
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
  }
};
</script>

<style lang="scss">
.menu {
  // background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
  //   url("../assets/menu-image.jpg");
  // background-position: center center;
  // background-size: cover;
  background-color: #e3e8ee !important;
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
</style>
