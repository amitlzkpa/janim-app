import Vue from "vue";
import Vuex from "vuex";
import * as fb from "@/firebase";
import router from "@/router/index";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    userProfile: {},
    campaign: {},
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setCampaign(state, val) {
      state.campaign = val;
    },
  },
  actions: {
    async login({ dispatch }, form) {
      let { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );
      dispatch("refreshUserProfile", user);
    },
    async signup({ dispatch }, form) {
      let { user } = await fb.auth.createUserWithEmailAndPassword(
        form.email,
        form.password
      );
      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
      });
      dispatch("refreshUserProfile", user);
    },
    async reset({ dispatch }, form) {
      await fb.auth.sendPasswordResetEmail(form.email);
    },
    async logout({ commit }) {
      await fb.auth.signOut();
      commit("setUserProfile", {});
      router.push("/login");
    },

    async refreshUserProfile({ commit }, user) {
      let userProfile = await fb.usersCollection.doc(user.uid).get();
      commit("setUserProfile", userProfile.data());
      if (router.currentRoute.path === "/login") {
        router.push("/home");
      }
    },
    async saveUserProfile({ dispatch }, user) {
      let userId = fb.auth.currentUser.uid;

      dispatch("refreshUserProfile", { uid: userId });

      let postDocs = await fb.activityPostsCollection
        .where("userId", "==", userId)
        .get();
      postDocs.forEach((doc) => {
        fb.activityPostsCollection.doc(doc.id).update({
          userName: user.name,
        });
      });
    },

    async refreshCampaign({ commit }, campaignId) {
      if (!campaignId) return;
      let doc = await fb.campaignsCollection.doc(campaignId).get();
      let campaignData = doc.data();
      campaignData.campaign.dateRange = campaignData.campaign.dateRange.map(
        (d) => d.toDate()
      );
      commit("setCampaign", campaignData.campaign);
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
  },
});

export default store;
