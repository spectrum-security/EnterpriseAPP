<template>
  <div>
    <v-card raised class="mt-10">
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="secondary"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
        <v-sparkline
          :labels="labels"
          auto-draw
          auto-draw-easing="ease"
          stroke-linecap="round"
          :value="value"
          color="white"
          line-width="2"
          padding="16"
          smooth
        ></v-sparkline>
      </v-sheet>

      <v-card-text class="pt-0">
        <div class="title font-weight-light mb-2">{{ title }}</div>
        <div class="subheading font-weight-light grey--text">
          {{ subheading }}
        </div>
        <v-divider class="my-2"></v-divider>
        <v-icon class="mr-2" color="error" small>fas fa-clock</v-icon>
        <span class="caption grey--text font-weight-light"
          >last registered {{ calcDiff }} hours ago</span
        >
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    title: {
      type: String
    },
    subheading: {
      type: String
    },
    labels: {
      type: Array
    },
    value: {
      type: Array
    },
    lastOccurence: String
  },
  data: () => ({}),
  computed: {
    calcDiff() {
      const today = moment();
      const lastRecord = moment(this.lastOccurence);
      const diff = today.diff(lastRecord, "hours");
      return diff;
    }
  }
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
