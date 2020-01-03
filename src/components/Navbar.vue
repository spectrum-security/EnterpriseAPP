<template>
  <div>
    <v-navigation-drawer absolute permanent class="menu" dark>
      <template>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title>
              <h1 class="menu-brand-text">
                <img src="../assets/LogoSDAzul.png" class="brand-avatar" /> Spectrum
              </h1>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>
      <template>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item :to="{ name: 'dashboard' }" active-class="secondary" link>
          <v-list-item-icon>
            <v-icon>far fa-chart-bar</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'companies' }" active-class="secondary" link>
          <v-list-item-icon>
            <v-icon>far fa-building</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Companies</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'surveillance' }" active-class="secondary" link>
          <v-list-item-icon>
            <v-icon>fas fa-shield-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Surveillance</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'settings' }" active-class="secondary" link>
          <v-list-item-icon>
            <v-icon>fas fa-cog</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-btn min-width="100%" class="secondary">Logout</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style lang="scss">
.menu {
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url("https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg");
  background-position: center center;
  background-size: cover;
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