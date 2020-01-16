<template>
  <v-row justify="center">
    <v-dialog v-model="dialogOpen" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">{{dialogHeadline}}</v-card-title>
        <v-card-text>{{dialogText}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="$emit('dialogClose', false)">Cancel</v-btn>
          <v-btn :loading="loading" color="primary" @click="$emit('confirmDelete')">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    dialogOpen: Boolean,
    dialogHeadline: { type: String, default: "" },
    dialogText: { type: String, default: "" },
    loading: Boolean
  }
};
</script>