<template>
  <div>
    <vs-card>
      <div style="overflow-x: hidden">
        <div class="full-width flex-center">
          <h2>Account Balance</h2>
        </div>
        <vs-divider />
        <div class="flex-center full-width" style="height: 200px">
          <div style="display: flex; width: 100%">
            <CurrencyDropdown
              class="flex-center"
              :currValue="62.127"
              currCurrency="US"
              cssStyleCurrValue="font-size: 72px; font-weight: 200"
              cssStyleCurrCurrency="font-size: 18px; font-weight: 600; padding-bottom: 12px;"
            />
            <div style="flex-grow: 1">
              <CurrencyDropdown
                :currValue="29.95"
                currCurrency="MX"
                cssStyleCurrValue="
                            font-size: 18px;
                            font-weight: 400;
                            width: 80px !important;
                            overflow: hidden;
                            text-align: right
                          "
              />
              <CurrencyDropdown
                :currValue="6.52"
                currCurrency="EU"
                cssStyleCurrValue="
                            font-size: 18px;
                            font-weight: 400;
                            width: 80px !important;
                            overflow: hidden;
                            text-align: right
                          "
              />
              <CurrencyDropdown
                :currValue="0"
                currCurrency="CN"
                cssStyleCurrValue="
                            font-size: 18px;
                            font-weight: 400;
                            width: 80px !important;
                            overflow: hidden;
                            text-align: right
                          "
              />
            </div>
          </div>
        </div>
        <vs-divider />
        <div>
          <p class="full-width" style="text-align: center; font-style: italic">
            {{ walletAddress }}
          </p>
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
    </vs-card>
  </div>
</template>

<script>
import CurrencyDropdown from "@/components/CurrencyDropdown";

export default {
  props: {
    walletAddress: {
      type: String,
      default: "ewallet_532a14d92715f4238cdd75e04576b6ad",
    },
  },
  components: {
    CurrencyDropdown,
  },
  computed: {
    isRapydVerified() {
      return false;
    },
  },
};
</script>

<style scoped>
</style>