<template>
  <div>
    <div>
      {{ startDate }}
      -
      {{ endDate }}
    </div>
    <div class="info-item flex-center" v-if="hasValidDates">
      <i style="font-size: 20px"> ({{ timeGap }}) </i>
    </div>
  </div>
</template>

<script>
import moment from "moment";

function processToTimestamp(dateObject) {
  let ret = dateObject ? moment(dateObject) : null;
  return ret ? ret.format("MMM Do YYYY") : "-";
}

export default {
  props: {
    dateRange: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    startDate() {
      return processToTimestamp(this.dateRange[0]);
    },
    endDate() {
      return processToTimestamp(this.dateRange[1]);
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