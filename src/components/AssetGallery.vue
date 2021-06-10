<template>
  <div>
    <vs-images>
      <AssetThumbnail
        v-for="(asset, idx) in bigSizedAssets"
        :key="idx"
        :asset="asset"
        classText="full-width"
      />
      <AssetThumbnail
        v-for="(asset, idx) in smallSizedAssets"
        :key="idx + Math.min(assets.length, 3)"
        :asset="asset"
        classText="third-width"
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
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    bigSizedAssets() {
      return this.assets.slice(0, Math.min(this.assets.length, 3));
    },
    smallSizedAssets() {
      return this.assets.slice(
        Math.min(this.assets.length, 3),
        this.assets.length
      );
    },
  },
  methods: {},
};
</script>