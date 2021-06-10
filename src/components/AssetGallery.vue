<template>
  <div>
    <vs-images>
      <template v-for="(asset, idx) in bigSizedAssets">
        <div
          :key="`d-${idx}`"
          @click="openPopup(idx)"
          style="width: 100%; height: 100%"
        >
          <vs-image :key="`i-${idx}`" :src="asset.source" class="full-width" />
          <vs-popup
            :key="`p-${idx}`"
            title="Lorem ipsum dolor sit amet"
            :active.sync="showImgPopup[idx]"
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </vs-popup>
        </div>
      </template>
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
      showImgPopup: {},
    };
  },
  created() {
    this.assets.forEach((a, i) => {
      this.showImgPopup[i] = false;
    });
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
  methods: {
    openPopup(idx) {
      this.showImgPopup[idx] = !this.showImgPopup[idx];
    },
  },
};
</script>