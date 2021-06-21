<template>
  <div>
    <vs-row>
      <vs-col vs-w="6" vs-offset="3">
        <div class="mt-20 pa-10">
          <vs-card>
            <div slot="header">
              <h2>Settings</h2>
              <b>Update your profile</b>
            </div>
            <div>
              <vs-input
                label="Name"
                :placeholder="userProfile.name"
                v-model="name"
                class="full-width py-8"
              />
              <vs-input
                disabled
                label="Email"
                placeholder="you@email.com"
                v-model="userProfile.email"
                class="full-width py-8"
              />
              <vs-divider />
              <div class="full-width" style="display: flex">
                <div style="flex-grow: 1"></div>
                <vs-button type="filled" @click="saveUserProfile()" class="mx-4"
                  >Update</vs-button
                >
              </div>
            </div>
          </vs-card>
        </div>
      </vs-col>
    </vs-row>
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
