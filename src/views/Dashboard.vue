<template>
  <div class="home">
    <Navbar />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar";
import axios from "axios";

export default {
  name: "home",
  components: {
    Navbar
  },
  data: () => ({
    users: []
  }),
  async mounted() {
    axios.get("/users").then(data => (this.users = data));
  }
};
</script>
