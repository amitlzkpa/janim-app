<template>
  <vs-navbar>
    <template #left>
      <router-link
        :to="isLoggedIn ? '/home' : '/'"
        style="text-decoration: none"
      >
        <h3>vyrall</h3>
      </router-link>
    </template>
    <template #right>
      <span v-if="isLoggedIn">
        <vs-button flat to="/settings">Settings</vs-button>
        <vs-button border @click="logout()">Logout</vs-button>
      </span>
      <span v-else>
        <vs-button to="/login">Login</vs-button>
      </span>
    </template>
  </vs-navbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["userProfile"]),
    isLoggedIn() {
      return Object.keys(this.userProfile).length > 0;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
</style>