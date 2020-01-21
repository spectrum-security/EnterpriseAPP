<template>
  <div class="home">
    <v-content class="content">
      <v-container>
        <Data-Table class="elevation-3" title="List of Logs" :loading="loading" :headers="headers" :items="logs" />
      </v-container>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import moment from "moment";
import DataTable from "../components/DataTable";

export default {
  name: "home",
  components: {
    DataTable
  },
  data: () => ({
    loading: false,
    headers: [
      { text: "Company", value: "sensorId.companyId.name" },
      { text: "Location", value: "sensorId.location" },
      { text: "Started", value: "started" },
      { text: "Finished", value: "finished" }
    ],
    logs: []
  }),
  async mounted() {
    await this.getLogs();
  },
  methods: {
    async getLogs() {
      try {
        this.loading = true;
        const res = await axios.get("/logs");
        this.logs = res.data.content.logs;
        this.logs.forEach(el => {
          el.started = moment(el.started).format("HH:mm / DD-MM-YYYY");
          el.finished = moment(el.finished).format("HH:mm / DD-MM-YYYY");
        });
        this.loading = false;
      } catch (error) {
        this.loading = false;
        throw error;
      }
    }
  },
  computed: {}
};
</script>
