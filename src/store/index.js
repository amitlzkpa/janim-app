import Vue from "vue";
import Vuex from "vuex";
import * as fb from "@/firebase";
import router from "@/router/index";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setPosts(state, val) {
      state.posts = val;
    },
  },
  actions: {
    async login({ dispatch }, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(
        form.email,
        form.password
      );
      dispatch("fetchUserProfile", user);
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get();
      commit("setUserProfile", userProfile.data());
      if (router.currentRoute.path === "/login") {
        router.push("/home");
      }
    },
    async signup({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(
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
      const userId = fb.auth.currentUser.uid;
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
      });

      dispatch("fetchUserProfile", { uid: userId });

      const postDocs = await fb.activityPostsCollection
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

fb.activityPostsCollection
  .orderBy("createdOn", "desc")
  .onSnapshot((snapshot) => {
    let postsArray = [];

    snapshot.forEach((doc) => {
      let post = doc.data();
      post.id = doc.id;

      postsArray.push(post);
    });

    store.commit("setPosts", postsArray);
  });

export default store;
