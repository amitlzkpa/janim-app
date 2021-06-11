<template>
  <div>
    <vs-images>
      <AssetThumbnail
        v-for="(asset, idx) in bigSizedAssets"
        :key="idx"
        :asset="asset"
        :editMode="editMode"
        @onAssetDeleted="onAssetDeleted"
        classText="half-width pa-4"
      />
      <AssetThumbnail
        v-for="(asset, idx) in smallSizedAssets"
        :key="idx + Math.min(assets.length, 4)"
        :asset="asset"
        :editMode="editMode"
        @onAssetDeleted="onAssetDeleted"
        classText="third-width pa-6"
      />
    </vs-images>
  </div>
</template>

<script>
import AssetThumbnail from "@/components/AssetThumbnail";

export default {
  components: {
    AssetThumbnail,
  },
  props: {
    assets: {
      type: Array,
      default: () => [],
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    bigSizedAssets() {
      return this.assets.slice(0, Math.min(this.assets.length, 4));
    },
    smallSizedAssets() {
      return this.assets.slice(
        Math.min(this.assets.length, 4),
        this.assets.length
      );
    },
  },
  methods: {
    onAssetDeleted(asset) {
      this.$emit("onAssetDeleted", asset);
    },
  },
};
</script>