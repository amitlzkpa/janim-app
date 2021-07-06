<template>
  <div>
    <vs-row class="pa-10">
      <vs-col vs-w="4">
        <h2>Your Feed</h2>
        <ActivityListViewer campaignId="kKV93jWG3vQ5IqaSM0Nw" />
      </vs-col>
      <vs-col class="pa-10" vs-w="2">
        <HighPerformerList />
      </vs-col>
      <vs-col class="pa-10" vs-w="2">
        <RapydWalletCard :walletAddress="userProfile.walletId" />
        <HighPerformerList />
      </vs-col>
      <vs-col class="pa-10" vs-w="2">
        <HighPerformerList />
      </vs-col>
      <vs-col vs-w="2">
        <h2>Rising Campaigns</h2>
        <CampaignList />
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

export default {
  components: {
    HighPerformerList,
    ActivityListViewer,
    RapydWalletCard,
    CampaignList,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {},
};
</script>

<style scoped></style>
