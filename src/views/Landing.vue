<template>
  <div>
    <p class="text-h2 font-weight-light">starter-firebase-emul-vuetify</p>
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
