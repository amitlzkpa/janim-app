<template>
  <div>
    <h2>Settings</h2>
    <b>Update your profile</b>

    <form @submit.prevent>
      <div>
        <label for="name">Name</label>
        <input
          v-model.trim="name"
          type="text"
          :placeholder="userProfile.name"
          id="name"
        />
      </div>

      <button @click="saveUserProfile()">Update</button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: "",
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    saveUserProfile() {
      this.$store.dispatch("saveUserProfile", {
        name: this.name !== "" ? this.name : this.userProfile.name,
      });
      this.name = "";
    },
  },
};
</script>

<style scoped></style>
