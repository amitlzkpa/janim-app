<template>
  <div>
    <v-container>
      <p class="text-h4 font-weight-light">Update your profile</p>

      <v-form>
        <v-row>
          <v-col cols="12">
            <v-text-field
              class="my-2"
              outlined
              persistent-placeholder
              hide-details
              label="Name"
              :placeholder="userProfile.name"
              v-model.trim="name"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn color="primary" block dark @click="saveUserProfile()"
          >Update</v-btn
        >
      </v-form>
    </v-container>
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
        name: this.name || this.userProfile.name,
      });
      this.name = "";
    },
  },
};
</script>

<style scoped></style>
