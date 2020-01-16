<template>
  <v-dialog v-model="open" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline primary--text">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="12">
              <v-text-field
                full-width
                dense
                outlined
                type="text"
                v-model="editedItem.email"
                label="Email"
              ></v-text-field>
              <v-text-field
                full-width
                dense
                outlined
                type="text"
                v-model="editedItem.name.first"
                label="First Name"
              ></v-text-field>
              <v-text-field
                full-width
                dense
                outlined
                type="text"
                v-model="editedItem.name.last"
                label="Last Name"
              ></v-text-field>
              <v-select
                label="Company"
                dense
                outlined
                :items="companies"
                :item-text="el => el.name"
                :item-value="el => el.id"
                v-model="editedItem.companyId"
              ></v-select>
              <!-- <v-text-field
                full-width
                dense
                outlined
                type="password"
                v-model="editedItem.password"
                label="Password"
              ></v-text-field>-->
              <v-file-input
                dense
                outlined
                chips
                show-size
                v-model="editedItem.avatar"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon
                prepend-inner-icon="fas fa-camera"
                label="Avatar"
                @change="logThis"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="ligthgrey" text @click="$emit('close')">Cancel</v-btn>
        <v-btn color="primary" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    open: Boolean,
    formTitle: String,
    editedItem: Object,
    companies: Array,
    route: Object
  },
  data: () => ({}),
  methods: {
    save() {
      try {
        const fd = new FormData();
        fd.append("image", this.editedItem.avatar, this.editedItem.avatar.name);
      } catch (error) {
        throw error;
      }
    },
    // for testing
    logThis() {
      console.log(this.editedItem);
    }
  }
};
</script>
