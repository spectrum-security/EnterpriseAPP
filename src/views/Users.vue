<template>
  <div class="home">
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
          @snackbarOpen="openSnackbar($event)"
          @openDeleteConfirm="openDialog($event)"
          @search="searchUsers($event)"
          @pageUpdate="pageUpdate($event)"
          @perPageUpdate="perPageUpdate($event)"
          @orderByUpdate="orderByUpdate($event)"
          @orderTypeUpdate="orderTypeUpdate($event)"
        />
        <Confirm-Dialog
          @confirmDelete="deleteItem(item)"
          @dialogClose="dialogOpen = false"
          :dialogOpen="dialogOpen"
          :dialogHeadline="dialogHeadline"
          :dialogText="dialogText"
          :loading="loadingDelete"
        />
        <Snackbar
          :open="snackbarOpen"
          :text="snackbarText"
          color="primary"
          @closeSnack="snackbarOpen = event"
        />
      </v-container>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Table from "../components/DataTable";
import ConfirmDialog from "../components/ConfirmDialog";
import Snackbar from "../components/Snackbar";
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    Table,
    ConfirmDialog,
    Snackbar
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
    totalUsers: null,
    page: 1,
    perPage: 10,
    orderBy: "email",
    orderType: "asc",
    dialogText: "",
    dialogHeadline: "",
    dialogOpen: false,
    loadingDelete: false,
    snackbarOpen: false,
    snackbarText: ""
  }),
  async beforeMount() {
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
        this.$store.dispatch("setUsers", res.data.content.users);
        // this.concatNames();
        this.totalUsers = res.data.totalUsers;
        this.loading = false;
      } catch (err) {
        throw err;
      }
    },
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
    openDialog(item) {
      this.item = item;
      this.dialogOpen = true;
      this.dialogHeadline = "You are about to delete a user!";
      this.dialogText = `Are you sure you want to delete the user ${item.name.first} ${item.name.last}, with email ${item.email}?`;
    },
    openSnackbar(item) {
      this.snackbarText = `User ${item.name.first} ${item.name.last} saved/edited`;
      this.snackbarOpen = true;
    },
    async deleteItem(item) {
      console.log(item);
      try {
        this.loadingDelete = true;
        const res = await axios.delete(`/users/${item._id}`);

        if (res.data.success) {
          this.dialogOpen = false;
          const index = this.users.indexOf(item);
          this.users.splice(index, 1);
          this.snackbarText = `User ${item.name.first} ${item.name.last} deleted`;
          this.snackbarOpen = true;
        }
      } catch (error) {
        throw error;
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
