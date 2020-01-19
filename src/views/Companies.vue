<template>
  <div class="home">
    <v-content class="content">
      <v-container>
        <v-row no-gutters>
          <CardCompany />
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from "axios";
import CardCompany from "../components/CompanyCards.vue";

export default {
  name: "home",
  components: {
    CardCompany
  },
  data: () => ({
    loading: false,
    selection: 1,
    companies: []
  })
  // methods: {
  //   getCompany() {
  //     axios
  //       .get("/companies")
  //       .then(res => {
  //         console.log(res);
  //         this.companies = res.data.company;
  //         console.log(this.companies);
  //       })
  //       .catch(err => {
  //         throw err;
  //       });
  //   }
  // },
  // mounted() {
  //   this.getCompany();
  // }
};
</script>
