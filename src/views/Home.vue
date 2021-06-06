<template>
  <div>
    <vs-row>
      <vs-col vs-w="3">
        <div class="mt-20 pa-10">
          <vs-card>
            <div slot="header">
              <h3>New Post</h3>
            </div>
            <div>
              <vs-textarea
                v-model.trim="post.content"
                placeholder="Start typing..."
                height="200px"
              />
              <vs-button
                type="gradient"
                @click="createPost()"
                class="full-width"
                >Post</vs-button
              >
            </div>
          </vs-card>
        </div>
      </vs-col>

      <vs-col vs-w="5">
        <div class="mt-20 pa-10">
          <div v-if="posts.length">
            <vs-card v-for="post in posts" :key="post.id">
              <div>
                <b>{{ post.userName }}</b>
                <br />
                <span>{{ post.content | trimLength }}</span>
                <br />
                <span>{{ moment(post.createdOn.toDate()).fromNow() }}</span>
              </div>

              <div slot="footer">
                <vs-row vs-justify="flex-end">
                  <vs-button
                    @click="likePost(post.id, post.likes)"
                    type="gradient"
                    color="danger"
                    icon="favorite"
                  >
                    {{ post.likes }}
                  </vs-button>
                </vs-row>
              </div>
            </vs-card>
          </div>

          <div v-else>
            <p class="text--grey">There are currently no posts</p>
          </div>
        </div>
      </vs-col>
    </vs-row>
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
