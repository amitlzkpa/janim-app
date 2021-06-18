<template>
  <div>
    <div
      v-if="editMode && assets.length < 1"
      style="text-align: center"
      class="py-24"
    >
      <p style="font-weight: 200; font-style: italic">(no assets uploaded)</p>
    </div>
    <vs-images style="max-height: 800px; overflow-y: hidden; overflow-y: auto">
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
    <ImageUploader
      class="px-18"
      v-if="editMode"
      :basePath="uploadBasepath"
      :height="60"
      @onUploadComplete="onAssetCreated"
    />
  </div>
</template>

<script>
import AssetThumbnail from "@/components/AssetThumbnail";
import ImageUploader from "@/components/ImageUploader";

export default {
  components: {
    AssetThumbnail,
    ImageUploader,
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
    uploadBasepath: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    bigSizedAssets() {
      return this.assets
        .filter((a) => this.editMode || a.isActive)
        .slice(0, Math.min(this.assets.length, 4));
    },
    smallSizedAssets() {
      return this.assets
        .filter((a) => this.editMode || a.isActive)
        .slice(Math.min(this.assets.length, 4), this.assets.length);
    },
  },
  methods: {
    onAssetCreated(asset) {
      this.$emit("onAssetCreated", asset);
    },
    onAssetDeleted(asset) {
      this.$emit("onAssetDeleted", asset);
    },
  },
};
</script>