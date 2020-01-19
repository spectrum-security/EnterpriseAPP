<template>
  <div class="home">
    <Toolbar title="Companies" />
    
    <v-content class="content">
      <v-container>
        <v-tabs class="elevation-2" v-model="tabs" color="primary" background-color="white" left>
          <v-tab>
            Users
            <v-icon class="ml-3">fas fa-users</v-icon>
          </v-tab>
          <v-tab>
            Occurence
            <v-icon class="ml-3">fas fa-list</v-icon>
          </v-tab>
          <v-tab>
            Maintenance
            <v-icon class="ml-3">fas fa-tools</v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items class="elevation-2" v-model="tabs">
          <v-tab-item>
            <v-row align="center" no-gutters class="mb-0 pb-0">
              <v-col cols="6" md="6">
                <v-card-title class="headline mb-2 pb-2">List of Users</v-card-title>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <Table
                  v-if="getUsers"
                  class="elevation-2"
                  title="List of Users"
                  :headers="headers"
                  :items="users"
                  :loading="loading"
                  :isUsersTable="true"
                  :page="page"
                  :perPage="perPage"
                  :totalRecords="totalUsers"
                  @pageUpdate="pageUpdate($event)"
                  @perPageUpdate="perPageUpdate($event)"
                  @orderByUpdate="orderByUpdate($event)"
                  @orderTypeUpdate="orderTypeUpdate($event)"
                />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-card-title class="headline">Occurence</v-card-title>
            <v-card-text>
                <Timeline />
            </v-card-text>
          </v-tab-item>
          <v-tab-item>
            
            <v-card-text>
                <Calendar />
            </v-card-text>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-content>
  </div>
</template>
<script>
// @ is an alias to /src
import axios from "axios";
import Table from "../components/DataTable";
import Timeline from "../components/Timeline";
import Calendar from "../components/Calendar";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    Table,
    Timeline,
    Calendar
  },
  data: () => ({
    headers: [
      { text: "Email", value: "email" },
      { text: "First Name", value: "name.first" },
      { text: "Last Name", value: "name.last" },
      { text: "Company", value: "companyId.name" },
      { text: "Type", value: "userType" },
      { text: "Actions", value: "action", sortable: false }
    ],
    loading: false,
    loadingSave: false,
    totalRecords: null,
    page: 1,
    perPage: 10,
    orderBy: "title",
    orderType: "asc",
    tabs: null
  }),
  methods: {
    //   getCompany() {
    //   axios
    //     .get(`/companies/${id}`)
    //     .then(res => {
    //       console.log(res);
    //       this.companies = res.data.company;
    //       console.log(this.companies);
    //     })
    //     .catch(err => {
    //       throw err;
    //     });
    // },
    async getUsers() {
      try {
        this.loading = true;
        const res = await axios.get(`/users`, {
          params: {
            page: this.page,
            perPage: this.perPage,
            orderBy: this.orderBy,
            orderType: this.orderType
          }
        });
        console.log(res.data.content.users);
        this.$store.dispatch("setUsers", res.data.content.users);
        // this.concatNames();
        this.totalUsers = res.data.totalUsers;
        this.loading = false;
      } catch (err) {
        throw err;
      }
    }
    // concatNames() {
    //   this.users.forEach(user => {
    //     user.name = user.name.first + " " + user.name.last;
    //   });
    // },
  },
  computed: {
    ...mapState(["users"])
  }
};
</script>