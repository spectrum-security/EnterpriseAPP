<template>
  <div class="home">
    <Navbar />
    <Toolbar title="Users" />
    <v-content class="content">
      <v-container>
        <Table
          class="elevation-2"
          title="List of Users"
          :headers="headers"
          :items="users"
          :loading="loading"
          :isUsersTable="true"
          :page="page"
          :perPage="perPage"
          :totalRecords="totalUsers"
          searchLabel="Search Users"
          @search="searchUsers($event)"
          @pageUpdate="pageUpdate($event)"
          @perPageUpdate="perPageUpdate($event)"
          @orderByUpdate="orderByUpdate($event)"
          @orderTypeUpdate="orderTypeUpdate($event)"
        />
      </v-container>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import Table from "../components/DataTable";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    Navbar,
    Toolbar,
    Table
  },
  data: () => ({
    headers: [
      { text: "Email", value: "email" },
      { text: "First Name", value: "name.first" },
      { text: "Last Name", value: "name.last" },
      { text: "Company", value: "companyId.name" },
      { text: "Actions", value: "action", sortable: false }
    ],
    loading: false,
    totalUsers: null,
    page: 1,
    perPage: 10,
    orderBy: "email",
    orderType: "asc"
  }),
  async mounted() {
    this.getUsers();
  },
  methods: {
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
    },
    // concatNames() {
    //   this.users.forEach(user => {
    //     user.name = user.name.first + " " + user.name.last;
    //   });
    // },
    async searchUsers(searchText) {
      try {
        this.loading = true;
        const res = await axios.get("/users", {
          params: {
            search: searchText
          }
        });
        this.$store.dispatch("setUsers", res.data.content.users);
        this.totalUsers = res.data.totalUsers;
        // this.concatNames();
        this.loading = false;
      } catch (err) {
        this.loading = false;
        throw err;
      }
    },
    pageUpdate(event) {
      this.page = event;
      this.getUsers();
    },
    perPageUpdate(event) {
      this.perPage = event;
      this.getUsers();
    },
    orderByUpdate(event) {
      this.orderBy = event[0];
      this.getUsers();
    },
    orderTypeUpdate(event) {
      event[0] === true ? (this.orderType = "desc") : (this.orderType = "asc");
      this.getUsers();
    }
  },
  computed: {
    ...mapState(["users"])
  }
};
</script>
