import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://fdps7qnhai.us-east-1.awsapprunner.com/api/v1/posts/';
// const API_URL = 'http://localhost:8000/api/v1/posts/';

class BlogService {
  getAllPosts() {
    return axios.get(API_URL);
  }

  getMyPosts() {
    return axios.get(API_URL + '?my_posts', { headers: authHeader() });
  }

  getAllComments(id) {
    return axios.get(API_URL + id + '/comments/list/', { headers: authHeader() });
  }

  commentPost(id, comment) {
    return axios.post(API_URL + id + '/comments/create/', { comment }, { headers: authHeader() });
  }

  deletePost(id) {
    return axios.delete(API_URL + id + '/', { headers: authHeader() });
  }

  createPost(title, content) {
    return axios.post(API_URL + 'create/', { title, content }, { headers: authHeader() });
  }

  publishPost(id) {
    return axios.patch(API_URL + id + '/', { status:'published' }, { headers: authHeader() });
  }

  unpublishPost(id) {
    return axios.patch(API_URL + id + '/', { status:'draft' }, { headers: authHeader() });
  }
}

export default new BlogService();