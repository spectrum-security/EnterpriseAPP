<template>
  <div class="home">
    <Navbar />
    <Toolbar title="Users" />
    <v-content class="content">
      <v-row justify="center" class="mt-5 mx-auto">
        <v-col cols="11">
          <Table
            title="List of Users"
            :headers="headers"
            :items="users"
            :loading="loading"
            :isUsersTable="true"
            :page="page"
            :perPage="perPage"
            :totalRecords="totalUsers"
            @search="searchUsers($event)"
            @pageUpdate="pageUpdate($event)"
            @perPageUpdate="perPageUpdate($event)"
          />
        </v-col>
      </v-row>
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
      { text: "Name", value: "name" },
      { text: "Company", value: "companyId.name" },
      { text: "Actions", value: "action", sortable: false }
    ],
    loading: false,
    totalUsers: null,
    page: 1,
    perPage: 5,
    orderBy: "email"
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
            orderType: "asc"
          }
        });
        this.$store.dispatch("setUsers", res.data.content.users);
        this.concatNames();
        this.totalUsers = res.data.totalUsers;
        this.loading = false;
      } catch (err) {
        throw err;
      }
    },
    concatNames() {
      this.users.forEach(user => {
        user.name = user.name.first + " " + user.name.last;
      });
    },
    async searchUsers(searchText) {
      try {
        console.log("emited");
        this.loading = true;
        const res = await axios.get("/users", {
          params: {
            search: searchText
          }
        });
        this.$store.dispatch("setUsers", res.data.content.users);
        this.totalUsers = res.data.totalUsers;
        this.concatNames();
        this.loading = false;
      } catch (err) {
        this.loading = false;
        throw err;
      }
    },
    pageUpdate(event) {
      this.page = event;
      console.log(event);
      this.getUsers();
    },
    perPageUpdate(event) {
      this.perPage = event;
      this.getUsers();
    }
  },
  computed: {
    ...mapState(["users"])
  }
};
</script>
