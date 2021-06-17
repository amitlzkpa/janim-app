<template>
  <div>
    <div
      v-for="activityItem in activityItems"
      :key="activityItem.id"
      class="flex-center"
    >
      <vs-row>
        <vs-col vs-w="3" class="flex-center pt-48">
          <vs-icon
            v-if="activityItem.type === 'campaign-manager-update'"
            icon="supervisor_account"
            style="
              font-size: 30px;
              padding: 8px;
              border-radius: 50%;
              border: 4px solid #5b3cc4;
              color: #5b3cc4;
            "
          />
          <vs-icon
            v-if="activityItem.type === 'hits-stats-update'"
            icon="flash_on"
            style="
              font-size: 30px;
              padding: 8px;
              border-radius: 50%;
              border: 4px solid rgb(255, 130, 0);
              color: rgb(255, 130, 0);
            "
          />
        </vs-col>
        <vs-col vs-w="9" class="pr-48">
          <vs-card>
            <div>
              <span class="text--grey">
                <i>
                  {{ moment(activityItem.createdOn.toDate()).fromNow() }}
                </i>
              </span>
              <div
                style="
                  height: 100px;
                  overflow-x: hidden;
                  overflow-y: auto;
                  font-family: 'Lato', sans-serif;
                  font-size: 18px;
                "
              >
                {{ activityItem.content }}
              </div>
            </div>
          </vs-card>
        </vs-col>
      </vs-row>
    </div>
  </div>
</template>

<script>
import * as fb from "@/firebase";

export default {
  props: {
    campaignId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      activityItems: [],
    };
  },
  async mounted() {
    await this.refreshData();
  },
  methods: {
    async refreshData() {
      if (!this.campaignId) return;
      this.activityItems = [];
      let res = await fb.activityPostsCollection
        .where("assocCampaignId", "==", this.campaignId)
        .orderBy("createdOn", "desc")
        .get();
      res.forEach((r) => {
        this.activityItems.push(r.data());
      });
    },
  },
};
</script>