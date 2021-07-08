<template>
  <div>
    <div v-if="filteredUsers.length < 1">
      <span class="flex-center full-width country-label">No users found</span>
    </div>
    <div v-else>
      <div>
        <div v-for="(user, idx) of filteredUsers" :key="idx">
          <div style="display: flex">
            <div style="flex-grow: 1">
              <h3
                :style="`
                font-weight: 600;
                color: ${
                  highlightActive && currentlySelectedUser.id === user.id
                    ? '#ff0080'
                    : ''
                }`"
              >
                {{ user.name }}
              </h3>
            </div>

            <div style="display: flex">
              <div
                style="
                  color: #696969;
                  font-weight: 600;
                  font-size: 18px;
                  width: 80px;
                "
              >
                <vs-tooltip text="Total earned">
                  <p>
                    <vs-icon icon="payments" size="15px" color="696969" />
                    {{
                      userProfile.currencyPref
                        ? userProfile.currencyPref.symbol_native
                        : ""
                    }}
                    {{ utils.getHash(user.name, 47) | currency }}
                  </p>
                </vs-tooltip>
                <vs-tooltip text="Total clicks">
                  <p>
                    <vs-icon icon="ads_click" size="15px" color="696969" />
                    {{ utils.getHash(user.name, 877) }}
                  </p>
                </vs-tooltip>
              </div>

              <div style="width: 80px; font-size: 18px; cursor: pointer">
                <div class="raiseOnHover" @click="updateSelectedUser(user)">
                  <vs-icon
                    icon="paid"
                    :style="`
                      font-size: 30px;
                      padding: 8px;
                    `"
                  />
                </div>
              </div>
            </div>
          </div>
          <vs-divider />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import * as utils from "@/utils";

let sampleUsers1 = [];
let sampleUsers2 = [
  {
    id: "01",
    name: "Sridevi Norris",
  },
  {
    id: "02",
    name: "Deven Richelieu",
  },
  {
    id: "03",
    name: "Uno Nieddu",
  },
  {
    id: "04",
    name: "Hildegard Bengtsdotter",
  },
];
let sampleUsers3 = [
  {
    id: "05",
    name: "Hildegard Bengtsdotter",
  },
  {
    id: "06",
    name: "Amor MacMathan",
  },
  {
    id: "07",
    name: "Miriam Adolfsson",
  },
];

let sampleUsersArray = [sampleUsers1, sampleUsers2, sampleUsers3];

export default {
  props: {
    highlightActive: {
      type: Boolean,
      default: true,
    },
    sampleUserIdx: {
      type: Number,
      default: 0,
    },
    usersList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // allUsers: [],
      allUsers: this.usersList || sampleUsersArray[this.sampleUserIdx],
      filteredUsers: [],
      currentlySelectedUser: {},
      utils: utils,
    };
  },
  computed: {
    ...mapState(["userProfile"]),
  },
  async mounted() {
    await this.applyFilter();
  },
  methods: {
    async applyFilter() {
      this.filteredUsers = this.allUsers;
    },
    async updateSelectedUser(updUser) {
      this.currentlySelectedUser = updUser;
      // lets use this event to trigger the payment
      let payoutDetails = {
        user: updUser,
        amount: utils.getHash(updUser.name, 47),
      };
      this.$emit("onPayClicked", payoutDetails);
    },
  },
};
</script>

<style scoped>
</style>