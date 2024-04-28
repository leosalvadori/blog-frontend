import axios from 'axios';

//const API_URL = 'https://fdps7qnhai.us-east-1.awsapprunner.com/api/v1/authentication/';
const API_URL = 'http://localhost:8000/api/v1/authentication/';

class AuthService {
    login(user) {
      return axios
        .post(API_URL + 'token/', {
          username: user.username,
          password: user.password
        })
        .then(response => {
          if (response.data.access) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }
  
          return response.data;
        });
    }
  
    logout() {
      localStorage.removeItem('user');
    }
  
    register(user) {
      return axios.post(API_URL + 'register/', {
        username: user.username,
        email: user.email,
        password: user.password
      });
    }
  }
  
  export default new AuthService();