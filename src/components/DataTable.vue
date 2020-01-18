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
        <v-toolbar flat class="bg-gradient">
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
        <v-icon
          small
          color="secondary"
          v-if="isUsersTable"
          class="mr-2"
          @click="editItem(item)"
        >fas fa-user-edit</v-icon>
        <v-icon
          small
          color="secondary"
          v-if="isEmailTable"
          class="mr-2"
          @click="$emit('openFullscreen',item)"
        >fas fa-edit</v-icon>
        <v-icon small color="error" @click="$emit('openDeleteConfirm', item)">fas fa-trash</v-icon>
      </template>
      <template v-slot:no-data>
        <p class="accent--text">No Data returned</p>
      </template>
      <template v-slot:item.type="{ item }">
        <span v-if="item.type === 1">Payment Processed</span>
        <span v-if="item.type === 2">Receipt</span>
        <span v-if="item.type === 3">Maintenance Notice</span>
        <span v-if="item.type === 4">Your Credentials</span>
      </template>
      <template v-slot:item.userType="{ item }">
        <span v-if="item.userType === 1">Admin</span>
        <span v-if="item.userType === 3">Customer</span>
      </template>
      <template v-slot:item.companyId.name="{item}">
        <span v-if="item.companyId === undefined">Spectrum</span>
        <span v-else>{{item.companyId.name}}</span>
      </template>
    </v-data-table>
    <New-User-Dialog
      :dialogTitle="dialogTitle"
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
    isEmailTable: Boolean,
    page: Number,
    perPage: Number,
    orderBy: String,
    orderType: String,
    totalRecords: Number,
    searchLabel: String,
    companies: Array
  },
  components: {
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
    dialogTitle: "",
    dialogOpen: false,
    dialogHeadline: "",
    dialogText: "",
    companiesForDialog: [],
    loadingDelete: false,
    routeForDialog: {
      method: "",
      endpoint: ""
    }
  }),
  methods: {
    editItem(item) {
      this.dialogTitle = "Edit User";
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      if (!this.companiesForDialog.length) this.getCompanies();
      this.routeForDialog = {
        method: "put",
        endpoint: `/users/${this.editedItem._id}`
      };
      this.userDialog = true;
    },
    async openDialogNewUser() {
      this.dialogTitle = "New User";
      if (!this.companiesForDialog.length) {
        this.getCompanies();
      }
      this.routeForDialog = { method: "post", endpoint: `/auth/sign-up` };
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
    }
  }
};
</script>

<style>
.bg-gradient {
  background: linear-gradient(to bottom right, #1374f2, #66a3f2);
}
</style>