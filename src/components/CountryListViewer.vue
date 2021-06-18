<template>
  <div>
    <div v-if="baseMap" style="position: relative">
      <img
        :src="`data:image/svg+xml;utf8,${baseMap}`"
        alt="World Map"
        style="object-fit: cover; width: 100%; z-index: -9999"
      />
      <img
        v-for="(tp, idx) in topMaps"
        :key="idx"
        :src="`data:image/svg+xml;utf8,${tp}`"
        alt="Target Regions"
        style="
          object-fit: cover;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
        "
      />
    </div>
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
import countryDotsList from "@/assets/countryDotsList.json";

export default {
  props: {
    countries: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      baseMap: "",
    };
  },
  computed: {
    topMaps() {
      let mps = [];
      let dm, sm;
      for (let country of this.countries) {
        let ct = countryDotsList.find((c) => c.code === country.code);
        dm = new DottedMap({
          map: JSON.parse(ct.dotMapJson),
        });
        sm = dm.getSVG({
          radius: 0.5,
          color: "#ff9000",
          shape: "circle",
          backgroundColor: "transparent",
        });
        mps.push(encodeURIComponent(sm));
      }
      return mps;
    },
  },
  async mounted() {
    let dottedMap, svgMap;

    dottedMap = new DottedMap({ map: dottedMapJson });
    svgMap = dottedMap.getSVG({
      radius: 0.5,
      color: "#bbbbbb",
      shape: "circle",
      backgroundColor: "#ffffff",
    });
    this.baseMap = encodeURIComponent(svgMap);
  },
};
</script>