<template>
  <div>
    <vs-row class="pa-10">
      <vs-col> Home </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {},
};
</script>

<style scoped></style>
