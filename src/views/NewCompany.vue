<template>
  <div>
    <v-content class="content">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="10">
            <v-stepper v-model="e6" vertical>
              <v-stepper-step :complete="e6 > 1" step="1">
                Create a User
                <small>Create the default user for this company</small>
              </v-stepper-step>

              <v-stepper-content step="1">
                <v-card flat class="mb-12" height="300px">
                  <v-row justify="center">
                    <v-col cols="12" md="10">
                      <v-text-field label="Email" v-model="email" dense outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-text-field label="First Name" v-model="firstName" dense outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-text-field label="Last Name" v-model="lastName" dense outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="10">
                      <v-text-field
                        label="Phone Number"
                        v-model="phone"
                        type="number"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="10">
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
                </v-card>
                <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 2" step="2">
                Company Information
                <small>Insert company and payment information</small>
              </v-stepper-step>

              <v-stepper-content step="2">
                <v-card flat class="mb-12" height="400px">
                  <v-row justify="center">
                    <v-col cols="12" md="10">
                      <v-text-field label="Email" v-model="companyName" dense outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-text-field label="Office Location" v-model="officeLocation" dense outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-text-field
                        label="Postal Code"
                        type="number"
                        v-model="officePostalCode"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="10">
                      <v-file-input
                        dense
                        chips
                        show-size
                        outlined
                        prepend-inner-icon="fas fa-camera"
                        prepend-icon
                        accept="image/jpeg, image/png"
                        v-model="companyImage"
                        label="Image"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row justify="center" class="mt-5">
                    <v-col cols="12" md="10">
                      <v-text-field
                        label="CC Number"
                        type="number"
                        v-model="crediCardNumber"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-text-field label="CVV" type="number" v-model="cvv" dense outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-text-field
                        label="Expiration Date"
                        type="date"
                        v-model="expirationDate"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
                <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                <v-btn class="ml-3" text @click="e6 = 1">Return</v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="e6 > 3" step="3">Add sensors</v-stepper-step>

              <v-stepper-content step="3">
                <v-card flat class="mb-12" height="100px">
                  <v-row justify="center" class="mt-10">
                    <v-col cols="12" md="10">
                      <v-text-field label="Sensor Location" v-model="sensorLocation" dense outlined></v-text-field>
                    </v-col>
                  </v-row>
                </v-card>
                <v-btn color="primary" :loading="loading" @click="submit">Submit</v-btn>
                <v-btn class="ml-3" text @click="e6 = 2">Return</v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    e6: 1, // default from vuetify lazy to change
    loading: false,
    email: "",
    firstName: "",
    lastName: "",
    avatar: null,
    companyName: "",
    officeLocation: "",
    officePostalCode: "",
    companyImage: null,
    creditCardNumber: "",
    cvv: "",
    expirationDate: "",
    sensorLocation: ""
  }),
  methods: {
    async submit() {
      try {
        this.loading = true;
        let uploadAvatarRes = null;
        let uploadCompanyImgRes = null;
        if (this.avatar) {
          const fd = new FormData();
          fd.append("file", this.avatar, this.avatar.name);
          uploadAvatarRes = await axios.post("/file/upload/avatar", fd);
        }
        if (this.companyImage) {
          const fd = new FormData();
          fd.append("file", this.companyImage, this.companyImage.name);
          uploadCompanyImgRes = await axios.post("/file/upload/avatar", fd);
        }

        const dataToSave = {
          user: {
            email: this.email,
            name: {
              first: this.firstName,
              last: this.lastName
            },
            avatar: uploadAvatarRes.data.fileId
          },
          company: {
            name: this.companyName,
            offices: [
              {
                location: this.officeLocation,
                postalCode: this.officePostalCode
              }
            ],
            paymentMethod: {
              crediCardNumber: this.creditCardNumber,
              cvv: this.cvv,
              expiresIn: this.expirationDate
            },
            image: uploadCompanyImgRes.data.fileId
          },
          sensor: {
            location: this.sensorLocation,
            sensorType: 1
          }
        };

        const res = await axios.post("/companies", dataToSave);
        if (res.data.success) {
          this.loading = false;
          this.$router.push({ name: "Companies" });
        }
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    }
  }
};
</script>