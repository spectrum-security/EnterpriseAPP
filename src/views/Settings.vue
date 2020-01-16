<template>
  <div class="home">
    <Navbar />
    <Toolbar title="Settings" />
    <v-content class="content">
      <v-container>
        <v-tabs class="elevation-2" v-model="tabs" color="primary" background-color="white" left>
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
                <v-card-title class="headline mb-2 pb-2">Template Emails</v-card-title>
              </v-col>
              <v-col cols="6" md="6" class="text-right pr-8">
                <v-btn color="primary--text" @click="handleOpenDialog">New Template</v-btn>
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
                  :page="page"
                  :perPage="perPage"
                  :totalRecords="totalRecords"
                  searchLabel="Search Templates"
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
        :open="openDialog"
        :editorData="editorData"
        :templateTitle="editEmailTitle"
        :templateType="editEmailType"
        :types="types"
        :loading="loadingSave"
        title="Create New Template"
        @closeDialog="closeDialog"
        @save="saveTemplate($event)"
      />
    </v-content>
  </div>
</template>
<script>
// @ is an alias to /src
import axios from "axios";
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import Table from "../components/DataTable";
import FullDialog from "../components/FullDialog";

export default {
  name: "home",
  components: {
    Navbar,
    Toolbar,
    Table,
    FullDialog
  },
  data: () => ({
    headers: [
      { text: "Template Title", value: "title" },
      { text: "Actions", value: "action", sortable: false }
    ],
    templates: [],
    loading: false,
    loadingSave: false,
    totalRecords: null,
    page: 1,
    perPage: 10,
    orderBy: "title",
    orderType: "asc",
    tabs: null,
    openDialog: false,
    types: [],
    editorData: "",
    editEmailTitle: "",
    editEmailType: {
      value: null,
      label: "",
      key: null
    }
  }),
  methods: {
    async handleOpenDialog() {
      try {
        if (!this.types.length) {
          const res = await axios.get("/mail/types");
          this.types = res.data.content.types;
          this.openDialog = true;
          return;
        }
        this.openDialog = true;
      } catch (err) {
        throw err.message;
      }
    },
    async saveTemplate(template) {
      console.log(template);
      try {
        this.loadingSave = true;
        await axios.post("/mail/add", {
          title: template.templateTitle,
          type: template.templateType,
          content: template.editorData
        });

        // do more stuff here
        //

        this.loadingSave = false;
      } catch (error) {
        throw error.message;
      }
    },
    async getTemplates() {
      try {
        this.loading = true;
        const res = await axios.get("/mail/");
        this.templates = res.data.content.templates;
        this.totalRecords = res.data.totalRecords;
        console.log(this.templates);
        this.loading = false;
        return;
      } catch (err) {
        this.loading = false;
        throw err.message;
      }
    },
    closeDialog() {
      this.openDialog = false;
    }
  },
  computed: {},
  async mounted() {
    await this.getTemplates();
  }
};
</script>
