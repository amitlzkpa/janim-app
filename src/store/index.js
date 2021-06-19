import Vue from "vue";
import Vuex from "vuex";
import * as fb from "@/firebase";
import router from "@/router/index";

import campaignSchema from "@/schemas/campaign";
import * as orgSvc from "@/services/orgSvc";

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
      let campaignData;
      if (campaignId) {
        let doc = await fb.campaignsCollection.doc(campaignId).get();
        campaignData = doc.data().campaign;
      } else {
        campaignData = JSON.parse(JSON.stringify(campaignSchema));
      }
      // quick-hack start
      // convert to pure js Date object from the firebase timestamp format
      campaignData.dateRange = campaignData.dateRange.map((d) => d.toDate());
      // quick-hack end
      commit("setCampaign", campaignData);
    },
    async saveCampaign({ dispatch }, campaignData) {
      if (!campaignData.campaign.title) return;
      if (!campaignData.campaign.id || campaignData.campaign.id === "new") {
        delete campaignData.campaign.id;
        let c = await fb.campaignsCollection.add(campaignData);
        campaignData.campaign.id = c.id;
      }
      // quick-hack start
      // convert to Date object for firebase save
      campaignData.campaign.dateRange = campaignData.campaign.dateRange.map(
        (d) => new Date(d)
      );
      // quick-hack end
      await fb.campaignsCollection
        .doc(campaignData.campaign.id)
        .update({ campaign: campaignData.campaign });
      dispatch("refreshCampaign", campaignData.campaign.id);
      let reroutePath = `/campaign/edit/${campaignData.campaign.id}`;
      if (router.currentRoute.fullPath !== reroutePath)
        router.push(reroutePath);
    },

    async createActivityPost({ state, dispatch }, post) {
      await fb.activityPostsCollection.add({
        createdOn: new Date(),
        content: post.content,
        type: post.type,
        assocCampaignId: post.assocCampaignId,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
      });
      dispatch("refreshCampaign", state.campaign.id);
    },

    async createOrg({ state, dispatch }, newOrgData) {
      let newOrgFbData = await orgSvc.createNewOrg(newOrgData);
      console.log(newOrgFbData);
    },
  },

  getters: {
    getCampaign: (state) => state.campaign,
  },
});

export default store;
