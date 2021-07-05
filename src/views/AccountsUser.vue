<template>
  <div class="pa-10 mt-20">
    <div>
      <vs-row>
        <vs-col vs-w="3">
          <div class="my-4" style="min-height: 180px">
            <div v-if="userProfile.walletId">
              <div style="height: 18px">
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
                  position="bottom"
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
                <a
                  v-if="!isRapydVerified"
                  style="font-size: 12px; font-face: consolas"
                  target="_blank"
                  href="/rapyd/verify"
                  >Click here to verify</a
                >
              </div>

              <vs-divider />
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
                  <div>
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
          </div>

          <div
            class="py-4"
            style="
              min-height: 400px;
              display: flex;
              flex-direction: column;
              max-height: 1200px;
              overflow-x: auto;
            "
          >
            <h2>High Performers</h2>
            <HighPerformerList />
          </div>
        </vs-col>

        <vs-col vs-w="5"> </vs-col>

        <vs-col vs-w="4">
          <div
            class="py-4"
            style="
              min-height: 400px;
              display: flex;
              flex-direction: column;
              overflow-x: auto;
            "
          >
            <RapydWalletCard :walletAddress="userProfile.walletId" />
            <div>
              <h4 style="font-weight: 600">Campaigns Joined</h4>
            </div>
          </div>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as rapydSvc from "@/services/rapydSvc";

import HighPerformerList from "@/components/HighPerformerList";
import RapydWalletCard from "@/components/RapydWalletCard";

export default {
  components: {
    HighPerformerList,
    RapydWalletCard,
  },
  data() {
    return {
      rapydWalletLoading: false,
      rapydWalletData: {},
    };
  },
  computed: {
    ...mapState(["userProfile"]),
    isRapydVerified() {
      let hasRapydWallet = !!this.rapydWalletData.email;
      return (
        hasRapydWallet &&
        !this.rapydWalletData.verification_status.toLowerCase().includes("not")
      );
    },
  },
  watch: {
    userProfile() {
      this.getRapydWallet();
    },
  },
  methods: {
    async createRapydWallet() {
      await rapydSvc.createRapydWallet();
    },
    async getRapydWallet() {
      if (!this.userProfile.walletId) return;
      this.rapydWalletLoading = true;
      this.rapydWalletData = await rapydSvc.getRapydWallet({
        ewalletId: this.userProfile.walletId,
      });
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