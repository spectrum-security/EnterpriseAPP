<template>
  <div class="home">
    <v-content class="content">
      <v-container>
        <v-row>
          <v-col cols="3" md="3">
            <Info-Card
              id="breaches-card"
              headline="Breaches"
              text="Breaches in the last 7 days"
              :icon="logsIcon"
              :numberOf="logsCount"
              :loading="loading"
            />
          </v-col>
          <v-col cols="3" md="3">
            <Info-Card
              id="breaches-card"
              headline="Breaches"
              text="Users created in the last 7 days"
              :icon="usersIcon"
              :numberOf="usersCount"
              :loading="loading"
            />
          </v-col>
          <v-col cols="3" md="3">
            <Info-Card
              id="breaches-card"
              headline="Breaches"
              text="Received emails in last 7 days"
              :icon="recEmailIcon"
              :numberOf="recEmailCount"
              :loading="loading"
            />
          </v-col>
          <v-col cols="3" md="3">
            <Info-Card
              id="breaches-card"
              headline="Breaches"
              text="Emails sent in last 7 days"
              :icon="sentEmailIcon"
              :numberOf="sentEmailCount"
              :loading="loading"
            />
          </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col cols="6">
            <Graph
              title="Security Analysis"
              :lastOccurence="lastLogRecord"
              :labels="dateLabels"
              :value="logValues"
            />
          </v-col>
          <v-col cols="6">
            <Graph
              title="Users Analysis"
              :lastOccurence="lastUserRecord"
              :labels="dateLabels"
              :value="userValues"
            />
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-5">
          <v-col cols="12" md="12">
            <Data-Table
              class="elevation-4 mb-10"
              title="Inbox"
              :hasViewIcon="true"
              :headers="headers"
              :items="inboxItems"
              :loading="loading"
              :isUsersTable="false"
              :page="page"
              :perPage="perPage"
              :totalRecords="inboxTotalRecords"
              searchLabel="Search Inbox"
              @viewItem="openViewMail($event)"
              @snackbarOpen="openSnackbar($event)"
              @openDeleteConfirm="openDialog($event)"
              @search="searchUsers($event)"
              @pageUpdate="pageUpdate($event)"
              @perPageUpdate="perPageUpdate($event)"
              @orderByUpdate="orderByUpdate($event)"
              @orderTypeUpdate="orderTypeUpdate($event)"
            />
          </v-col>
        </v-row>
        <Mail-View :open="viewMailDialog" :item="mailItem" />
      </v-container>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import Graph from "../components/Graph";
import InfoCard from "../components/InfoCard";
import DataTable from "../components/DataTable";
import MailView from "../components/MailView";
import axios from "axios";

export default {
  name: "home",
  components: {
    Graph,
    InfoCard,
    DataTable,
    MailView
  },
  data: () => ({
    loading: false,
    dateLabels: [],
    logValues: [],
    userValues: [],
    logsIcon: {
      name: "fas fa-shield-alt",
      color: "white"
    },
    logsCount: null,
    usersCount: null,
    recEmailCount: null,
    sentEmailCount: null,
    usersIcon: {
      name: "fas fa-users",
      color: "white"
    },
    recEmailIcon: {
      name: "fas fa-inbox",
      color: "white"
    },
    sentEmailIcon: {
      name: "fas fa-paper-plane",
      color: "white"
    },
    lastLogRecord: "",
    lastUserRecord: "",
    headers: [
      { text: "From", value: "email" },
      { text: "Subject", value: "title" },
      { text: "Actions", value: "action", sortable: false }
    ],
    inboxItems: [],
    inboxTotalRecords: 0,
    page: 1,
    perPage: 10,
    orderBy: "createdAt",
    orderType: "asc",
    viewMailDialog: false,
    mailItem: {}
  }),
  async mounted() {
    this.loading = true;
    this.dateLabels = this.last7Days();
    await this.getThisWeeksLogs();
    await this.createdUsersThisWeek();
    await this.getReceivedEmailCount();
    await this.sentEmailThisWeek();
    await this.getLogChartData();
    await this.getUsersChartData();
    await this.getInbox();
    this.loading = false;
  },
  methods: {
    openViewMail(item) {
      console.log(item);
      this.mailItem = {
        title: item.title,
        email: item.email,
        text: item.text
      };
      this.viewMailDialog = true;
      console.log("stoped here");
    },
    async getInbox() {
      try {
        const res = await axios.get("/rec_email/inbox", {
          params: {
            page: this.page,
            perPage: this.perPage,
            orderBy: this.orderBy,
            orderType: this.orderType
          }
        });
        this.inboxItems = res.data.content.inbox;
        this.inboxTotalRecords = res.data.totalRecords;
      } catch (error) {
        throw error;
      }
    },
    async createdUsersThisWeek() {
      try {
        const res = await axios.get("/users/created/last_7_days");
        this.usersCount = res.data.totalRecords;
      } catch (error) {
        throw error;
      }
    },
    async sentEmailThisWeek() {
      try {
        const res = await axios.get("/mail/last_7_days");
        this.sentEmailCount = res.data.totalRecords;
      } catch (error) {
        throw error;
      }
    },
    async getReceivedEmailCount() {
      try {
        const res = await axios.get("/rec_email/last_7_days");
        this.recEmailCount = res.data.totalRecords;
      } catch (error) {
        throw error;
      }
    },
    async getThisWeeksLogs() {
      try {
        const res = await axios.get("/logs/last_7_days");
        this.logsCount = res.data.totalRecords;
      } catch (error) {
        throw error;
      }
    },
    async getLogChartData() {
      try {
        const res = await axios.get("/logs/analytics");
        this.logValues = res.data.content.range;
        this.lastLogRecord = res.data.content.lastRecord.createdAt;
      } catch (error) {
        throw error;
      }
    },
    async getUsersChartData() {
      try {
        const res = await axios.get("/users/analytics");
        this.userValues = res.data.content.range;
        this.lastUserRecord = res.data.content.lastRecord.createdAt;
      } catch (error) {
        throw error;
      }
    },
    pageUpdate(event) {
      this.page = event;
      this.getInbox();
    },
    perPageUpdate(event) {
      this.perPage = event;
      this.getInbox();
    },
    orderByUpdate(event) {
      this.orderBy = event[0];
      this.getInbox();
    },
    orderTypeUpdate(event) {
      event[0] === true ? (this.orderType = "desc") : (this.orderType = "asc");
      this.getInbox();
    },
    formatDate(date) {
      var dd = date.getDate();
      var mm = date.getMonth() + 1;
      if (dd < 10) {
        dd = "0" + dd;
      }
      if (mm < 10) {
        mm = "0" + mm;
      }
      date = dd + "/" + mm;
      return date;
    },
    last7Days() {
      var result = [];
      for (var i = 0; i < 7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.unshift(this.formatDate(d));
      }
      return result;
    }
  }
};
</script>
