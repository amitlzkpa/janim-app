<template>
  <div style="flex-grow: 1">
    <div v-if="filteredCampaigns.length < 1">
      <span class="flex-center full-width country-label"
        >No campaigns found</span
      >
    </div>
    <div v-else>
      <div v-for="(campaign, idx) of filteredCampaigns" :key="idx">
        <div
          style="height: 70px"
          class="soft-shadow-text pa-8 my-8 raiseOnHover"
        >
          <p style="font-weight: 500; font-size: 16px; font-style: italic">
            {{ campaign.name }}
          </p>
        </div>
        <vs-divider style="box-shadow: 0 0px 2px #dedede" />
      </div>
    </div>
  </div>
</template>

<script>
let sampleCampaigns = [
  {
    id: "abc",
    name: "Fendi Winter Drop",
    totalHits: 1482,
    totalEarned: 52,
  },
  {
    id: "def",
    name: "Nike Fall Release",
    totalHits: 712,
    totalEarned: 48,
  },
];

export default {
  data() {
    return {
      // allCampaigns: [],
      allCampaigns: sampleCampaigns,
      filteredCampaigns: [],
      filterSettings: {},
    };
  },
  computed: {},
  async mounted() {
    await this.applyFilter();
  },
  methods: {
    async applyFilter() {
      this.filteredCampaigns = this.allCampaigns;
    },
  },
};
</script>

<style scoped>
.raiseOnHover {
  position: relative;
  top: 0;
  transition: top ease 0.1s;
  cursor: pointer;
}
.raiseOnHover:hover {
  top: -4px;
}
</style>