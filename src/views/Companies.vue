<template>
  <div class="home">
    <Navbar />
    <Toolbar title="Companies" />
    <v-content>
      <v-row>
        <v-col><companyCards/></v-col>
      </v-row>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import CompanyCards from "../components/CompanyCards"

export default {
  name: "home",
  components: {
    Navbar,
    Toolbar,
    CompanyCards
  },
  methods: {}
};
</script>
