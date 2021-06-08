<template>
  <div>
    <img
      src="/imgs/dotted-map.png"
      alt="Target Regions"
      style="object-fit: cover; width: 100%"
    />
    <div class="flex-center mt-10" style="flex-wrap: wrap">
      <span
        v-for="country in countries"
        :key="country.code"
        class="country-label"
        >{{ country.name }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    countries: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>