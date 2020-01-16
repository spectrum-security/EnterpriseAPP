<template>
  <v-snackbar v-model="open" :color="color" :timeout="timeout" bottom right>
    {{ text }}
    <v-btn dark text @click="$emit('closeSnack', false)">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    color: String,
    text: String,
    open: Boolean
  },
  data() {
    return {
      timeout: 6000
    };
  }
};
</script>