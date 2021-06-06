<template>
  <div>
    <vs-row class="px-10">
      <vs-col vs-w="3">
        <div class="mt-20 pa-10">
          <vs-images>
            <vs-image
              :key="index"
              :src="`https://picsum.photos/400/400?image=2${index}`"
              v-for="(image, index) in 2"
              class="full-width"
            />
            <vs-image
              :key="index + 2"
              :src="`https://picsum.photos/400/400?image=1${index}`"
              v-for="(image, index) in 7"
              class="third-width"
            />
          </vs-images>
        </div>
      </vs-col>

      <vs-col vs-w="9">
        <div class="mt-20 pa-10">
          <vs-row>
            <vs-col vs-w="12">
              <p style="color: grey; font-family: 'Roboto', sans-serif">
                <span style="font-size: 60px; font-weight: 100"
                  >Probana Boost</span
                >
                <span
                  style="
                    font-size: 24px;
                    font-weight: 300;
                    font-style: italic;
                    color: #5b3cc4;
                  "
                >
                  Stanton Media
                </span>
              </p>
            </vs-col>
          </vs-row>

          <vs-row>
            <vs-col vs-w="12">
              <p style="font-size: 20px; color: darkgrey">
                Vestibulum pellentesque arcu a orci elementum, sed fermentum
                enim fringilla. Quisque tristique odio ac ligula pulvinar
                viverra. Donec sed nisl mollis, commodo ipsum sit amet, eleifend
                quam. Integer et enim non ante consequat fermentum eu eget
                lacus. Maecenas sit amet ipsum.
              </p>
            </vs-col>
          </vs-row>

          <vs-row class="mt-16">
            <vs-col vs-w="6" class="pa-10">
              <vs-card actionable fixed-height>
                <div class="info-item flex-center pt-10">
                  May 23rd 2020 - December 31st 2020
                </div>
              </vs-card>
            </vs-col>
            <vs-col vs-w="6" class="pa-10">
              <vs-card actionable fixed-height>
                <div class="info-item flex-center pt-10">$8000 bounty</div>
              </vs-card>
            </vs-col>
          </vs-row>

          <vs-divider />

          <vs-row>
            <vs-col vs-w="1" class="flex-center">
              <vs-button
                color="danger"
                type="gradient"
                icon="person_add"
              ></vs-button>
              <span class="ml-8 text--grey"> JOIN </span>
            </vs-col>
            <vs-col vs-w="5" class="flex-center">
              <span class="ml-8 text--grey">
                <i>28 days to go</i>
              </span>
            </vs-col>
            <vs-col vs-w="3" class="flex-center">
              <vs-icon icon="star_outline" color="rgb(255, 130, 0)"></vs-icon>
              <span class="ml-8 text--grey"> 4,702 HITS </span>
            </vs-col>
            <vs-col vs-w="3" class="flex-center">
              <vs-icon icon="person_outline" color="success"></vs-icon>
              <span class="ml-8 text--grey"> 78 MEMBERS </span>
            </vs-col>
          </vs-row>

          <vs-divider />

          <vs-row>
            <vs-col> </vs-col>
          </vs-row>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  methods: {},
};
</script>

<style scoped>
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-item {
  align-self: center;
  width: 100%;
  min-height: 40px;
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  font-weight: 300;
  color: grey;
}
</style>
