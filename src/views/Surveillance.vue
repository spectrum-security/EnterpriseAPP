<template>
  <div class="home">
    <Navbar />
    <Toolbar title="Surveillance" />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";

export default {
  name: "home",
  components: {
    Navbar,
    Toolbar
  }
};
</script>
