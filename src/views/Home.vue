<template>
  <div>
    <h2>Home</h2>
    <div>
      <div>
        <form @submit.prevent>
          <button @click="createPost()" :disabled="post.content === ''">
            post
          </button>
          <br />
          <textarea
            v-model.trim="post.content"
            placeholder="create a post"
          ></textarea>
        </form>
      </div>

      <div v-if="posts.length">
        <hr />
        <div v-for="post in posts" :key="post.id">
          <b>{{ post.userName }}</b>
          <br />
          <span>{{ post.content | trimLength }}</span>
          <br />
          <span>{{ moment(post.createdOn.toDate()).fromNow() }}</span>
          <br />
          <button @click="likePost(post.id, post.likes)">+</button>
          {{ post.likes }} like{{ post.likes !== 1 ? "s" : "" }}
          <hr />
        </div>
      </div>
      <div v-else>
        <p>There are currently no posts</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  filters: {
    trimLength(val) {
      if (val.length < 200) {
        return val;
      }
      return `${val.substring(0, 200)}...`;
    },
  },
  data() {
    return {
      post: {
        content: "",
      },
    };
  },
  computed: {
    ...mapState(["userProfile", "posts"]),
  },
  methods: {
    createPost() {
      this.$store.dispatch("createPost", { content: this.post.content });
      this.post.content = "";
    },
    likePost(id, likesCount) {
      this.$store.dispatch("likePost", { id, likesCount });
    },
  },
};
</script>

<style scoped></style>
