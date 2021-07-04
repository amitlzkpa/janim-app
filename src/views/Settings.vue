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
              <vs-divider class="my-8" />
              <vs-divider />
              <div v-if="userProfile.walletId">
                <div class="py-8">
                  <div class="full-width" style="display: flex">
                    <vs-button
                      type="filled"
                      @click="getRapydWallet()"
                      class="mx-4"
                      style="flex-grow: 1"
                      >Get Rapyd Wallet</vs-button
                    >
                  </div>
                </div>

                <div class="py-8">
                  <div class="full-width" style="display: flex">
                    <vs-button
                      type="filled"
                      @click="createRapydPayout()"
                      class="mx-4"
                      style="flex-grow: 1"
                      >Create Rapyd Payout</vs-button
                    >
                  </div>
                </div>
              </div>

              <div v-else>
                <div class="py-8">
                  <div class="full-width" style="display: flex">
                    <vs-button
                      type="filled"
                      @click="createRapydWallet()"
                      class="mx-4"
                      style="flex-grow: 1"
                      >Create Rapyd Wallet</vs-button
                    >
                  </div>
                </div>
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
import * as rapydSvc from "@/services/rapydSvc";

export default {
  data() {
    return {
      name: "",
      residenceCountry: null,
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
    async createRapydWallet() {
      await rapydSvc.createRapydWallet();
    },
    async getRapydWallet() {
      await rapydSvc.getRapydWallet();
    },
    async createRapydPayout() {
      await rapydSvc.createRapydPayout();
    },
  },
};
</script>

<style scoped></style>
