<template>
  <div v-if="campaign.id">
    <vs-row class="px-10">
      <vs-col vs-w="3">
        <div class="mt-20 pa-10">
          <AssetGallery :assets="campaign.assets" />
        </div>
      </vs-col>

      <vs-col vs-w="9">
        <div class="mt-20 pa-10">
          <vs-row>
            <vs-col vs-w="12">
              <div class="full-width" style="display: flex">
                <span class="text--grey mt-12" style="font-size: 12px"
                  >Stanton Media</span
                >
                <span style="flex-grow: 1" />
                <vs-button
                  color="primary"
                  type="flat"
                  :to="`/campaign/edit/${campaign.id}`"
                  >Edit</vs-button
                >
              </div>
            </vs-col>
          </vs-row>

          <vs-row>
            <vs-col vs-w="12">
              <span
                style="
                  font-family: 'Roboto', sans-serif;
                  font-size: 60px;
                  font-weight: 100;
                  color: grey;
                "
                >{{ campaign.title }}</span
              >
            </vs-col>
          </vs-row>

          <vs-row>
            <vs-col vs-w="12">
              <p
                style="
                  font-family: 'Lato', sans-serif;
                  font-size: 20px;
                  color: #4d4d4d;
                  height: 80px;
                  width: 100%;
                  display: inline-block;
                  resize: vertical;
                  overflow-x: hidden;
                  overflow-y: auto;
                  margin-top: 2px;
                "
              >
                {{ campaign.description }}
              </p>
            </vs-col>
          </vs-row>

          <vs-row class="mt-16">
            <vs-col vs-w="6" class="pa-10">
              <vs-card fixed-height>
                <div class="info-item flex-center pt-10">
                  <DateRangeViewer :dateRange="campaign.dateRange" />
                </div>
              </vs-card>
            </vs-col>
            <vs-col vs-w="6" class="pa-10">
              <vs-card fixed-height>
                <div class="info-item flex-center pt-10">
                  ${{ campaign.totalBudget }} bounty
                </div>
              </vs-card>
            </vs-col>
          </vs-row>

          <vs-divider />

          <vs-row style="height: 60px">
            <vs-col vs-w="1" class="flex-center">
              <vs-button
                color="danger"
                type="gradient"
                icon="person_add"
              ></vs-button>
              <span class="ml-8 text--grey"> JOIN </span>
            </vs-col>
            <vs-col vs-w="5" class="flex-center">
              <span class="ml-8 text--grey" v-if="campaign.dateRange[1]">
                <i
                  >{{
                    moment
                      .duration(moment(campaign.dateRange[1]).diff(moment()))
                      .humanize()
                  }}
                  to go</i
                >
              </span>
            </vs-col>
            <vs-col vs-w="3" class="flex-center">
              <vs-icon icon="star_outline" color="rgb(255, 130, 0)"></vs-icon>
              <span class="ml-8 text--grey"> 4,702 HITS </span>
            </vs-col>
            <vs-col vs-w="3" class="flex-center">
              <vs-icon icon="person_outline" color="success"></vs-icon>
              <span class="ml-8 text--grey"> 78 MEMBERS </span>
            </vs-col>
          </vs-row>

          <vs-divider />

          <vs-row>
            <vs-col vs-w="8">
              <vs-tabs>
                <vs-tab label="Activity">
                  <ActivityListViewer :campaignId="campaign.id" />
                </vs-tab>
                <vs-tab label="Members">
                  <div>
                    <vs-list>
                      <vs-list-item
                        title="Steve Jobes"
                        subtitle="Tarcu id augue ultrices feugiat"
                      >
                        <template slot="avatar">
                          <vs-avatar />
                        </template>
                      </vs-list-item>
                      <vs-list-item
                        title="Matt"
                        subtitle="Oligula at mollis egestas."
                      >
                        <template slot="avatar">
                          <vs-avatar />
                        </template>
                      </vs-list-item>
                      <vs-list-item
                        title="Wilfred Menzes"
                        subtitle="Rendrerit sapien vitae felis viverra, quis efficitur velit blandit."
                      >
                        <template slot="avatar">
                          <vs-avatar />
                        </template>
                      </vs-list-item>
                    </vs-list>
                  </div>
                </vs-tab>
              </vs-tabs>
            </vs-col>
            <vs-col vs-w="4">
              <div style="text-align: center">
                <div class="my-10">
                  <CountryListViewer :countries="campaign.targetCountries" />
                </div>

                <vs-divider />

                <div class="my-10">
                  <div
                    class="pt-48 text--grey"
                    style="
                      flex-direction: column;
                      font-family: 'Roboto', sand-serif;
                      font-weight: 200;
                      font-size: 24px;
                    "
                  >
                    <span> TARGET PROFILE </span>
                    <div v-if="campaign.ageRange[0]" class="flex-center">
                      <vs-icon
                        class="material-icons-outlined"
                        icon="supervisor_account"
                        color="grey"
                        size="75px"
                      ></vs-icon>
                      <span class="ml-8" style="font-size: 36px">
                        {{ campaign.ageRange[0] }}-{{ campaign.ageRange[1] }}
                        yo
                      </span>
                    </div>

                    <div class="my-48 px-8">
                      {{ campaign.targetDescriptors[0] }}
                    </div>

                    <div class="my-48 px-8">
                      {{ campaign.targetDescriptors[1] }}
                    </div>

                    <div class="my-48 px-8">
                      {{ campaign.targetDescriptors[2] }}
                    </div>
                  </div>
                </div>

                <vs-divider />

                <div class="my-10">
                  <KeywordsViewer :keywords="campaign.targetKeywords" />
                </div>
              </div>
            </vs-col>
          </vs-row>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as fb from "@/firebase";

import DateRangeViewer from "@/components/DateRangeViewer";
import CountryListViewer from "@/components/CountryListViewer";
import KeywordsViewer from "@/components/KeywordsViewer";
import AssetGallery from "@/components/AssetGallery";
import ActivityListViewer from "@/components/ActivityListViewer";

export default {
  components: {
    DateRangeViewer,
    CountryListViewer,
    KeywordsViewer,
    AssetGallery,
    ActivityListViewer,
  },
  data() {
    return {
      campaign: {},
      activityItems: [],
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  async mounted() {
    await this.refreshData();
  },
  methods: {
    async refreshData() {
      let campaignId = this.$route.params.campaignId;
      let doc = await fb.campaignsCollection.doc(campaignId).get();
      let campaignData = doc.data();
      campaignData.campaign.dateRange = campaignData.campaign.dateRange.map(
        (d) => d.toDate()
      );
      this.campaign = campaignData.campaign;

      this.activityItems = [];
      let postsResult = await fb.activityPostsCollection
        .where("assocCampaignId", "==", this.campaign.id)
        .orderBy("createdOn", "desc")
        .get();
      postsResult.forEach((r) => {
        this.activityItems.push(r.data());
      });
    },
  },
};
</script>

<style scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-item {
  align-self: center;
  width: 100%;
  min-height: 40px;
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  font-weight: 300;
  color: grey;
}

.country-label {
  color: grey;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  font-weight: 300;
  margin: 0px 4px 0px 4px;
}
</style>
