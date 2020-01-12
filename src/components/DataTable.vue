<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :loading="loading"
    :page="page"
    :items-per-page="perPage"
    :server-items-length="totalRecords"
    @update:page="event => $emit('pageUpdate', event)"
    @update:items-per-page="event => $emit('perPageUpdate', event)"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="primary">
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
        <v-form @submit.prevent="$emit('search', searchText)">
          <v-text-field
            class="white ml-5"
            v-model="searchText"
            outlined
            dense
            append-icon="fas fa-search"
            label="Search users"
            single-line
            hide-details
          ></v-text-field>
        </v-form>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn v-if="isUsersTable" color="accent--text white" v-on="on">New User</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="ligthgrey" text @click="close">Cancel</v-btn>
              <v-btn color="priamry" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">fas fa-user-edit</v-icon>
      <v-icon small @click="deleteItem(item)">fas fa-trash</v-icon>
    </template>
    <template v-slot:no-data>
      <p class="accent--text">No Users returned</p>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    search: String,
    loading: Boolean,
    isUsersTable: Boolean,
    page: Number,
    perPage: Number,
    orderBy: String,
    totalRecords: Number
  },

  data: () => ({
    editedItem: {},
    searchText: ""
  }),
  methods: {
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.items.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {}
  }
};
</script>
