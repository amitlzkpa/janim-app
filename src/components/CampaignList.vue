<template>
  <div style="flex-grow: 1">
    <div v-if="filteredCampaigns.length < 1">
      <span class="flex-center full-width country-label"
        >No campaigns found</span
      >
    </div>
    <div v-else>
      <div v-for="(campaign, idx) of filteredCampaigns" :key="idx">
        <div>
          {{ campaign }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let sampleCampaigns = [
  {
    id: "abc",
    name: "Sandy_beach",
    totalHits: 1482,
    totalEarned: 52,
  },
  {
    id: "def",
    name: "backtrunk_0242.jpg",
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
</style>