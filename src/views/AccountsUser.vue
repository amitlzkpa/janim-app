<template>
  <div class="pa-10 mt-20">
    <div>
      <vs-row>
        <vs-col vs-w="3">
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

            <div class="py-8">
              <div class="full-width" style="display: flex">
                <vs-button
                  type="filled"
                  @click="createRapydTransfer()"
                  class="mx-4"
                  style="flex-grow: 1"
                  >Create Rapyd Transfer</vs-button
                >
              </div>
            </div>

            <div class="py-8">
              <div class="full-width" style="display: flex">
                <vs-button
                  type="filled"
                  @click="connectRapydBeneficiaryAcct()"
                  class="mx-4"
                  style="flex-grow: 1"
                  >Connect Receiving Account</vs-button
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
        </vs-col>

        <vs-col vs-w="9"> </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as rapydSvc from "@/services/rapydSvc";

export default {
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {
    async createRapydWallet() {
      await rapydSvc.createRapydWallet();
    },
    async getRapydWallet() {
      await rapydSvc.getRapydWallet();
    },
    async createRapydPayout() {
      await rapydSvc.createRapydPayout();
    },
    async createRapydTransfer() {
      await rapydSvc.createRapydTransfer();
    },
    async connectRapydBeneficiaryAcct() {
      await rapydSvc.connectRapydBeneficiaryAcct();
    },
  },
};
</script>

<style scoped>
</style>