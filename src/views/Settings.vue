<template>
  <div class="home">
    <v-content class="content">
      <v-container>
        <v-tabs
          class="elevation-2"
          v-model="tabs"
          color="primary"
          background-color="white"
          left
        >
          <v-tab>
            Email Settings
            <v-icon class="ml-3">fas fa-envelope</v-icon>
          </v-tab>
          <v-tab>
            Payment Settings
            <v-icon class="ml-3">fas fa-credit-card</v-icon>
          </v-tab>
        </v-tabs>
        <v-tabs-items class="elevation-2" v-model="tabs">
          <v-tab-item>
            <v-row align="center" no-gutters class="mb-0 pb-0">
              <v-col cols="6" md="6">
                <v-card-title class="headline mb-2 pb-2"
                  >Template Emails</v-card-title
                >
              </v-col>
              <v-col cols="6" md="6" class="text-right pr-8">
                <v-btn color="primary--text" @click="handleOpenDialog(null)"
                  >New Template</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <Table
                  title="List of Templates"
                  :headers="headers"
                  :items="templates"
                  :loading="loading"
                  :isUsersTable="false"
                  :isEmailTable="true"
                  :page="page"
                  :perPage="perPage"
                  :totalRecords="totalRecords"
                  searchLabel="Search Templates"
                  @openDeleteConfirm="openDialog($event)"
                  @openFullscreen="handleOpenDialog(item)"
                  @search="searchTemplates($event)"
                  @pageUpdate="pageUpdate($event)"
                  @perPageUpdate="perPageUpdate($event)"
                  @orderByUpdate="orderByUpdate($event)"
                  @orderTypeUpdate="orderTypeUpdate($event)"
                />
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-card-title class="headline">Payment Methods</v-card-title>
            <v-card-text></v-card-text>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
      <Full-Dialog
        :open="fullscreenDialog"
        :route="routeForFullscreen"
        :editorData="editorData"
        :templateTitle="editEmailTitle"
        :templateType="editEmailType"
        :types="types"
        :loading="loadingSave"
        title="Create New Template"
        @closeDialog="closeDialog"
        @getTemplates="getTemplates"
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
    </v-content>
  </div>
</template>
<script>
// @ is an alias to /src
import axios from "axios";
import Table from "../components/DataTable";
import FullDialog from "../components/FullDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import Snackbar from "../components/Snackbar";

export default {
  name: "home",
  components: {
    Table,
    FullDialog,
    ConfirmDialog,
    Snackbar
  },
  data: () => ({
    headers: [
      { text: "Template Title", value: "title" },
      { text: "Type", value: "type" },
      { text: "Actions", value: "action", sortable: false }
    ],
    templates: [],
    loading: false,
    loadingSave: false,
    loadingDelete: false,
    totalRecords: null,
    page: 1,
    perPage: 10,
    orderBy: "title",
    orderType: "asc",
    tabs: null,
    fullscreenDialog: false,
    types: [],
    editorData: "",
    editEmailTitle: "",
    editEmailType: {
      value: null,
      label: "",
      key: null
    },
    snackbarOpen: false,
    snackbarText: "",
    dialogHeadline: "",
    dialogText: "",
    dialogOpen: false,
    routeForFullscreen: {
      endpoint: "",
      method: ""
    }
  }),
  methods: {
    async handleOpenDialog(item) {
      try {
        if (!this.types.length) {
          const res = await axios.get("/mail/types");
          this.types = res.data.content.types;
        }
        console.log(item);
        if (item) {
          this.editorData = item.content;
          this.editEmailTitle = item.title;
          this.editEmailType = item.type;
          this.routeForFullscreen.endpoint = `/mail/update/${item._id}`;
          this.routeForFullscreen.method = "put";
          this.fullscreenDialog = true;
          return;
        }
        this.routeForFullscreen.endpoint = `/mail/add`;
        this.routeForFullscreen.method = "post";
        this.fullscreenDialog = true;
      } catch (err) {
        throw err.message;
      }
    },
    async searchTemplates(searchText) {
      try {
        this.loading = true;
        const res = await axios.get("/mail", {
          params: {
            search: searchText
          }
        });
        this.templates = res.data.content.templates;
        this.totalRecords = res.data.totalRecords;
        this.loading = false;
      } catch (err) {
        this.loading = false;
        throw err;
      }
    },
    async getTemplates() {
      try {
        this.loading = true;
        const res = await axios.get("/mail/");
        this.templates = res.data.content.templates;
        this.totalRecords = res.data.totalTemplates;
        this.loading = false;
        return;
      } catch (err) {
        this.loading = false;
        throw err.message;
      }
    },
    openDialog(item) {
      this.item = item;
      this.dialogOpen = true;
      this.dialogHeadline = "You are about to delete a template!";
      this.dialogText = `Are you sure you want to delete the template '${item.title}'?`;
    },
    async deleteItem(item) {
      console.log(item);
      try {
        this.loadingDelete = true;
        const res = await axios.delete(`/mail/delete/${item._id}`);

        if (res.data.success) {
          this.dialogOpen = false;
          const index = this.templates.indexOf(item);
          this.templates.splice(index, 1);
          this.snackbarText = `Template ${item.title} deleted`;
          this.snackbarOpen = true;
          this.loadingDelete = false;
        }
      } catch (error) {
        this.loadingDelete = false;
        throw error;
      }
    },
    closeDialog() {
      this.fullscreenDialog = false;
    }
  },
  computed: {},
  async mounted() {
    await this.getTemplates();
  }
};
</script>
