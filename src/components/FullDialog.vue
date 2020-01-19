<template>
  <v-row justify="center">
    <v-dialog
      v-model="open"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="$emit('closeDialog')">
            <v-icon>far fa-times-circle</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn :loading="loading" dark text @click="submit">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-container>
          <v-row class="mt-5">
            <v-col cols="6" md="6">
              <v-text-field
                v-model="templateTitle"
                dense
                outlined
                label="Template Title"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6">
              <v-select
                v-model="templateType"
                :items="types"
                :item-text="el => el.label"
                :item-value="el => el.value"
                dense
                outlined
                label="Select Template Type"
              ></v-select>
            </v-col>
            <v-col cols="12" md="12">
              <ckeditor
                style="{height: 100vh}"
                :editor="editor"
                v-model="editorData"
                :config="editorConfig"
              ></ckeditor>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

export default {
  props: {
    open: Boolean,
    title: String,
    editorData: String,
    templateTitle: String,
    templateType: {},
    types: Array,
    loading: Boolean,
    route: {}
  },
  components: {},
  data: () => ({
    editor: ClassicEditor,
    editorConfig: {
      // config settings
    },
    loadingSave: false
  }),
  methods: {
    async submit() {
      try {
        console.log(this.route);
        const method = this.route.method;
        this.loadingSave = true;
        await axios[method](this.route.endpoint, {
          title: this.templateTitle,
          type: this.templateType,
          content: this.editorData
        });

        this.loadingSave = false;
        this.open = false;
      } catch (error) {
        throw error.message;
      }
    }
  }
};
</script>
