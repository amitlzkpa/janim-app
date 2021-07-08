<template>
  <div>
    <vs-navbar class="pa-20">
      <div slot="title">
        <router-link
          :to="isLoggedIn ? '/home' : '/'"
          style="text-decoration: none"
        >
          <vs-navbar-title>
            <h1 style="color: #9900ff">vyrall</h1>
          </vs-navbar-title>
        </router-link>
      </div>

      <vs-navbar-item v-if="isLoggedIn">
        <vs-dropdown>
          <a class="a-icon" href.prevent>
            <span>
              {{ userProfile.name }}
            </span>
            <vs-icon size="12px" icon="expand_more"></vs-icon>
          </a>

          <vs-dropdown-menu style="width: 200px">
            <vs-dropdown-item to="/campaign/new">
              New Campaign
            </vs-dropdown-item>
            <vs-dropdown-item to="/home" divider> Home </vs-dropdown-item>
            <vs-dropdown-item to="/organizations">
              Organizations
            </vs-dropdown-item>
            <vs-dropdown-item to="/settings"> Settings </vs-dropdown-item>
            <vs-dropdown-item to="/accounts-user"> Accounts </vs-dropdown-item>
            <vs-dropdown-item to="/help" divider> Help </vs-dropdown-item>
            <vs-dropdown-item @click="logout()"> Logout </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </vs-navbar-item>

      <vs-navbar-item v-if="!isLoggedIn">
        <vs-button type="flat" to="/login" class="mx-4">Login</vs-button>
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