<template>
  <div class="post-list">    
    <div v-if="isLoading">Loading posts...</div>
    <ul v-else-if="!content.length">No posts found.</ul>
    <div v-else class="card" v-for="post in content" :key="post.id">
      <h3 class="card-title">{{ post.title }}</h3>      
      <p class="card-content">{{ post.content }}</p>       
      <div class="card-buttons">
      <button 
        @click="togglePublish(post)" 
        class="form-button" 
        :class="{'form-button-unpublish': post.status === 'published' }">
        {{ post.status === 'published' ? 'Unpublish' : 'Publish' }}
      </button>
        <button @click="deletePost(post.id)" class="form-button-delete">Delete</button>        
      </div>
    </div>
  </div>
</template>

<script>
import BlogService from "../services/blog.service";

export default {
  name: "MyPosts",
  data() {
    return {
      content: "",
      isLoading: true
    };
  },
  methods: {
    togglePublish(post) {
      this.isLoading = true;
      if (post.status === 'published') {
        BlogService.unpublishPost(post.id)
          .then(response => {
            console.log('Post unpublished:', response.data);
            this.getMyPosts();
          })
          .catch(error => {
            console.error(
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            );
            this.isLoading = false;
          });
      } else {
        BlogService.publishPost(post.id)
          .then(response => {
            console.log('Post published:', response.data);
            this.getMyPosts();
          })
          .catch(error => {
            console.error(
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
            );
            this.isLoading = false;
          });
      }
    },

    getMyPosts() {
      this.isLoading = true;
      BlogService.getMyPosts().then(
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

    deletePost(id) {
      BlogService.deletePost(id).then(
        () => {
          this.content = this.content.filter(post => post.id !== id);
        },
        (error) => {
          console.error(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
          );
        }
      );
    },

    publishPost(id) {
      BlogService.publishPost(id)
        .then(response => {
          console.log('Post published:', response.data);
          this.getMyPosts();
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
  },
  mounted() {
    this.getMyPosts();
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

.form-button-delete {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: red;
  color: #fff;
  cursor: pointer;
  font-size: 1em;  
}

.form-button-delete:hover {
  background-color: darkred;
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
  background-color: #0069d9;
}

.card-buttons {
  display: flex;  
}

.form-button-delete, .form-button {
  margin: 2px;
}

.form-button-disabled {
  background-color: gray;
  cursor: not-allowed;
}

.form-button-disabled:hover {
  background-color: gray;
}

.form-button-unpublish {
  background-color: #CCCC00;
}

.form-button-unpublish:hover {
  background-color: #999900;
}
</style>