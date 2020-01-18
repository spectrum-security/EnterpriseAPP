<template>
  <v-dialog v-model="open" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline primary--text">{{ dialogTitle }}</span>
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
                :item-value="el => el._id"
                v-model="editedItem.companyId"
              ></v-select>
              <v-select
                label="User Type"
                dense
                outlined
                :items="userTypes"
                :item-value="el => el.value"
                :item-text="el => el.label"
                v-model="editedItem.userType"
              ></v-select>
              <v-file-input
                dense
                chips
                show-size
                outlined
                prepend-inner-icon="fas fa-camera"
                prepend-icon
                accept="image/jpeg, image/png"
                v-model="avatar"
                label="Avatar"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="ligthgrey" text @click="$emit('close')">Cancel</v-btn>
        <v-btn color="primary" :loading="loading" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  props: {
    open: Boolean,
    dialogTitle: String,
    editedItem: Object,
    companies: Array,
    route: Object
  },
  data: () => ({
    userTypes: [
      { value: 1, label: "Admin" },
      { value: 3, label: "Customer" }
    ],
    avatar: null,
    loading: false
  }),
  methods: {
    async save() {
      try {
        this.loading = true;
        let uploadRes = null;
        if (this.avatar) {
          const fd = new FormData();
          fd.append("file", this.avatar, this.avatar.name);
          uploadRes = await axios.post("/file/upload/avatar", fd);
        }
        const method = this.route.method;
        const res = await axios[method](this.route.endpoint, {
          email: this.editedItem.email,
          name: {
            first: this.editedItem.name.first,
            last: this.editedItem.name.last
          },
          companyId: this.editedItem.companyId,
          userType: this.editedItem.userType,
          avatar: uploadRes.data.fileId
        });
        if (res.data.success) {
          this.$emit("getUsersBecauseLazy");
        }
        this.loading = false;
      } catch (error) {
        throw error;
      }
    }
  }
};
</script>
