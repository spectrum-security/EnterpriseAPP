<template>
  <div class="text-center">
    <v-pagination
      prev-icon="fas fa-caret-left"
      next-icon="fas fa-caret-right"
      v-model="page"
      :value="page"
      :length="length"
      @input="$emit('pageUpdate', $event)"
      @next="$emit('increasePage', 1)"
      @previous="$emit('decreasePage', -1)"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  props: {
    page: Number,
    length: Number,
    perPage: Number
  }
};
</script>