<template>
  <div>
    <b>vyrall</b>
    <br />
    <span>An instagram clone app.</span>
    <br />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["userProfile"]),
    isLoggedIn() {
      return Object.keys(this.userProfile).length > 0;
    },
  },
};
</script>

<style scoped></style>
