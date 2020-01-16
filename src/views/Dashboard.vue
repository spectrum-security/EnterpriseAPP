<template>
  <div class="home">
    <Navbar />
    <Toolbar title="Dashboard" />
    <v-content class="content">
      <v-container>
        <v-row>
          <v-col cols="3" md="3">
            <Info-Card
              id="breaches-card"
              headline="Breaches"
              text="Breaches in the last 7 days"
              :icon="logsIcon"
              :numberOf="logsCount"
              :loading="loading"
            />
          </v-col>
          <v-col cols="3" md="3">
            <Info-Card
              id="breaches-card"
              headline="Breaches"
              text="Users created in the last 7 days"
              :icon="usersIcon"
              :numberOf="usersCount"
              :loading="loading"
            />
          </v-col>
          <v-col cols="3" md="3">
            <Info-Card
              id="breaches-card"
              headline="Breaches"
              text="Number of breaches"
              :icon="logsIcon"
              :numberOf="logsCount"
              :loading="loading"
            />
          </v-col>
          <v-col cols="3" md="3">
            <Info-Card
              id="breaches-card"
              headline="Breaches"
              text="Number of breaches"
              :icon="logsIcon"
              :numberOf="logsCount"
              :loading="loading"
            />
          </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col cols="6">
            <Graph title="Breaches in the last 7 days" :labels="dateLabels" :value="logValues" />
          </v-col>
          <v-col cols="6">
            <Graph title="Users" :labels="dateLabels" :value="logValues" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import Graph from "../components/Graph";
import InfoCard from "../components/InfoCard";
import axios from "axios";

export default {
  name: "home",
  components: {
    Navbar,
    Toolbar,
    Graph,
    InfoCard
  },
  data: () => ({
    loading: false,
    dateLabels: [],
    logValues: [0, 2, 4, 6, 0, 5, 2],
    logsIcon: {
      name: "fas fa-shield-alt",
      color: "white"
    },
    logsCount: null,
    usersCount: null,
    usersIcon: {
      name: "fas fa-users",
      color: "white"
    }
  }),
  async mounted() {
    this.loading = true;
    this.dateLabels = this.last7Days();
    await this.createdUsersThisWeek();
    // await this.getActiveSensors();
    await this.getThisWeeksLogs();
    // await this.getProfits;
    this.loading = false;
  },
  methods: {
    async createdUsersThisWeek() {
      try {
        const res = await axios.get("/users/created/last_7_days");
        this.usersCount = res.data.totalRecords;
      } catch (error) {
        throw error;
      }
    },
    async getThisWeeksLogs() {
      try {
        const res = await axios.get("/logs/last_7_days");
        this.logsCount = res.data.totalRecords;
      } catch (error) {
        throw error;
      }
    },
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
