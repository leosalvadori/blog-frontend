<template>
  <ul class="comment-list">
    <li class="comment-item" v-for="comment in comments" :key="comment.id">
      <p><strong>User:</strong> {{ comment.user }}</p>
      <p><strong>Comment:</strong> {{ comment.comment }}</p>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';
import BlogService from "../services/blog.service";

export default {
  props: ['post'],
  data() {
    return {
      comments: []
    }
  },
  created() {
    BlogService.getAllComments(this.post.id)
      .then(response => {
        this.comments = response.data;
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }
};
</script>

<style scoped>
.comment-list {
  list-style-type: none;
  padding: 0;
}

.comment-item {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
}

.comment-item p {
  margin: 0;
  padding: 0;
}

.comment-item p strong {
  font-weight: bold;
}
</style>