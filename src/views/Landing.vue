<template>
  <div>
    <vs-row>
      <vs-col w="10" offset="1"> Hello </vs-col>
      <vs-input-number v-model="number" />
    </vs-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      number: 4,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
    isLoggedIn() {
      return Object.keys(this.userProfile).length > 0;
    },
  },
};
</script>

<style scoped></style>
