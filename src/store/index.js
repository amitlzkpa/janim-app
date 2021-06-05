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

    async createPost({ state, commit }, post) {
      await fb.postsCollection.add({
        createdOn: new Date(),
        content: post.content,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        likes: 0,
      });
    },
    async likePost({ commit }, post) {
      const userId = fb.auth.currentUser.uid;
      const docId = `${userId}_${post.id}`;
      const doc = await fb.likesCollection.doc(docId).get();
      if (doc.exists) {
        return;
      }
      await fb.likesCollection.doc(docId).set({
        postId: post.id,
        userId: userId,
      });
      fb.postsCollection.doc(post.id).update({
        likes: post.likesCount + 1,
      });
    },

    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid;
      const userRef = await fb.usersCollection.doc(userId).update({
        name: user.name,
      });

      dispatch("fetchUserProfile", { uid: userId });

      const postDocs = await fb.postsCollection
        .where("userId", "==", userId)
        .get();
      postDocs.forEach((doc) => {
        fb.postsCollection.doc(doc.id).update({
          userName: user.name,
        });
      });
    },
  },
});

fb.postsCollection.orderBy("createdOn", "desc").onSnapshot((snapshot) => {
  let postsArray = [];

  snapshot.forEach((doc) => {
    let post = doc.data();
    post.id = doc.id;

    postsArray.push(post);
  });

  store.commit("setPosts", postsArray);
});

export default store;
