<template>
  <v-card :loading="loading" dark class="gradient-card" raised>
    <v-row class="text-center">
      <v-col cols="12 mt-5">
        <v-icon x-large :color="icon.color">{{icon.name}}</v-icon>
      </v-col>
      <v-col cols="12">
        <h1 class="text-center">{{numberOf}}</h1>
        <v-card-text>{{text}}</v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    icon: Object,
    numberOf: Number,
    text: String,
    loading: Boolean
  }
};
</script>

<style>
.gradient-card {
  background: linear-gradient(to bottom right, #66a3f2, #1374f2);
}
</style>