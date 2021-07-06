<template>
  <div @click="popupIsOpen = true" :class="classText">
    <vs-image
      :src="asset.source"
      :style="`
        opacity: ${asset.isActive ? '1' : '0.4'};
        padding: ${asset.isActive ? '0' : '12'}px;
        width: 100%; height: 100%;
        box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.4);
      `"
    />
    <vs-popup :title="asset.name" :active.sync="popupIsOpen">
      <div>
        <vs-row>
          <vs-col>
            <a :href="asset.source" target="_blank">
              <vs-image :src="asset.source" style="width: 100%" />
            </a>
          </vs-col>
        </vs-row>
        <vs-row class="mt-8">
          <vs-col>
            <vs-row>
              <vs-col vs-w="12">
                <CopyToClipboard
                  :token="`${pageOrigin}/go?uuid=${campaign.id}_${asset.id}&c=${campaign.id}&a=${asset.id}&u=${userProfile.id}`"
                  label="Hot Link"
                />

                <vs-input
                  v-if="editMode"
                  size="small"
                  placeholder="Target URL"
                  v-model="asset.targetUrl"
                  class="full-width my-8"
                />
                <div v-else class="full-width my-8">
                  <a :href="asset.targetUrl" target="_blank">
                    {{ asset.targetUrl }}
                  </a>
                </div>

                <vs-textarea
                  v-if="editMode"
                  v-model="asset.description"
                  class="full-width"
                  style="height: 120px"
                />
                <div v-else class="full-width" style="height: 120px">
                  {{ asset.description }}
                </div>

                <vs-input
                  v-if="editMode"
                  size="large"
                  label-placeholder="tags"
                  v-model="nextTag"
                  icon-after="true"
                  icon="add"
                  class="full-width mb-8"
                  v-on:icon-click="addNextTag"
                />
                <vs-chip
                  class="mx-4"
                  v-for="(tag, idx) of asset.tags"
                  :key="idx"
                  >#{{ tag }}</vs-chip
                >
              </vs-col>
            </vs-row>
            <div v-if="editMode" style="display: flex" class="mt-20">
              <vs-switch
                v-if="editMode"
                color="success"
                v-model="asset.isActive"
              >
                <span slot="on">Live</span>
                <span slot="off">Inactive</span>
              </vs-switch>
              <div style="flex-grow: 1"></div>
              <vs-button color="danger" type="flat" @click="onDeleteClicked"
                >Delete</vs-button
              >
            </div>
          </vs-col>
        </vs-row>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CopyToClipboard from "@/components/CopyToClipboard";

export default {
  components: {
    CopyToClipboard,
  },
  props: {
    asset: {
      type: Object,
      default: () => {},
    },
    classText: {
      type: String,
      default: "",
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      popupIsOpen: false,
      nextTag: "",
    };
  },
  computed: {
    ...mapState(["campaign", "userProfile"]),
    pageOrigin() {
      return window.location.origin;
    },
  },
  methods: {
    addNextTag() {
      if (!this.nextTag || this.asset.tags.includes(this.nextTag.toLowerCase()))
        return;
      this.asset.tags.push(this.nextTag.toLowerCase());
      this.nextTag = "";
    },
    onDeleteClicked() {
      this.$emit("onAssetDeleted", this.asset);
      this.popupIsOpen = false;
    },
  },
};
</script>