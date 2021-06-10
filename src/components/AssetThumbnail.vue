<template>
  <div
    @click="popupIsOpen = true"
    style="width: 100%; height: 100%; display: inline-block"
  >
    <vs-image :src="asset.source" :class="classText" />
    <vs-popup :title="asset.name" :active.sync="popupIsOpen">
      <p>
        {{ asset }}
      </p>
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