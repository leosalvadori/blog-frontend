<template>
  <div class="new-post">
    <h2>New Post</h2> 
    <form @submit.prevent="createPost" class="new-post-form">
      <input type="text" placeholder="Title" v-model="title" class="form-input" />
      <textarea placeholder="Content" v-model="content" class="form-input form-textarea"></textarea>
      <button type="submit" class="form-button">Create Post</button>
    </form>
  </div>
</template>

<script>
import BlogService from '../services/blog.service';

export default {
  data() {
    return {
      title: '',
      content: ''
    };
  },
  methods: {
    createPost() {
      BlogService.createPost(this.title, this.content)
        .then(response => {
          console.log('Post created:', response.data);
          this.$router.push('/myposts');
        })
        .catch(error => {
          console.error(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          );
        });
    }
  }
};
</script>

<style scoped>
.new-post {
  margin-top: 20px;
}

.new-post-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.form-input {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
}

.form-textarea {
  height: 200px;
  resize: vertical;
}

.form-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 1em;
}

.form-button:hover {
  background-color: #0056b3;
}
</style>