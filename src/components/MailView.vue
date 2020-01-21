<template>
  <v-row justify="center">
    <v-dialog @click:outside="$emit('close', $event)" v-model="open" max-width="500">
      <v-card>
        <v-card-title class="headline mb-5" v-if="item">{{item.title}}</v-card-title>
        <v-card-subtitle>
          <b>From:</b>
          {{item.email}}
        </v-card-subtitle>
        <v-card-text>
          <pre>{{item.text}}</pre>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    open: Boolean,
    item: {
      from: String,
      title: String,
      text: String
    }
  }
};
</script>