<template>
  <div style="max-height: 1200px; overflow-y: auto">
    <div
      v-for="activityItem in activityItems"
      :key="activityItem.id"
      class="flex-center fade-in"
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
              <i>
                {{ moment(activityItem.createdOn.toDate()).fromNow() }}
              </i>
              <div style="font-weight: bold">
                {{
                  activityItem.type === "hits-stats-update"
                    ? "Campaign Team"
                    : activityItem.user.name
                }}
              </div>
              <div
                style="
                  height: 100px;
                  overflow-x: hidden;
                  overflow-y: auto;
                  font-family: 'Lato', sans-serif;
                  font-size: 18px;
                  color: #4d4d4d;
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
import * as activityPostsSvc from "@/services/activityPostsSvc";

let campaignUpdateSub;

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
    campaignUpdateSub = this.$store.subscribe(async (mutation, state) => {
      if (mutation.type === "setCampaign") {
        await this.refreshData();
      }
    });
  },
  methods: {
    async refreshData() {
      if (!this.campaignId) return;
      let aItems = await activityPostsSvc.getPosts({
        campaignId: this.campaignId,
      });
      this.activityItems = [];
      for (let anI of aItems) {
        this.activityItems.push(anI);
        await this.wait(200);
      }
    },
  },
  beforeDestroy() {
    if (campaignUpdateSub) campaignUpdateSub();
  },
};
</script>