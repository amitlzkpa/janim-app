<template>
  <div @click="popupIsOpen = true" :class="classText">
    <vs-image :src="asset.source" style="width: 100%; height: 100%" />
    <vs-popup :title="asset.name" :active.sync="popupIsOpen">
      <div>
        <vs-row>
          <vs-col vs-w="4">
            <vs-image :src="asset.source" style="width: 100%; height: 100%" />
          </vs-col>
          <vs-col vs-w="8" class="pa-12">
            <div style="display: flex">
              <vs-switch color="success" v-model="asset.isActive">
                <span slot="on">Live</span>
                <span slot="off">Inactive</span>
              </vs-switch>
              <i class="country-label">
                {{ asset.id }}
              </i>
              <div style="flex-grow: 1"></div>
              <vs-icon icon="visibility" color="grey" size="16px"></vs-icon>
              <vs-icon icon="delete" color="grey" size="16px"></vs-icon>
            </div>
            <vs-textarea v-model="asset.description" style="height: 100%" />
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
  },
  data() {
    return {
      popupIsOpen: false,
    };
  },
};
</script>