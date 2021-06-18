<template>
  <div>
    <img
      v-if="mapSrc"
      :src="`data:image/svg+xml;utf8,${mapSrc}`"
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
import DottedMap from "dotted-map/without-countries";
import dottedMapJson from "@/assets/dottedMap.json";

export default {
  props: {
    countries: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      mapSrc: "",
    };
  },
  async mounted() {
    let dMap = new DottedMap({ map: dottedMapJson });
    let svgMap = dMap.getSVG({
      radius: 0.5,
      color: "#bbbbbb",
      shape: "circle",
      backgroundColor: "#ffffff",
    });
    this.mapSrc = encodeURIComponent(svgMap);
  },
};
</script>