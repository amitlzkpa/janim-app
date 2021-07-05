<template>
  <div
    style="
      display: flex;
      flex-grow: 1;
      text-align: center;
      align-items: flex-end;
      overflow: auto;
    "
  >
    <p :style="cssStyleCurrValue">
      {{ currValueRendered | currency }}
    </p>
    <p :style="cssStyleCurrCurrency + ';margin-left:4px;'">
      {{ currCurrencyRendered }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    currValue: {
      type: Number,
      default: null,
    },
    currCurrency: {
      type: String,
      default: null,
    },
    cssStyleCurrValue: {
      type: String,
      default: "font-size: 18px; font-weight: 200",
    },
    cssStyleCurrCurrency: {
      type: String,
      default: "font-size: 18px; font-weight: 600",
    },
  },
  computed: {
    currValueRendered() {
      return this.currValue;
    },
    currCurrencyRendered() {
      return this.currCurrency;
    },
  },
};
</script>

<style scoped>
</style>