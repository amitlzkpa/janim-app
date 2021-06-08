<template>
  <div>
    <div v-if="keywords.length < 1" style="text-align: center" class="pa-24">
      <p
        class="text--grey"
        style="
          font-family: 'Roboto', sans-serif;
          font-weight: 200;
          font-style: italic;
        "
      >
        (no keywords)
      </p>
    </div>
    <div v-else>
      <vs-chip class="mx-4" v-for="(kw, idx) of keywords" :key="idx"
        >#{{ kw }}</vs-chip
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    keywords: {
      type: Array,
      default: () => [],
    },
  },
};
</script>