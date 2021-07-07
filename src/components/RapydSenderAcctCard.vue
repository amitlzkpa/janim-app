<template>
  <div>
    <vs-card>
      <div style="overflow-x: hidden">
        <div class="full-width flex-center">
          <h2>Payout Account</h2>
        </div>

        <vs-divider />

        <div
          v-if="senderAcctInfo"
          class="full-width"
          style="text-align: center"
        >
          <div>
            <div style="font-weight: 400; font-size: 20px">
              {{ senderAcctInfo.name }}
            </div>
            <div style="font-weight: 300; font-style: italic">
              {{ senderAcctInfo.city }},
              {{ senderAcctInfo.country }}
            </div>
          </div>
          <div>
            <vs-tooltip text="You account is connected!" position="bottom">
              <div class="mt-8">
                <img
                  src="/images/rapyd-logo.png"
                  alt="Rapyd Logo"
                  style="height: 16px"
                />
                <vs-icon icon="verified_user" size="18px" class="mr-2" />
              </div>
            </vs-tooltip>
          </div>
        </div>
        <div v-else style="font-weight: 300; text-align: center">
          Please link a payment account to disburse funds to your campaigners.
        </div>

        <vs-divider />

        <div v-if="senderAcctInfo" class="flex-center full-width">
          <div class="full-width">
            <p
              class="full-width"
              style="text-align: center; font-style: italic"
            >
              {{ senderAcctInfo.id }}
            </p>
            <div v-if="showButtons">
              <vs-button class="full-width my-4" :disabled="!isRapydVerified"
                >Withdraw</vs-button
              >
              <vs-button
                class="full-width my-4"
                type="border"
                :disabled="!isRapydVerified"
                >Deposit</vs-button
              >
            </div>
          </div>
        </div>
        <div v-else class="full-width">
          <vs-button
            type="filled"
            @click="connectRapydSenderAcct()"
            class="ma-4 full-width"
            >Create Sending Account</vs-button
          >
        </div>

        <vs-divider />
      </div>
    </vs-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

import * as orgSvc from "@/services/orgSvc";
import * as rapydSvc from "@/services/rapydSvc";

export default {
  props: {
    showButtons: {
      type: Boolean,
      default: true,
    },
    senderAcctInfo: {
      type: Object,
      default: () => {},
    },
    org: {
      type: Object,
      default: () => {},
    },
  },
  components: {},
  computed: {
    ...mapState(["userProfile"]),
    isRapydVerified() {
      return false;
    },
  },
  methods: {
    async connectRapydSenderAcct() {
      let opts = {
        currencyCode: this.userProfile.currencyPref
          ? this.userProfile.currencyPref.code
          : "USD",
        name: this.org.name,
      };
      let res = await rapydSvc.connectRapydSenderAcct(opts);
      let senderAcctInfo = res;
      let orgSaveData = {
        orgId: this.org.id,
        senderAcctInfo: senderAcctInfo,
      };
      let updOrg = await orgSvc.saveOrgSenderAcct(orgSaveData);
      this.$emit("rapydSenderAcctLinkedToOrg", updOrg);
    },
  },
};
</script>

<style scoped>
</style>