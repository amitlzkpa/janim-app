<template>
  <div v-if="campaign.id">
    <vs-row class="px-10">
      <vs-col vs-w="3">
        <div class="mt-20 pa-10">
          <vs-images>
            <vs-image
              v-for="(asset, idx) in campaign.assets"
              :key="idx"
              :src="asset.source"
              class="full-width"
            />
          </vs-images>
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
                  font-family: 'Lato', sand-serif;
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

export default {
  components: {
    DateRangeViewer,
    CountryListViewer,
    KeywordsViewer,
  },
  data() {
    return {
      campaign: {},
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
      let doc = await fb.campaignsCollection.doc(campaignId).get();
      let campaignData = doc.data();
      campaignData.campaign.dateRange = campaignData.campaign.dateRange.map(
        (d) => d.toDate()
      );
      this.campaign = campaignData.campaign;
      console.log(this.campaign);
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
