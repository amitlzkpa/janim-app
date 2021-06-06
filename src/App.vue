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
@import "../node_modules/typeface-roboto/index.css";

body {
  font-family: "Tahoma";
}

h1 {
  font-family: "Roboto", sans-serif;
  font-weight: 200;
}

h2,
h3 {
  font-family: "Roboto", sans-serif;
  font-weight: 300;
}

h4,
h5,
h6 {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
}

$spaceamounts: (2, 4, 6, 8, 10, 12, 16, 20, 24, 48);

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

$textColors: ("grey", "darkgrey");
@each $textColor in $textColors {
  .text--#{$textColor} {
    color: #{$textColor} !important;
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
</style>
