import { createWebHistory, createRouter } from "vue-router";
import AllPosts from "./components/Allposts.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import store from '@/store';

const Profile = () => import("./components/Profile.vue")
const MyPosts = () => import("./components/MyPosts.vue")
const NewPost = () => import("./components/NewPost.vue")
const CommentForm = () => import ("./components/CommentForm.vue")

const requireAuth = (to, from, next) => {
  if (store.getters['auth/isLoggedIn']) {
    next();
  } else {
    next('/login');
  }
};

const routes = [
  {
    path: "/",
    name: "All posts",
    component: AllPosts,
  },
  {
    path: "/allposts",
    component: AllPosts,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    beforeEnter: requireAuth
  },
  {
    path: "/myposts",
    name: "MyPosts",
    component: MyPosts,
    beforeEnter: requireAuth
  },
  {
    path: "/new-post",
    name: "NewPost",
    component: NewPost,
    beforeEnter: requireAuth
  },
  {
    path: "/comment",
    name: "CommentForm",
    component: CommentForm,
    beforeEnter: requireAuth
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;