<template>
  <div>
    <v-container>
      <p class="text-h2 font-weight-light">Home</p>
      <v-btn @click="testFbFunction">Test</v-btn>
    </v-container>
  </div>
</template>

<script>
import * as fb_functionsSvc from "@/services/fb_functionsSvc";

export default {
  methods: {
    async testFbFunction() {
      console.log("foo");
      let q = await fb_functionsSvc.testFbFunc();
      console.log(q);
    },
  },
};
</script>

<style scoped></style>
