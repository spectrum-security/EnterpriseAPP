<template>
  <div class="home">
    <Navbar />
    <Toolbar title="Dashboard" />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import axios from "axios";

export default {
  name: "home",
  components: {
    Navbar,
    Toolbar
  },
  data: () => ({
    users: []
  }),
  async mounted() {
    axios.get("/users").then(data => (this.users = data));
  }
};
</script>
