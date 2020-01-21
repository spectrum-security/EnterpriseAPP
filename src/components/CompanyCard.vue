<template>
  <v-card raised outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{company.name}}</v-list-item-title>
        <v-list-item-subtitle></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80">
        <v-img :src="generateUrl" lazy-src="../assets/LogoSDAzul.png"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions class="ml-3">
      <v-btn text>Button</v-btn>
      <v-btn text>Button</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    company: Object
  },
  computed: {
    generateUrl() {
      return process.env.VUE_APP_BASE_URL + `files/image/${this.company.image}`;
    }
  }
};
</script>