<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
// @import "~@fontsource/roboto/index.css";
@import "~@fontsource/lato/index.css";

body {
  font-family: "Roboto", sans-serif;
  color: grey;
}

h1 {
  font-weight: 200;
}

h2,
h3 {
  font-weight: 300;
}

h4,
h5,
h6 {
  font-weight: 400;
}

$spaceamounts: (2, 4, 6, 8, 10, 12, 16, 18, 20, 24, 30, 36, 48);

$sides: (top, bottom, left, right);
@each $space in $spaceamounts {
  @each $side in $sides {
    .m#{str-slice($side, 0, 1)}-#{$space} {
      margin-#{$side}: #{$space}px !important;
    }

    .p#{str-slice($side, 0, 1)}-#{$space} {
      padding-#{$side}: #{$space}px !important;
    }
  }
}

@each $space in $spaceamounts {
  .mx-#{$space} {
    margin-left: #{$space}px !important;
    margin-right: #{$space}px !important;
  }
  .my-#{$space} {
    margin-top: #{$space}px !important;
    margin-bottom: #{$space}px !important;
  }
  .ma-#{$space} {
    margin-left: #{$space}px !important;
    margin-right: #{$space}px !important;
    margin-top: #{$space}px !important;
    margin-bottom: #{$space}px !important;
  }

  .px-#{$space} {
    padding-left: #{$space}px !important;
    padding-right: #{$space}px !important;
  }
  .py-#{$space} {
    padding-top: #{$space}px !important;
    padding-bottom: #{$space}px !important;
  }
  .pa-#{$space} {
    padding-left: #{$space}px !important;
    padding-right: #{$space}px !important;
    padding-top: #{$space}px !important;
    padding-bottom: #{$space}px !important;
  }
}

.full-width {
  width: 100% !important;
}

.half-width {
  width: 48.5% !important;
}

.third-width {
  width: 32% !important;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.info-item {
  align-self: center;
  width: 100%;
  min-height: 40px;
  font-size: 24px;
  font-weight: 300;
}

.country-label {
  font-size: 14px;
  font-weight: 300;
}

.vs-image--img {
  background-size: cover !important;
}

.fade-in {
  animation: fadeIn 1s;
  -webkit-animation: fadeIn 1s;
  -moz-animation: fadeIn 1s;
  -o-animation: fadeIn 1s;
  -ms-animation: fadeIn 1s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
