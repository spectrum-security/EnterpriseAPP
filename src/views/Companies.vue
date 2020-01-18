<template>
  <div class="home">
    <v-content>
      <v-row>
        <v-col>
          <companyCards />
        </v-col>
      </v-row>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import CompanyCards from "../components/CompanyCards";

export default {
  name: "home",
  components: {
    CompanyCards
  },
  methods: {}
};
</script>
