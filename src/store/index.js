import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index";

import * as userSvc from "@/services/userSvc";

Vue.use(Vuex);

const store = new Vuex.Store({
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
  },
});

export default store;
