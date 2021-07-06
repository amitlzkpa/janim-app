<template>
  <div>
    <vs-row class="pt-30 px-10">
      <vs-col vs-w="4">
        <h2>Your Feed</h2>
        <ActivityListViewer campaignId="QWx9DmwlkQRbCK2aXbj4" />
      </vs-col>
      <vs-col vs-w="6">
        <ContentEditable
          tag="span"
          v-model="cardFilterTerm"
          placeholderValue="search"
          styleText="
            cursor: select;
            font-size: 30px;
            font-weight: 100;
            min-height: 40px;
            width: 100%;
            display: inline-block;
          "
        />
        <vs-divider class="pr-30" />
        <vs-row>
          <vs-col class="pa-10" vs-w="4">
            <HighPerformerList />
          </vs-col>
          <vs-col class="pa-10" vs-w="4">
            <RapydWalletCard
              :walletAddress="userProfile.walletId"
              :showMultipleCurrencies="false"
              :showButtons="false"
            />
            <HighPerformerList />
          </vs-col>
          <vs-col class="pa-10" vs-w="4">
            <HighPerformerList />
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col vs-w="2">
        <h2>Rising Campaigns</h2>
        <CampaignList :highlightActive="false" />
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

import HighPerformerList from "@/components/HighPerformerList";
import ActivityListViewer from "@/components/ActivityListViewer";
import RapydWalletCard from "@/components/RapydWalletCard";
import CampaignList from "@/components/CampaignList";
import ContentEditable from "@/components/ContentEditable";

export default {
  components: {
    HighPerformerList,
    ActivityListViewer,
    RapydWalletCard,
    CampaignList,
    ContentEditable,
  },
  data() {
    return {
      cardFilterTerm: "",
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {},
};
</script>

<style scoped></style>
