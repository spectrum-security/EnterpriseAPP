<template>
  <v-tabs v-model="tab" centered grow>
    <v-tabs-slider></v-tabs-slider>
    <v-tab v-for="i in tabs" :key="i">
      Tab {{ i }}
      <v-icon v-if="icons">mdi-phone</v-icon>
    </v-tab>

    <v-tab-item v-for="i in tabs" :key="i" :value="'tab-' + i">
      <v-card flat tile>
        <v-card-text>{{ text }}</v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
export default {
  props: {
    tabs: Array
  }
};
</script>