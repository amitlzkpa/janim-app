<template>
  <div>
    <div v-if="filteredUsers.length < 1">
      <span class="flex-center full-width country-label">No users found</span>
    </div>
    <div v-else>
      <div>
        <div
          v-for="(user, idx) of filteredUsers"
          :key="idx"
          class="raiseOnHover"
          @click="updateSelectedUser(user)"
        >
          <h3
            :style="`color:${
              highlightActive && currentlySelectedUser.id === user.id
                ? '#ff0080'
                : ''
            }`"
          >
            {{ user.name }}
          </h3>
          <vs-divider />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
      this.$emit("userSelected", updUser);
    },
  },
};
</script>

<style scoped>
</style>