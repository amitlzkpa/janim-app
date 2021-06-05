<template>
  <div>
    <vs-navbar class="pa-20">
      <div slot="title">
        <router-link
          :to="isLoggedIn ? '/home' : '/'"
          style="text-decoration: none"
        >
          <vs-navbar-title>
            <h1>vyrall</h1>
          </vs-navbar-title>
        </router-link>
      </div>

      <vs-navbar-item v-if="isLoggedIn" class="mx-4">
        <vs-button type="flat" to="/settings">Settings</vs-button>
      </vs-navbar-item>
      <vs-navbar-item v-if="isLoggedIn" class="mx-4">
        <vs-button type="border" @click="logout()">Logout</vs-button>
      </vs-navbar-item>

      <vs-navbar-item v-if="!isLoggedIn" class="mx-4">
        <vs-button type="filled" to="/login">Login</vs-button>
      </vs-navbar-item>
    </vs-navbar>
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