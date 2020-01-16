<template>
  <div>
    <v-data-table
      :sort-by="orderBy"
      :sort-desc="orderType"
      :headers="headers"
      :items="items"
      :loading="loading"
      :page="page"
      :items-per-page="perPage"
      :server-items-length="totalRecords"
      @update:page="event => $emit('pageUpdate', event)"
      @update:items-per-page="event => $emit('perPageUpdate', event)"
      @update:sort-by="event => $emit('orderByUpdate', event)"
      @update:sort-desc="event => $emit('orderTypeUpdate', event)"
    >
      <template v-slot:top>
        <v-toolbar flat color="primary">
          <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
          <v-form @submit.prevent="$emit('search', searchText)">
            <v-text-field
              class="white ml-5"
              v-model="searchText"
              outlined
              dense
              append-icon="fas fa-search"
              :label="searchLabel"
              single-line
              hide-details
            ></v-text-field>
          </v-form>
          <v-spacer></v-spacer>
          <v-btn v-if="isUsersTable" color="accent--text white" @click="openDialogNewUser">New User</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small color="secondary" class="mr-2" @click="editItem(item)">fas fa-user-edit</v-icon>
        <v-icon small color="error" @click="openDialog(item)">fas fa-trash</v-icon>
      </template>
      <template v-slot:no-data>
        <p class="accent--text">No Data returned</p>
      </template>
    </v-data-table>
    <Snackbar
      :open="snackbarOpen"
      :text="snackbarText"
      color="primary"
      @closeSnack="snackbarOpen = event"
    />
    <Confirm-Dialog
      @confirmDelete="deleteItem(item)"
      @dialogClose="dialogOpen = false"
      :dialogOpen="dialogOpen"
      :dialogHeadline="dialogHeadline"
      :dialogText="dialogText"
      :loading="loadingDelete"
    />
    <New-User-Dialog
      :route="routeForDialog"
      :open="userDialog"
      :editedItem="editedItem"
      :companies="companiesForDialog"
      @close="close"
      max-width="500px"
    />
  </div>
</template>

<script>
import axios from "axios";
import Snackbar from "./Snackbar";
import ConfirmDialog from "./ConfirmDialog";
import NewUserDialog from "./NewUserDialog";

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    search: String,
    loading: Boolean,
    isUsersTable: Boolean,
    page: Number,
    perPage: Number,
    orderBy: String,
    orderType: String,
    totalRecords: Number,
    searchLabel: String,
    companies: Array
  },
  components: {
    Snackbar,
    ConfirmDialog,
    NewUserDialog
  },
  data: () => ({
    editedItem: {
      email: "",
      name: {
        first: "",
        last: ""
      },
      companyId: {},
      avatar: null
    },
    item: {},
    userDialog: false,
    searchText: "",
    formTitle: "Modal",
    snackbarOpen: false,
    snackbarText: "",
    dialogOpen: false,
    dialogHeadline: "",
    dialogText: "",
    companiesForDialog: [],
    loadingDelete: false,
    routeForDialog: {
      method: "",
      endpoint: "d"
    }
  }),
  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      if (!this.companiesForDialog.length) this.getCompanies();
      this.routeForDialog = {
        method: "put",
        endpoint: `/users/${this.editedItem.id}`
      };
      this.userDialog = true;
    },
    openDialog(item) {
      this.item = item;
      this.dialogOpen = true;
      this.dialogHeadline = "You are about to delete a user!";
      this.dialogText = `Are you sure you want to delete the user ${item.name.first} ${item.name.last}, with email ${item.email}?`;
    },
    async deleteItem(item) {
      console.log(item);
      try {
        this.loadingDelete = true;
        const res = await axios.delete(`/users/${item._id}`);

        if (res.data.success) {
          this.dialogOpen = false;
          const index = this.items.indexOf(item);
          this.items.splice(index, 1);
          this.snackbarText = `User ${item.name.first} ${item.name.last} deleted`;
          this.snackbarOpen = true;
        }
      } catch (error) {
        throw error;
      }
    },

    async openDialogNewUser() {
      if (!this.companiesForDialog.length) {
        this.getCompanies();
      }
      this.routeForDialog = { method: "post", endpoint: `/users` };
      this.userDialog = true;
    },

    async getCompanies() {
      try {
        const res = await axios.get("/companies");
        this.companiesForDialog = res.data.company;
      } catch (error) {
        throw error;
      }
    },

    async close() {
      this.userDialog = false;
      this.editedIndex = -1;

      this.editedItem = {
        email: "",
        name: {
          first: "",
          last: ""
        },
        companyId: {},
        avatar: null
      };
    },

    async save() {}
  },
  mounted() {
    console.log(this);
  }
};
</script>
