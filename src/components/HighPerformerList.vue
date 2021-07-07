<template>
  <div style="flex-grow: 1">
    <div v-if="hpAssets.length < 1">
      <span class="flex-center full-width country-label">No assets found</span>
    </div>
    <div v-else>
      <div v-for="(hpAsset, idx) of assetsToShow" :key="idx">
        <vs-card actionable class="cardx my-24">
          <div slot="header">
            <p style="color: #696969; font-size: 20px; font-weight: 600">
              {{ hpAsset.name }}
            </p>
          </div>
          <div slot="media">
            <img :src="hpAsset.imgSrc" />
          </div>
          <div style="display: flex">
            <div style="flex-grow: 1">
              <p
                style="
                  color: #696969;
                  font-size: 16px;
                  font-weight: 400;
                  font-style: italic;
                "
              >
                {{ hpAsset.campaignName }}
              </p>
            </div>
            <div style="flex-grow: 0">
              <div style="color: #696969; font-weight: 600; font-size: 18px">
                <vs-tooltip text="Total earned">
                  <p>
                    <vs-icon icon="payments" size="15px" color="696969" />
                    {{
                      userProfile.currencyPref
                        ? userProfile.currencyPref.symbol_native
                        : ""
                    }}
                    {{ hpAsset.totalEarned | currency }}
                  </p>
                </vs-tooltip>
                <vs-tooltip text="Total clicks">
                  <p>
                    <vs-icon icon="ads_click" size="15px" color="696969" />
                    {{ hpAsset.totalHits }}
                  </p>
                </vs-tooltip>
              </div>
            </div>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-tooltip text="Post to campaign">
                <vs-button color="danger" type="gradient" class="mx-4">
                  <vs-icon icon="comment" color="white"
                /></vs-button>
              </vs-tooltip>
              <vs-tooltip text="Open details">
                <vs-button color="primary" type="gradient" class="mx-4">
                  <vs-icon icon="forward" color="white"
                /></vs-button>
              </vs-tooltip>
            </vs-row>
          </div>
        </vs-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

let sampleHpAsset = [
  {
    id: "abc",
    name: "Sandy_beach",
    imgSrc: "/images/stock/01.jpg",
    campaignName: "Where are you going?",
    totalHits: 1482,
    totalEarned: 52,
  },
  {
    id: "def",
    name: "backtrunk_0242.jpg",
    imgSrc: "/images/stock/02.jpg",
    campaignName: "Fendi Winter Drop",
    totalHits: 712,
    totalEarned: 48,
  },
  {
    id: "ghi",
    name: "Spiral",
    imgSrc: "/images/stock/03.jpg",
    campaignName: "Vanilla Bay",
    totalHits: 1482,
    totalEarned: 52,
  },
  {
    id: "jkl",
    name: "magma.jpg",
    imgSrc: "/images/stock/04.jpg",
    campaignName: "NZ Open",
    totalHits: 712,
    totalEarned: 48,
  },
  {
    id: "mno",
    name: "brickk_bats",
    imgSrc: "/images/stock/05.jpg",
    campaignName: "Mezzini",
    totalHits: 1482,
    totalEarned: 52,
  },
  {
    id: "pqr",
    name: "peaceb33r.jpg",
    imgSrc: "/images/stock/06.jpg",
    campaignName: "Fendi Winter Drop",
    totalHits: 712,
    totalEarned: 48,
  },
];

export default {
  props: {
    startIdx: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // hpAssets: [],
      hpAssets: sampleHpAsset,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
    assetsToShow() {
      return this.hpAssets.slice(this.startIdx);
    },
  },
};
</script>

<style scoped>
</style>