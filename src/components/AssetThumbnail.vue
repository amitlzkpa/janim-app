<template>
  <div @click="popupIsOpen = true" :class="classText">
    <vs-image :src="asset.source" style="width: 100%; height: 100%" />
    <vs-popup :title="asset.name" :active.sync="popupIsOpen">
      <vs-row>
        <vs-col vs-w="4">
          <a :href="asset.source" target="_blank">
            <vs-image :src="asset.source" style="width: 100%" />
          </a>
        </vs-col>
        <vs-col vs-w="8" class="pa-12">
          <div style="display: flex">
            <i class="country-label">
              {{ asset.id }}
            </i>
            <div style="flex-grow: 1"></div>
            <vs-switch v-if="editMode" color="success" v-model="asset.isActive">
              <span slot="on">Live</span>
              <span slot="off">Inactive</span>
            </vs-switch>
          </div>
          <div v-if="editMode" class="my-8" style="display: flex; height: 60%">
            <vs-textarea v-model="asset.description" style="width: 60%" />
            <div class="pa-4" style="flex-grow: 1">
              <vs-input
                size="large"
                label-placeholder="tags"
                v-model="nextTag"
                icon-after="true"
                icon="add"
                class="full-width"
                v-on:icon-click="addNextTag"
              />
              <br />
              <vs-chip class="mx-4" v-for="(tag, idx) of asset.tags" :key="idx"
                >#{{ tag }}</vs-chip
              >
            </div>
          </div>
          <div v-else class="my-8" style="display: flex; height: 60%">
            <div style="width: 60%">
              {{ asset.description }}
            </div>
            <div class="pa-4" style="flex-grow: 1">
              <vs-chip class="mx-4" v-for="(tag, idx) of asset.tags" :key="idx"
                >#{{ tag }}</vs-chip
              >
            </div>
          </div>
          <div v-if="editMode" style="display: flex">
            <vs-button color="danger" type="flat">Delete</vs-button>
            <div style="flex-grow: 1"></div>
            <vs-button color="primary" type="filled">Save</vs-button>
          </div>
        </vs-col>
      </vs-row>
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