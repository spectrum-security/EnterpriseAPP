<template>
  <div>
    <v-navigation-drawer light floating v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link :to="{ name: 'dashboard' }" active-class="secondary--text">
          <v-list-item-action>
            <v-icon>far fa-chart-bar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>far fa-building</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Companies</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>fas fa-shield-alt</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Monitoring</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>fas fa-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-btn min-width="100%" color="secondary">Logout</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar light app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <img class="navbar-brand" src="../assets/LogoSDAzul.png" alt srcset />
      <v-toolbar-title class="logo-text">Spectrum</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: false
  })
};
</script>


<style lang="scss">
.navbar-brand {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.logo-text {
  font-family: "Codec Cold Regular";
}
</style>