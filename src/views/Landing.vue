<template>
  <div>
    <vs-row style="height: 700px">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <div style="width: 100%; height: 100%">
          <AnimLines />
        </div>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="6">
        <div style="display: flex; flex-direction: column">
          <p style="font-size: 92px; font-weight: 100">vyrall</p>
          <h1>The gig economy for influencers.</h1>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AnimLines from "@/components/AnimLines";

export default {
  components: {
    AnimLines,
  },
  data() {
    return {
      number: 4,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
    isLoggedIn() {
      return Object.keys(this.userProfile).length > 0;
    },
  },
};
</script>

<style scoped>
</style>
