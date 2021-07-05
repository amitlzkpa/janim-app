<template>
  <div class="pa-10 mt-20">
    <div>
      <vs-row>
        <vs-col vs-w="3">
          <div v-if="userProfile.walletId">
            <div>
              <div style="min-height: 12px" class="my-8">
                <vs-progress
                  v-if="rapydWalletLoading"
                  indeterminate
                  color="primary"
                  >primary</vs-progress
                >
              </div>

              <vs-divider />

              <div
                v-if="rapydWalletData.email"
                class="py-8 full-width"
                style="text-align: center"
              >
                <div style="font-weight: 400; font-size: 20px">
                  {{ rapydWalletData.first_name }}
                  {{ rapydWalletData.last_name }}
                </div>
                <div style="font-weight: 300; font-style: italic">
                  {{ rapydWalletData.email }}
                </div>
                <vs-tooltip
                  :text="
                    isRapydVerified
                      ? 'You account is verified!'
                      : 'Verify your Rapyd account to use full features'
                  "
                >
                  <div class="mt-8">
                    <img
                      v-if="isRapydVerified"
                      src="/images/rapyd-logo.png"
                      alt="Rapyd Logo"
                      style="height: 16px"
                    />
                    <vs-icon
                      :icon="isRapydVerified ? 'verified_user' : 'help_outline'"
                      size="18px"
                      class="mr-2"
                    />
                  </div>
                </vs-tooltip>
              </div>
            </div>

            <div style="height: 400px" />

            <summary>
              <details>
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
              </details>
            </summary>
          </div>

          <div v-else>
            <div class="py-8">
              <div
                style="
                  border: 3px dashed #dedede;
                  border-radius: 8px;
                  padding: 8px;
                  background-color: #eeeeee;
                  text-align: center;
                "
              >
                <div style="height: 120px">
                  <div style="font-weight: 300; font-style: italic">
                    Seems like your account is not connected with a wallet.
                  </div>
                  <div class="mt-8">
                    <img
                      src="/images/rapyd-logo.png"
                      alt="Rapyd Logo"
                      style="height: 40px"
                    />
                  </div>
                  <div style="font-weight: 300">
                    Use Rapyd to get paid internationally!
                  </div>
                </div>
                <vs-button
                  type="filled"
                  class="full-width"
                  @click="createRapydWallet()"
                  >Create Wallet</vs-button
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
  data() {
    return {
      rapydWalletLoading: false,
      rapydWalletData: {},
    };
  },
  computed: {
    ...mapState(["userProfile"]),
    isRapydVerified() {
      return !this.rapydWalletData.verification_status
        .toLowerCase()
        .includes("not");
    },
  },
  async mounted() {
    await this.getRapydWallet();
  },
  methods: {
    async createRapydWallet() {
      await rapydSvc.createRapydWallet();
    },
    async getRapydWallet() {
      this.rapydWalletLoading = true;
      let r = await rapydSvc.getRapydWallet();
      this.rapydWalletData = r;
      this.rapydWalletLoading = false;
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