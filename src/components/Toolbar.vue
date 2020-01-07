<template>
  <v-toolbar
    style="height: 75px;
  margin-top: 0px;
  transform: translateY(0px);
  left: 260px !important;
  right: 0px;
  padding: 0 10px 0 10px;
  width: auto;"
    absolute
    color="rgba(0,0,0,0)"
    flat
  >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <v-btn icon>
      <v-icon>fas fa-user</v-icon>
    </v-btn>-->
    <v-btn icon>
      <v-icon>fas fa-bell</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    title: {
      type: String
    }
  }
};
</script>

<style lang="scss"></style>
