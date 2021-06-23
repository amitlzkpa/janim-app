import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index";

import * as userSvc from "@/services/userSvc";
import * as campaignSvc from "@/services/campaignSvc";
import * as activityPostsSvc from "@/services/activityPostsSvc";

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
      let u = await userSvc.currentUser();
      if (u && u.id) await userSvc.signOut();
      let user = await userSvc.signIn(form);
      dispatch("refreshUserProfile", user);
    },
    async signup({ dispatch }, form) {
      let user = await userSvc.createUser(form);
      dispatch("refreshUserProfile", user);
    },
    async reset({ dispatch }, form) {
      await userSvc.resetPassword(form);
    },
    async logout({ commit }) {
      await userSvc.signOut();
      commit("setUserProfile", {});
      router.push("/login");
    },

    async refreshUserProfile({ commit }, userObj) {
      let user = await userSvc.getUser({ userId: userObj.id });
      commit("setUserProfile", user);
      if (router.currentRoute.path === "/login") {
        router.push("/home");
      }
    },
    async saveUserProfile({ dispatch }, valsForUpdatedUser) {
      let user = await userSvc.updateUser(valsForUpdatedUser);
      dispatch("refreshUserProfile", user);
    },

    async refreshCampaign({ commit }, campaignId) {
      let campaignData = await campaignSvc.getCampaign(campaignId);
      commit("setCampaign", campaignData);
    },
    async saveCampaign({ dispatch }, campaignData) {
      if (!campaignData.campaign.title) return;
      let updatedCampaign = await campaignSvc.saveCampaign(campaignData);
      dispatch("refreshCampaign", updatedCampaign.campaign.id);
      let reroutePath = `/campaign/edit/${updatedCampaign.campaign.id}`;
      if (router.currentRoute.fullPath !== reroutePath)
        router.push(reroutePath);
    },

    async createActivityPost({ state, dispatch }, post) {
      activityPostsSvc.createPost(post);
      dispatch("refreshCampaign", state.campaign.id);
    },
  },

  getters: {
    getCampaign: (state) => state.campaign,
  },
});

export default store;
