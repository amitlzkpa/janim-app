<template>
  <div v-if="campaign.id">
    <vs-row class="px-10">
      <vs-col vs-w="3">
        <div class="mt-20 pa-10">
          <AssetGallery
            :assets="campaign.assets"
            :editMode="true"
            :uploadBasepath="`${campaign.id}/campaign-assets/`"
            @onAssetCreated="onAssetCreated"
            @onAssetDeleted="onAssetDeleted"
          />
        </div>
      </vs-col>

      <vs-col vs-w="9">
        <div class="mt-20 pa-10">
          <vs-row>
            <vs-col vs-w="12">
              <div class="full-width" style="display: flex">
                <vs-dropdown>
                  <a href="#" class="text--grey">
                    Stanton Media
                    <vs-icon
                      style="font-size: 12px"
                      icon="expand_more"
                    ></vs-icon>
                  </a>

                  <vs-dropdown-menu>
                    <vs-dropdown-item> Stanton Media </vs-dropdown-item>
                    <vs-dropdown-item> Zephyr Adverts </vs-dropdown-item>
                    <vs-dropdown-item> Nova Agency </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
                <span style="flex-grow: 1" />
                <vs-button color="primary" type="flat" @click="saveCampaign()"
                  >Save</vs-button
                >
              </div>
            </vs-col>
          </vs-row>

          <vs-row>
            <vs-col vs-w="12">
              <ContentEditable
                tag="span"
                v-model="campaign.title"
                styleText="
                  cursor: select;
                  border: 1px dashed grey;
                  border-radius: 8px;
                  color: grey;
                  font-family: 'Roboto', sans-serif;
                  font-size: 60px;
                  font-weight: 100;
                  min-height: 70px;
                  width: 100%;
                  display: inline-block;
                "
              />
            </vs-col>
          </vs-row>

          <vs-row>
            <vs-col vs-w="12">
              <ContentEditable
                tag="span"
                v-model="campaign.description"
                styleText="
                  cursor: select;
                  border: 1px dashed grey;
                  border-radius: 8px;
                  color: #4d4d4d;
                  font-family: 'Lato', sans-serif;
                  font-size: 20px;
                  height: 80px;
                  width: 100%;
                  display: inline-block;
                  resize: vertical;
                  overflow-x: hidden;
                  overflow-y: auto;
                  margin-top: 2px;
                "
              />
            </vs-col>
          </vs-row>

          <vs-row class="mt-16">
            <vs-col vs-w="6" class="pa-10">
              <vs-card actionable fixed-height>
                <div
                  class="info-item flex-center pt-10"
                  @click="showCampaignTimelinePopup = true"
                >
                  <DateRangeViewer :dateRange="campaign.dateRange" />
                </div>
                <vs-popup
                  title="Campaign Timeline"
                  :active.sync="showCampaignTimelinePopup"
                >
                  <vs-row>
                    <vs-col vs-w="6" style="text-align: center"
                      >Start Date</vs-col
                    >
                    <vs-col vs-w="6" style="text-align: center"
                      >End Date</vs-col
                    >
                  </vs-row>
                  <vs-row>
                    <vs-col>
                      <div class="flex-center my-8">
                        <date-picker
                          range
                          inline
                          v-model="campaign.dateRange"
                        ></date-picker>
                      </div>
                    </vs-col>
                  </vs-row>
                  <div class="full-width" style="text-align: right">
                    <vs-button
                      type="filled"
                      @click="showCampaignTimelinePopup = false"
                      >Save</vs-button
                    >
                  </div>
                </vs-popup>
              </vs-card>
            </vs-col>
            <vs-col vs-w="6" class="pa-10">
              <vs-card actionable fixed-height>
                <div
                  class="info-item flex-center pt-10"
                  @click="showCampaignBudgetPopup = true"
                >
                  ${{ campaign.totalBudget }} bounty
                </div>
                <vs-popup
                  title="Campaign Budget"
                  :active.sync="showCampaignBudgetPopup"
                >
                  <vs-row>
                    <vs-col vs-w="3">
                      Total Budget
                      <vs-input-number
                        v-model="campaign.totalBudget"
                        label="$"
                        :min="200"
                        :max="10000"
                        :step="200"
                      />
                      Hits Goal
                      <vs-input-number
                        v-model="campaign.hitsGoal"
                        :min="200"
                        :step="200"
                      />
                    </vs-col>
                    <vs-col vs-w="9">
                      <div class="info-item pt-24" style="text-align: center">
                        <small>(approximate price per hit)</small>
                        <br />
                        ${{
                          (campaign.totalBudget / campaign.hitsGoal).toFixed(2)
                        }}
                      </div>
                    </vs-col>
                  </vs-row>
                </vs-popup>
              </vs-card>
            </vs-col>
          </vs-row>

          <vs-divider />

          <vs-row style="height: 60px">
            <vs-col vs-w="1" class="flex-center">
              <vs-switch color="success" v-model="campaign.isActive">
                <span slot="on">Live</span>
                <span slot="off">Paused</span>
              </vs-switch>
            </vs-col>
            <vs-col vs-w="5" class="flex-center">
              <span class="ml-8 text--grey">
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
                  <div class="my-8">
                    <vs-card>
                      <div>
                        <vs-textarea
                          class="my-2"
                          label="Post an update"
                          placeholder="Start typing..."
                          v-model="nextPostContent"
                        />
                      </div>

                      <div slot="footer">
                        <vs-row vs-justify="flex-end">
                          <vs-button
                            x-large
                            :disabled="nextPostContent === ''"
                            @click="createActivityPost()"
                            type="gradient"
                            color="danger"
                            icon="send"
                          >
                          </vs-button>
                        </vs-row>
                      </div>
                    </vs-card>
                  </div>
                  <div>
                    <ActivityListViewer :campaignId="campaign.id" />
                  </div>
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
                <div class="my-10" @click="showGeographicTargetingPopup = true">
                  <CountryListViewer :countries="campaign.targetCountries" />
                  <vs-popup
                    title="Geographic Targeting"
                    :active.sync="showGeographicTargetingPopup"
                  >
                    <vs-row>
                      <vs-col vs-w="4">
                        <vs-select
                          placeholder="Select countries"
                          multiple
                          autocomplete
                          class="ml-8"
                          label="Regions"
                          v-model="campaign.targetCountries"
                        >
                          <vs-select-item
                            :key="country.code"
                            :value="country"
                            :text="country.name"
                            v-for="country in countryList"
                          />
                        </vs-select>
                        <div
                          style="
                            height: 300px;
                            width: 100%;
                            overflow-x: hidden;
                            overflow-wrap: break-word;
                          "
                          class="pa-8 ma-8"
                        >
                          <span
                            class="country-label"
                            v-for="country in campaign.targetCountries"
                            :key="country.code"
                            >{{ country.name }},</span
                          >
                        </div>
                      </vs-col>
                      <vs-col vs-w="8"></vs-col>
                    </vs-row>
                  </vs-popup>
                </div>

                <vs-divider />

                <div
                  class="my-10"
                  @click="showDemographicTargetingPopup = true"
                >
                  <div
                    class="pt-48 text--grey"
                    style="
                      flex-direction: column;
                      font-family: 'Roboto', sans-serif;
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

                  <vs-popup
                    title="Demographic Targeting"
                    :active.sync="showDemographicTargetingPopup"
                  >
                    <div class="pa-8">
                      Age Range
                      <vs-row>
                        <vs-col vs-w="10">
                          <vs-slider :step="1" v-model="campaign.ageRange" />
                        </vs-col>
                        <vs-col vs-w="2">
                          <div class="pa-10">
                            <div v-if="!campaign.ageRange[0]">-</div>
                            <div v-else>
                              {{ campaign.ageRange[0] }}-{{
                                campaign.ageRange[1]
                              }}
                              yo
                            </div>
                          </div>
                        </vs-col>
                      </vs-row>

                      <br />

                      Descriptors
                      <vs-textarea v-model="campaign.targetDescriptors[0]" />
                      <vs-textarea v-model="campaign.targetDescriptors[1]" />
                      <vs-textarea v-model="campaign.targetDescriptors[2]" />
                    </div>
                  </vs-popup>
                </div>

                <vs-divider />

                <div class="my-10" @click="showKeywordTargetingPopup = true">
                  <KeywordsViewer :keywords="campaign.targetKeywords" />

                  <vs-popup
                    title="Keyword Targeting"
                    :active.sync="showKeywordTargetingPopup"
                  >
                    <div style="height: 300px">
                      <vs-row>
                        <vs-col vs-w="5" class="pa-8">
                          <vs-input
                            size="large"
                            label-placeholder="keyword"
                            v-model="nextKeyword"
                            icon-after="true"
                            icon="add"
                            v-on:icon-click="addNextKeyword"
                          />
                        </vs-col>
                        <vs-col vs-w="7" class="pa-8">
                          <vs-chip
                            class="mx-4"
                            v-for="(kw, idx) of campaign.targetKeywords"
                            :key="idx"
                            >#{{ kw }}</vs-chip
                          >
                        </vs-col>
                      </vs-row>
                    </div>
                  </vs-popup>
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
import { v4 as uuidv4 } from "uuid";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import ContentEditable from "@/components/ContentEditable";
import DateRangeViewer from "@/components/DateRangeViewer";
import CountryListViewer from "@/components/CountryListViewer";
import KeywordsViewer from "@/components/KeywordsViewer";
import AssetGallery from "@/components/AssetGallery";
import ActivityListViewer from "@/components/ActivityListViewer";

import countryList from "@/assets/countryList.json";

export default {
  components: {
    DatePicker,
    ContentEditable,
    DateRangeViewer,
    CountryListViewer,
    KeywordsViewer,
    AssetGallery,
    ActivityListViewer,
  },
  data() {
    return {
      showCampaignTimelinePopup: false,
      showCampaignBudgetPopup: false,
      showGeographicTargetingPopup: false,
      showDemographicTargetingPopup: false,
      showKeywordTargetingPopup: false,
      nextKeyword: "",
      nextPostContent: "",
      countryList: countryList,
      storedCampaignData: {},
    };
  },
  computed: {
    ...mapState(["userProfile", "campaign"]),
  },
  async mounted() {
    await this.refreshData();
  },
  methods: {
    async refreshData() {
      let campaignId = this.$route.params.campaignId;
      if (!campaignId) return;
      this.$store.dispatch("refreshCampaign", campaignId);
      this.storedCampaignData = JSON.parse(JSON.stringify(this.campaign));
      console.log(this.storedCampaignData);
    },
    addNextKeyword() {
      if (
        this.nextKeyword ||
        this.campaign.targetKeywords.includes(this.nextKeyword.toLowerCase())
      )
        return;
      this.campaign.targetKeywords.push(this.nextKeyword.toLowerCase());
      this.nextKeyword = "";
    },
    createActivityPost() {
      let pData = {
        assocCampaignId: this.campaign.id.toString(),
        content: this.nextPostContent,
        type: "campaign-manager-update",
      };
      this.$store.dispatch("createActivityPost", pData);
      this.nextPostContent = "";
    },
    async saveCampaign() {
      this.$store.dispatch("saveCampaign", {
        campaign: this.campaign,
      });
    },
    async onAssetCreated(newAsset) {
      let newAssetObj = {
        name: newAsset.name,
        description: "",
        type: newAsset.type,
        source: newAsset.path,
        tags: [],
        id: uuidv4(),
        isActive: true,
      };
      this.campaign.assets.push(newAssetObj);
      await this.saveCampaign();
    },
    async onAssetDeleted(assetToDelete) {
      let fileRef = fb.storage.refFromURL(assetToDelete.source);
      await fileRef.delete();
      let delAssetIdx = this.campaign.assets.findIndex(
        (a) => a.id === assetToDelete.id
      );
      this.campaign.assets.splice(delAssetIdx, 1);
      await this.saveCampaign();
    },
  },
};
</script>

<style scoped>
</style>
