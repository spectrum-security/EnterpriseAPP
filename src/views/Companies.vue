<template>
  <div class="home">
    <v-content class="content">
      <v-container>
        <Company-Card />
      </v-container>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import CompanyCard from "../components/CompanyCard";

export default {
  name: "home",
  components: {
    CompanyCard
  },
  methods: {}
};
</script>
