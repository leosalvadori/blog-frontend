<template>
  <form class="comment-form" @submit.prevent="addComment"> 
    <textarea v-model="commentText"></textarea>
    <button type="submit">Add Comment</button>
  </form>
</template>

<script>
import BlogService from "../services/blog.service";

export default {
  props: ['post'],
  data() {
    return {
      commentText: ''
    }
  },
  methods: {
    addComment() {
      if (this.commentText.trim() !== '') {
        BlogService.commentPost(this.post.id, this.commentText)
          .then(response => {
            console.log('Comment added:', response);
            this.commentText = ''; 
            this.$emit('commentAdded');
          })
          .catch(error => {
            console.error('Error adding comment:', error);
          });
      } else {
        this.$emit('commentAdded');
      }
    }
  }
};
</script>

<style scoped>
.comment-form {
  background-color: #f8f8f8;
  border-radius: 5px;
  padding: 20px;
  margin-top: 20px;
}

.comment-form input,
.comment-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
}

.comment-form button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.comment-form button:hover {
  background-color: #0056b3;
}
</style>