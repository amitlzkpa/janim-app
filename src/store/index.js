import Vue from "vue";
import Vuex from "vuex";
import * as fb from "@/firebase";
import router from "@/router/index";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    userProfile: {},
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
  },
  actions: {
    async login({ dispatch }, form) {
      let { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      let userProfile = await fb.usersCollection.doc(user.uid).get();
      commit("setUserProfile", userProfile.data());
      if (router.currentRoute.path === "/login") {
        router.push("/home");
      }
    },
    async signup({ dispatch }, form) {
      let { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
      });
      dispatch("fetchUserProfile", user);
    },
    async reset({ dispatch }, form) {
      await fb.auth.sendPasswordResetEmail(form.email);
    },
    async logout({ commit }) {
      await fb.auth.signOut();
      commit("setUserProfile", {});
      router.push("/login");
    },

    async createActivityPost({ state, commit }, post) {
      await fb.activityPostsCollection.add({
        createdOn: new Date(),
        content: post.content,
        type: post.type,
        assocCampaignId: post.assocCampaignId,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
      });
    },

    async updateProfile({ dispatch }, user) {
      let userId = fb.auth.currentUser.uid;

      dispatch("fetchUserProfile", { uid: userId });

      let postDocs = await fb.activityPostsCollection
        .where("userId", "==", userId)
        .get();
      postDocs.forEach((doc) => {
        fb.activityPostsCollection.doc(doc.id).update({
          userName: user.name,
        });
      });
    },

    async saveCampaign({ dispatch }, campaign) {
      if (!campaign.campaign.id) {
        let c = await fb.campaignsCollection.add(campaign);
        campaign.campaign.id = c.id;
      }
      await fb.campaignsCollection
        .doc(campaign.campaign.id)
        .update({ campaign: campaign.campaign });
    },
  },
});

export default store;
