<template>
  <div>
    <vs-row class="px-10">
      <vs-col vs-w="3">
        <div class="mt-20 pa-10">
          <vs-upload
            multiple
            class="full-width"
            action="https://jsonplaceholder.typicode.com/posts/"
            @on-success="successUpload"
          />
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
                  {{
                    campaign.dateRange[0]
                      ? moment(campaign.dateRange[0]).format("MMM Do YYYY")
                      : "-"
                  }}
                  -
                  {{
                    campaign.dateRange[1]
                      ? moment(campaign.dateRange[1]).format("MMM Do YYYY")
                      : "-"
                  }}
                </div>
                <div
                  class="info-item flex-center"
                  v-if="campaign.dateRange[0] && campaign.dateRange[1]"
                >
                  <i style="font-size: 20px">
                    ({{
                      moment
                        .duration(
                          moment(campaign.dateRange[0]).diff(
                            campaign.dateRange[1]
                          )
                        )
                        .humanize()
                    }})
                  </i>
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
                <div class="info-item flex-center pt-10">$8000 bounty</div>
              </vs-card>
            </vs-col>
          </vs-row>

          <vs-divider />

          <vs-row>
            <vs-col vs-w="1" class="flex-center">
              <vs-button
                color="danger"
                type="gradient"
                icon="person_add"
              ></vs-button>
              <span class="ml-8 text--grey"> JOIN </span>
            </vs-col>
            <vs-col vs-w="5" class="flex-center">
              <span class="ml-8 text--grey">
                <i>28 days to go</i>
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
                  <img
                    src="/imgs/dotted-map.png"
                    alt="Target Regions"
                    style="object-fit: cover; width: 100%"
                  />
                  <div class="flex-center mt-10" style="flex-wrap: wrap">
                    <span class="country-label">USA</span>
                    <span class="country-label">California</span>
                    <span class="country-label">Portland</span>
                    <span class="country-label">Oregon</span>
                    <span class="country-label">West Coast</span>
                    <span class="country-label">Barcelona</span>
                    <span class="country-label">Spain</span>
                    <span class="country-label">Hamburg</span>
                    <span class="country-label">Munich</span>
                    <span class="country-label">Germany</span>
                  </div>
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
                    <span> AGE </span>
                    <div class="flex-center">
                      <vs-icon
                        class="material-icons-outlined"
                        icon="supervisor_account"
                        color="grey"
                        size="75px"
                      ></vs-icon>
                      <span class="ml-8" style="font-size: 36px">
                        8-24 yo
                      </span>
                    </div>

                    <div class="my-48 px-8">
                      Sed hendrerit sapien vitae felis viverra, quis efficitur
                      velit blandit.
                    </div>

                    <div class="my-48 px-8">
                      Proin et nisi at nunc pretium gravida.
                    </div>

                    <div class="my-48 px-8">
                      Festibulum porta ipsum at erat ullamcorper, sit amet
                      convallis nisl convallis.
                    </div>
                  </div>
                </div>

                <vs-divider />

                <div class="my-10">
                  <vs-chip>#SOCCER</vs-chip>
                  <vs-chip>#EPL</vs-chip>
                  <vs-chip>#LIVERPOOL</vs-chip>
                  <vs-chip>#RONALDO</vs-chip>
                  <vs-chip>#JERSEY</vs-chip>
                  <vs-chip>#GERARD</vs-chip>
                  <vs-chip>#REDS</vs-chip>
                  <vs-chip>#ANFIELD</vs-chip>
                  <vs-chip>#MESSI</vs-chip>
                  <vs-chip>#YOUNEVERWALKALONE</vs-chip>
                  <vs-chip>#BLUES</vs-chip>
                  <vs-chip>#TRAINING</vs-chip>
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

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import ContentEditable from "@/components/ContentEditable";

export default {
  components: {
    ContentEditable,
    DatePicker,
  },
  data() {
    return {
      showCampaignTimelinePopup: false,
      campaign: {
        title: "Probana Boost",
        description:
          "Vestibulum pellentesque arcu a orci elementum, sed fermentum enim fringilla. Quisque tristique odio ac ligula pulvinar viverra. Donec sed nisl mollis, commodo ipsum sit amet, eleifend quam. Integer et enim non ante consequat fermentum eu eget lacus. Maecenas sit amet ipsum.",
        dateRange: [],
      },
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
  methods: {
    successUpload() {
      this.$vs.notify({
        color: "success",
        title: "Upload Success",
        text: "Lorem ipsum dolor sit amet, consectetur",
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
