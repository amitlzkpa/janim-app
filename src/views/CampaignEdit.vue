<template>
  <div v-if="editedCampaignData.id">
    <vs-row class="px-10">
      <vs-col vs-w="3">
        <div class="mt-20 pa-10">
          <vs-images>
            <vs-image
              :key="index"
              :src="`https://picsum.photos/400/400?image=2${index}`"
              v-for="(image, index) in 2"
              class="full-width"
            />
            <vs-image
              :key="index + 2"
              :src="`https://picsum.photos/400/400?image=1${index}`"
              v-for="(image, index) in 7"
              class="third-width"
            />
          </vs-images>
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
                v-model="editedCampaignData.title"
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
                v-model="editedCampaignData.description"
                styleText="
                  cursor: select;
                  border: 1px dashed grey;
                  border-radius: 8px;
                  color: #4d4d4d;
                  font-family: 'Lato', sand-serif;
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
                  <DateRangeViewer :dateRange="editedCampaignData.dateRange" />
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
                          v-model="editedCampaignData.dateRange"
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
                  ${{ editedCampaignData.totalBudget }} bounty
                </div>
                <vs-popup
                  title="Campaign Budget"
                  :active.sync="showCampaignBudgetPopup"
                >
                  <vs-row>
                    <vs-col vs-w="3">
                      Total Budget
                      <vs-input-number
                        v-model="editedCampaignData.totalBudget"
                        label="$"
                        :min="200"
                        :max="10000"
                        :step="200"
                      />
                      Hits Goal
                      <vs-input-number
                        v-model="editedCampaignData.hitsGoal"
                        :min="200"
                        :step="200"
                      />
                    </vs-col>
                    <vs-col vs-w="9">
                      <div class="info-item pt-24" style="text-align: center">
                        <small>(approximate price per hit)</small>
                        <br />
                        ${{
                          (
                            editedCampaignData.totalBudget /
                            editedCampaignData.hitsGoal
                          ).toFixed(2)
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
              <vs-switch color="success" v-model="editedCampaignData.isActive">
                <span slot="on">Live</span>
                <span slot="off">Paused</span>
              </vs-switch>
            </vs-col>
            <vs-col vs-w="5" class="flex-center">
              <span class="ml-8 text--grey">
                <i
                  >{{
                    moment
                      .duration(
                        moment(editedCampaignData.dateRange[1]).diff(moment())
                      )
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
                  <div>
                    <vs-card
                      v-for="activityItem in activityItems"
                      :key="activityItem.id"
                    >
                      <div>
                        <span class="text--grey">
                          <i>
                            {{ moment(activityItem.date).fromNow() }}
                          </i>
                        </span>
                        <br />
                        <span>{{ activityItem.content }}</span>
                      </div>

                      <div slot="footer">
                        <vs-row vs-justify="flex-end">
                          <vs-button
                            type="gradient"
                            :color="activityItem.iconColor"
                            :icon="activityItem.icon"
                          >
                          </vs-button>
                        </vs-row>
                      </div>
                    </vs-card>
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
                  <CountryListViewer
                    :countries="editedCampaignData.targetCountries"
                  />
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
                          v-model="editedCampaignData.targetCountries"
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
                            v-for="country in editedCampaignData.targetCountries"
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
                      font-family: 'Roboto', sand-serif;
                      font-weight: 200;
                      font-size: 24px;
                    "
                  >
                    <span> TARGET PROFILE </span>
                    <div
                      v-if="editedCampaignData.ageRange[0]"
                      class="flex-center"
                    >
                      <vs-icon
                        class="material-icons-outlined"
                        icon="supervisor_account"
                        color="grey"
                        size="75px"
                      ></vs-icon>
                      <span class="ml-8" style="font-size: 36px">
                        {{ editedCampaignData.ageRange[0] }}-{{
                          editedCampaignData.ageRange[1]
                        }}
                        yo
                      </span>
                    </div>

                    <div class="my-48 px-8">
                      {{ editedCampaignData.targetDescriptors[0] }}
                    </div>

                    <div class="my-48 px-8">
                      {{ editedCampaignData.targetDescriptors[1] }}
                    </div>

                    <div class="my-48 px-8">
                      {{ editedCampaignData.targetDescriptors[2] }}
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
                          <vs-slider
                            :step="1"
                            v-model="editedCampaignData.ageRange"
                          />
                        </vs-col>
                        <vs-col vs-w="2">
                          <div class="pa-10">
                            <div v-if="!editedCampaignData.ageRange[0]">-</div>
                            <div v-else>
                              {{ editedCampaignData.ageRange[0] }}-{{
                                editedCampaignData.ageRange[1]
                              }}
                              yo
                            </div>
                          </div>
                        </vs-col>
                      </vs-row>

                      <br />

                      Descriptors
                      <vs-textarea
                        v-model="editedCampaignData.targetDescriptors[0]"
                      />
                      <vs-textarea
                        v-model="editedCampaignData.targetDescriptors[1]"
                      />
                      <vs-textarea
                        v-model="editedCampaignData.targetDescriptors[2]"
                      />
                    </div>
                  </vs-popup>
                </div>

                <vs-divider />

                <div class="my-10" @click="showKeywordTargetingPopup = true">
                  <KeywordsViewer
                    :keywords="editedCampaignData.targetKeywords"
                  />

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
                            v-for="(
                              kw, idx
                            ) of editedCampaignData.targetKeywords"
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

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import ContentEditable from "@/components/ContentEditable";
import DateRangeViewer from "@/components/DateRangeViewer";
import CountryListViewer from "@/components/CountryListViewer";
import KeywordsViewer from "@/components/KeywordsViewer";

import countryList from '@/assets/countryList.json'

export default {
  components: {
    ContentEditable,
    DateRangeViewer,
    DatePicker,
    CountryListViewer,
    KeywordsViewer,
  },
  data() {
    return {
      showCampaignTimelinePopup: false,
      showCampaignBudgetPopup: false,
      showGeographicTargetingPopup: false,
      showDemographicTargetingPopup: false,
      showKeywordTargetingPopup: false,
      nextKeyword: "",
      countryList: countryList,
      editedCampaignData: {
        id: null,
        isActive: true,
        title: "",
        description: "",
        dateRange: [],
        totalBudget: 200,
        hitsGoal: 200,
        ageRange: [],
        targetCountries: [],
        targetDescriptors: ["", "", ""],
        targetKeywords: [],
      },
      storedCampaignData: {},
      activityItems: [
        {
          id: "a",
          content: "Cras tristique elit molestie lectus congue dictum.",
          date: this.moment("2021-02-27T00:00:00"),
          icon: "favorite",
          iconColor: "danger",
        },
        {
          id: "b",
          content:
            "Fusce condimentum purus id finibus gravida. Proin sed justo congue, ultricies neque non, volutpat nulla.",
          date: this.moment("2020-12-14T00:00:00"),
          icon: "person",
          iconColor: "warning",
        },
        {
          id: "c",
          content:
            "Sed hendrerit sapien vitae felis viverra, quis efficitur velit blandit.",
          date: this.moment("2020-11-09T00:00:00"),
          icon: "favorite",
          iconColor: "danger",
        },
        {
          id: "d",
          content:
            "Mauris porttitor ligula at mollis egestas. Vestibulum aliquam urna at porttitor aliquam. Cras tristique elit molestie lectus congue dictum.",
          date: this.moment("2020-11-07T00:00:00"),
          icon: "favorite",
          iconColor: "danger",
        },
        {
          id: "e",
          content: "Justo congue, ultricies neque non, volutpat nulla.",
          date: this.moment("2020-07-01T00:00:00"),
          icon: "person",
          iconColor: "warning",
        },
        {
          id: "f",
          content:
            "Volutpat nulla molestie lectus congue dictumonec sed nisl imperdiet, auctor turpis vel, ultricies mauris.",
          date: this.moment("2020-06-19T00:00:00"),
          icon: "share",
          iconColor: "success",
        },
        {
          id: "g",
          content:
            "Volutpat nulla molestie lectus congue dictumonec sed nisl imperdiet, auctor turpis vel, ultricies mauris.",
          date: this.moment("2020-06-19T00:00:00"),
          icon: "share",
          iconColor: "success",
        },
        {
          id: "h",
          content:
            "Pelit molestie lectus congue dictum. Maecenas ornare nisl ut est euismod, sit amet vehicula est suscipit. Maecenas non est efficitur, malesuada massa eget, ullamcorper ex.",
          date: this.moment("2020-05-22T00:00:00"),
          icon: "person",
          iconColor: "warning",
        },
        {
          id: "i",
          content:
            "Mauris porttitor ligula at mollis egestas. Vestibulum aliquam urna at porttitor aliquam. Cras tristique elit molestie lectus congue dictum.",
          date: this.moment("2020-11-07T00:00:00"),
          icon: "favorite",
          iconColor: "danger",
        },
        {
          id: "j",
          content: "Justo congue, ultricies neque non, volutpat nulla.",
          date: this.moment("2020-07-01T00:00:00"),
          icon: "person",
          iconColor: "warning",
        },
      ],
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
      if (!campaignId) return;
      let doc = await fb.campaignsCollection.doc(campaignId).get();
      let campaignData = doc.data();
      campaignData.campaign.dateRange = campaignData.campaign.dateRange.map(
        (d) => d.toDate()
      );
      this.editedCampaignData = campaignData.campaign;
      this.storedCampaignData = JSON.parse(
        JSON.stringify(this.editedCampaignData)
      );
      console.log(this.editedCampaignData);
    },
    addNextKeyword() {
      if (
        this.editedCampaignData.targetKeywords.includes(
          this.nextKeyword.toLowerCase()
        )
      )
        return;
      this.editedCampaignData.targetKeywords.push(
        this.nextKeyword.toLowerCase()
      );
      this.nextKeyword = "";
    },
    async saveCampaign() {
      this.$store.dispatch("saveCampaign", {
        campaign: this.editedCampaignData,
      });
    },
  },
};
</script>

<style scoped>
</style>
