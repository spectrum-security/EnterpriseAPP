<template>
  <div>
    <v-content class="content">
      <v-container>
        <v-tabs class="elevation-2" v-model="tabs" color="primary" background-color="white" left>
          <v-tab>
            Logs
            <v-icon class="ml-3">fas fa-list</v-icon>
          </v-tab>
          <v-tab>
            Users
            <v-icon class="ml-3">fas fa-users</v-icon>
          </v-tab>
          <v-tab>
            Maintenances
            <v-icon class="ml-3">fas fa-calendar</v-icon>
          </v-tab>
        </v-tabs>
        <v-tabs-items class="elevation-2" v-model="tabs">
          <v-tab-item>
            <v-row justify="center">
              <v-col cols="12" md="6"></v-col>
              <v-col cols="12" md="4">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="date"
                      class="mt-5"
                      dense
                      outlined
                      label="Picker without buttons"
                      prepend-icon="fas fa-calendar"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @click:date="getLogs" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="10">
                <h1 v-if="!logs.length" class="primary--text text-center mb-10">No logs on this date</h1>
                <v-timeline v-if="logs.length" align-top dense>
                  <v-timeline-item v-for="(log, index) in logs" :key="index">
                    <v-card class="white--text" color="primary">
                      <v-card-title class="headline">
                        <v-icon color="white" class="mr-5">fas fa-running</v-icon>
                        {{log.sensorId.location}}
                      </v-card-title>
                      <v-card-text
                        class="white--text"
                      >Started: {{log.started}} Finished: {{log.finished}}</v-card-text>
                    </v-card>
                  </v-timeline-item>
                </v-timeline>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <Data-Table
              :title="computeTitle"
              :headers="headers"
              :items="users"
              :isUsersTable="false"
              searchLabel="Search Users"
            />
          </v-tab-item>
          <v-tab-item>hey</v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import DataTable from "../components/DataTable";

export default {
  components: { DataTable },
  data: () => ({
    tabs: 0,
    loading: true,
    logs: [],
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    company: {},
    users: [],
    headers: [
      { text: "Email", value: "email" },
      { text: "First Name", value: "name.first" },
      { text: "Last Name", value: "name.last" },
      { text: "Created", value: "createdAt" }
    ]
  }),
  methods: {
    async getCompany() {
      try {
        const res = await axios.get(`/companies/${this.$route.params.id}`);
        this.company = res.data.company;
      } catch (error) {
        console.log(error);
      }
    },
    async getUsers() {
      try {
        const res = await axios.get(
          `/companies/${this.$route.params.id}/users`
        );
        this.users = res.data.content.users;
        this.users.map(
          el => (el.createdAt = moment(el.createdAt).format("DD-MM-YYYY"))
        );
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async getLogs() {
      try {
        this.loading = true;
        // const getSensors = await axios.get(
        //   `/sensors/company_sensors/${this.$route.params.id}`
        // );
        // console.log(getSensors.data.content.sensors);

        // const body = {
        //   sensors: getSensors.data.content.sensors
        // };
        const res = await axios.get(
          `/logs/company_sensors/${this.$route.params.id}`,
          {
            params: {
              date: this.date
            }
          }
        );
        this.logs = res.data.content.logs;
        this.logs.forEach(el => {
          el.started = moment(el.started).format("HH:mm / DD-MM-YYYY");
          el.finished = moment(el.finished).format("HH:mm / DD-MM-YYYY");
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  },
  async mounted() {
    await this.getCompany();
    await this.getUsers();
    await this.getLogs();
  },
  computed: {
    computeTitle() {
      return `${this.company.name} Users`;
    }
  }
};
</script>