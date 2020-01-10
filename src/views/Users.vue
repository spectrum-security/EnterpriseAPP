<template>
  <div class="home">
    <Navbar />
    <Toolbar title="Users" />
    <v-content class="content">
      <v-row justify="center" class="mt-5 mx-auto">
        <v-col cols="11">
          <Table title="List of Users" :headers="headers" :items="users" />
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

export default {
  name: "home",
  components: {
    Navbar,
    Toolbar,
    Table
  },
  data: () => ({
    users: [],
    headers: [{ text: "Email", value: "email" }]
  }),
  mounted() {
    axios.get("/users").then(data => {
      this.users.push(data.data);
      this.users.push(data.data);
    });
  }
};
</script>
