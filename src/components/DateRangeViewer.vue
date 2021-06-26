<template>
  <div>
    <div>
      {{ startDate }}
      -
      {{ endDate }}
    </div>
    <div class="flex-center" v-if="hasValidDates">
      <i style="font-size: 20px"> ({{ timeGap }}) </i>
    </div>
  </div>
</template>

<script>
import * as utils from "@/utils";

export default {
  props: {
    dateRange: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    startDate() {
      return utils.processToTimestamp(this.dateRange[0]);
    },
    endDate() {
      return utils.processToTimestamp(this.dateRange[1]);
    },
    hasValidDates() {
      return this.startDate !== "-" && this.endDate !== "-";
    },
    timeGap() {
      if (!this.hasValidDates) return "-";
      let ret = this.moment
        .duration(
          this.moment(this.dateRange[0]).diff(this.moment(this.dateRange[1]))
        )
        .humanize();
      return ret;
    },
  },
};
</script>