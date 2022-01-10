<template>
  <div>
    <div class="my-2">
      <v-textarea
        class="my-2"
        label="Post Body"
        placeholder="Start typing..."
        filled
        clearable
        hide-details
        auto-grow
        v-model.trim="post.content"
      ></v-textarea>
      <v-btn
        color="primary"
        block
        x-large
        :disabled="post.content === ''"
        @click="createPost()"
      >
        Post
      </v-btn>
    </div>

    <v-divider class="my-2" />

    <div>
      <div v-if="posts.length">
        <v-card v-for="post in posts" :key="post.id" class="my-2">
          <v-card-title>
            <span class="text-h6 font-weight-light">{{ post.userName }}</span>
          </v-card-title>

          <v-card-text class="text-h5 font-weight-bold">
            {{ post.content | trimLength }}
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-content>
                <v-list-item-title>{{
                  moment(post.createdOn.toDate()).fromNow()
                }}</v-list-item-title>
              </v-list-item-content>

              <v-row align="center" justify="end">
                <v-btn icon @click="likePost(post.id, post.likes)">
                  <v-icon class="ma-1"> mdi-heart </v-icon>
                </v-btn>
                <span class="subheading mr-2">{{ post.likes }}</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </div>
      <div v-else>
        <v-card outlined>
          <v-card-text class="text-h5 font-weight-light">
            There are currently no posts
          </v-card-text>
        </v-card>
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
