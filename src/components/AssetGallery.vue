<template>
  <div>
    <vs-images>
      <vs-image
        v-for="(asset, idx) in bigSizedAssets"
        :key="`i-${idx}`"
        :src="asset.source"
        class="full-width"
        @click="showImgPopup[idx] = true"
      />
      <vs-image
        v-for="(asset, idx) in smallSizedAssets"
        :key="idx + Math.min(assets.length, 3)"
        :src="asset.source"
        class="third-width"
      />
    </vs-images>
  </div>
</template>

<script>
export default {
  props: {
    assets: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showImgPopup: [],
    };
  },
  created() {
    this.showImgPopup = this.assets.map(a => false);
  },
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
};
</script>