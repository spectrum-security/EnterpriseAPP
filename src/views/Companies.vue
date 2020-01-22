<template>
  <div class="home">
    <v-content class="content">
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-form @submit.prevent="searchCompanies">
              <v-text-field
                background-color="white"
                label="Search Companies"
                dense
                outlined
                append-icon="fas fa-search"
                v-model="search"
              ></v-text-field>
            </v-form>
          </v-col>
          <v-col cols="12" md="2">
            <v-btn class="ml-5" color="primary" :to="{ name: 'Add Company' }" link>
              <v-icon small class="mr-2">fas fa-plus</v-icon>New Company
            </v-btn>
          </v-col>
          <v-col cols="12" md="4"></v-col>
          <v-col cols="12" md="3">
            <Pagination
              @pageUpdate="pageUpdate($event)"
              @increasePage="increasePage"
              @decreasePage="decreasePage"
              :page="page"
              :length="paginationLength"
            />
          </v-col>
          <v-col cols="12" md="4" v-for="(company, index) in companies" :key="index">
            <Company-Card :company="company" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
// @ is an alias to /src
import CompanyCard from "../components/CompanyCard";
import Pagination from "../components/Pagination";
import axios from "axios";

export default {
  name: "home",
  components: {
    CompanyCard,
    Pagination
  },
  data: () => ({
    companies: [],
    page: 1,
    perPage: 6,
    paginationLength: 0,
    search: ""
  }),
  async mounted() {
    this.getCompanies();
  },
  methods: {
    async getCompanies() {
      try {
        const res = await axios.get("/companies", {
          params: {
            page: this.page,
            perPage: this.perPage
          }
        });
        this.companies = res.data.content.companies;
        this.paginationLength = res.data.totalRecords / this.perPage;
      } catch (error) {
        throw error;
      }
    },
    async searchCompanies() {
      try {
        const res = await axios.get("/companies", {
          params: {
            search: this.search
          }
        });
        this.companies = res.data.content.companies;
        this.paginationLength = res.data.totalRecords / this.perPage;
      } catch (error) {
        throw error;
      }
    },
    increasePage() {
      this.page += 1;
      this.getCompanies();
    },
    decreasePage() {
      this.page -= 1;
      this.getCompanies();
    },
    pageUpdate(event) {
      this.page = event;
      this.getCompanies();
    }
  }
};
</script>
