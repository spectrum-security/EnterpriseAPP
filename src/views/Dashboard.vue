<template>
  <div class="home">
    <Navbar />
    <Toolbar title="Dashboard" />
    <v-content class="content">
      <v-row class="mt-5">
        <v-col cols="6">
          <Graph title="Breaches in the last 7 days" :labels="dateLabels" :value="logValues" />
        </v-col>
        <v-col cols="6">
          <Graph title="Users" :labels="dateLabels" :value="logValues" />
        </v-col>
      </v-row>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import Graph from "../components/Graph";
import axios from "axios";

export default {
  name: "home",
  components: {
    Navbar,
    Toolbar,
    Graph
  },
  data: () => ({
    dateLabels: [],
    logValues: [1, 2, 4, 6, 0, 5, 2],
    userValues: [],
    users: [] // testing purposes
  }),
  mounted() {
    this.dateLabels = this.last7Days();
    axios.get("/users").then(data => {
      console.log(data);
      this.users = data;
    });
    console.log(this.users); // testing purposes
    // axios
    //   .get("/sensors")
    //   .then(data => {

    //   })
    //   .catch(err => {
    //     throw err;
    //   });
  },
  methods: {
    formatDate(date) {
      var dd = date.getDate();
      var mm = date.getMonth() + 1;
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      date = dd + "/" + mm;
      return date;
    },
    last7Days() {
      var result = [];
      for (var i = 0; i < 7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.unshift(this.formatDate(d));
      }
      return result;
    }
  }
};
</script>
