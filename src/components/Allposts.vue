<template>
  <div class="post-list">    
    <h2> All posts </h2>
    <div v-if="isLoading">Loading posts...</div>
    <ul v-else-if="!content.length">No posts found.</ul>
    <div v-else class="card" v-for="post in content" :key="post.id">
      <h3 class="card-title">{{ post.title }}</h3>      
      <p class="card-content">{{ post.content }}</p> 
      <div class="button-container">
        <button v-if="currentUser" class="form-button" @click="selectPost(post)">Comment</button>
      </div>      
      <CommentForm v-if="selectedPost && selectedPost.id === post.id" :post="selectedPost" @commentAdded="selectedPost = null; refreshComments()" />
      <CommentList :post="post" :key="commentListKey" />
    </div>
  </div>
</template>

<script>
import BlogService from "../services/blog.service";
import CommentForm from './CommentForm.vue';
import CommentList from './CommentList.vue';

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  name: "Home",
  components: {
    CommentForm,
    CommentList
  },
  data() {
    return {
      content: "",
      selectedPost: null,
      commentListKey: 0,
      isLoading: false
    };
  },
  methods: {
    refreshComments() {
      this.commentListKey++;
    },
    selectPost(post) {
      this.selectedPost = post;
    }
  },
  mounted() {
    this.isLoading = true;
    BlogService.getAllPosts().then(
      (response) => {
        this.content = response.data;
        this.isLoading = false; 
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.isLoading = false; 
      }
    );
  },
};
</script>

<style scoped>

.post-list {
  margin-top: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.card-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.card-user {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.card-content {
  font-size: 1em;
}

.button-container {
  text-align: left;
  margin-bottom: 20px;
}

.form-button {
  display: inline-block;
  width: auto;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 1em;  
}

.form-button:hover {
  background-color: #0069d9;
}
</style>