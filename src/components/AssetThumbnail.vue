<template>
  <div @click="popupIsOpen = true" :class="classText">
    <vs-image :src="asset.source" style="width: 100%; height: 100%" />
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
            <i class="country-label">
              {{ asset.id }}
            </i>
            <vs-row>
              <vs-col vs-w="8">
                <vs-textarea
                  v-if="editMode"
                  v-model="asset.description"
                  class="full-width mt-18"
                  style="height: 120px"
                />
                <div v-else class="full-width" style="height: 120px">
                  {{ asset.description }}
                </div>
              </vs-col>
              <vs-col vs-w="4" class="pl-8">
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
            <div v-if="editMode" style="display: flex">
              <vs-switch
                v-if="editMode"
                color="success"
                v-model="asset.isActive"
              >
                <span slot="on">Live</span>
                <span slot="off">Inactive</span>
              </vs-switch>
              <div style="flex-grow: 1"></div>
              <vs-button color="danger" type="flat">Delete</vs-button>
            </div>
          </vs-col>
        </vs-row>
      </div>
    </vs-popup>
  </div>
</template>

<script>
export default {
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
  methods: {
    addNextTag() {
      if (!this.nextTag || this.asset.tags.includes(this.nextTag.toLowerCase()))
        return;
      this.asset.tags.push(this.nextTag.toLowerCase());
      this.nextTag = "";
    },
  },
};
</script>