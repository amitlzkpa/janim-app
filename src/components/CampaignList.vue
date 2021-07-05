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
          style="height: 66px"
          class="soft-shadow-text py-8 pr-8 my-8 raiseOnHover"
          @click="updateSelectedCampaign(campaign)"
        >
          <div style="display: flex">
            <div style="height: 100%; width: 36px">
              <vs-icon
                v-if="campaign.id === currentlySelectedCampaign.id"
                class="fade-in"
                icon="chevron_right"
                size="36px"
                color="#ff0080"
              />
            </div>
            <div style="font-size: 14px; flex-grow: 1">
              <p style="font-weight: 500; font-size: 16px; font-style: italic">
                {{ campaign.name }}
              </p>
              {{ moment(campaign.startDate).format("MMM Do YYYY") }}
              -
              {{ moment(campaign.endDate).format("MMM Do YYYY") }}
              <br />
              {{ campaign.totalBudget | currency }}
            </div>
            <div style="height: 100%; width: 36px" class="flex-center mr-16">
              <vs-tooltip text="Total earned from this campaign">
                <p style="font-weight: 500; font-size: 36px">
                  {{ campaign.totalEarned | currency }}
                </p>
              </vs-tooltip>
            </div>
          </div>
        </div>
        <vs-divider style="box-shadow: 0 0px 2px #dedede" class="px-16" />
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
    startDate: new Date("10/31/2021"),
    endDate: new Date("12/30/2021"),
    totalBudget: 4000,
  },
  {
    id: "def",
    name: "Nike Fall Release",
    totalHits: 712,
    totalEarned: 48,
    startDate: new Date("08/14/2020"),
    endDate: new Date("10/14/2020"),
    totalBudget: 8000,
  },
];

export default {
  data() {
    return {
      // allCampaigns: [],
      allCampaigns: sampleCampaigns,
      filteredCampaigns: [],
      filterSettings: {},
      currentlySelectedCampaign: {},
    };
  },
  computed: {},
  async mounted() {
    await this.applyFilter();
    this.currentlySelectedCampaign = this.allCampaigns[1];
  },
  methods: {
    async applyFilter() {
      this.filteredCampaigns = this.allCampaigns;
    },
    async updateSelectedCampaign(updCampaign) {
      this.currentlySelectedCampaign = updCampaign;
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

.fade-in {
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 1s;
}

@keyframes fadeInOpacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>