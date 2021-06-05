<template>
  <div>
    <vs-row style="height: 400px">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">
        -
      </vs-col>
      <vs-col vs-type="flex" vs-justify="left" vs-align="center" vs-w="6">
        <div style="display: flex; flex-direction: column">
          <h1>vyrall</h1>
          <p>The gig economy for influencers.</p>
        </div>
      </vs-col>
    </vs-row>

    <vs-divider />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
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

<style scoped></style>
