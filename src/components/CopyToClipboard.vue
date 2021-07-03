<template>
  <div
    style="
      width: 100%;
      border-radius: 4px;
      border: 1px solid grey;
      background-color: #dedede;
      padding: 2px;
      font-size: 12px;
      font-style: italics;
    "
  >
    <div @click="copyApiToken">
      <vs-icon :icon="copyTokenIcon" size="10px" color="grey" />
      | {{ token }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["token", "label"],
  data() {
    return {
      copyTokenIcon: "content_copy",
      timeout: 4000,
    };
  },

  methods: {
    copyApiToken() {
      window.navigator.clipboard.writeText(this.token);
      this.copyTokenIcon = "check";
      setTimeout(() => {
        this.copyTokenIcon = "content_copy";
      }, this.timeout);
    },
  },
};
</script>
