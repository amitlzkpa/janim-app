<template>
  <div>
    <router-link :to="isLoggedIn ? '/home' : '/'" style="text-decoration: none">
      <b>vyrall</b>
    </router-link>

    <span style="float: right">
      <span v-if="isLoggedIn">
        <router-link to="/settings">Settings</router-link>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a
          style="cursor: pointer; color: blue; text-decoration: underline"
          @click="logout()"
          >Logout</a
        >
      </span>
      <router-link v-else to="/login"> Login </router-link>
    </span>

    <hr />
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