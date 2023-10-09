import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Users from '../views/users/Users.vue';
import UsersAdd from '../views/users/UsersAdd.vue';
import UserUpdate from '../views/users/UserUpdate.vue';
import Categories from '../views/category/Categories.vue';
import CategoriesAdd from '../views/category/CategoriesAdd.vue';
import CategoriesUpdate from '../views/category/CategoriesUpdate.vue';
import Posts from '../views/posts/Posts.vue';
import PostsAdd from '../views/posts/PostsAdd.vue';
import PostUpdate from '../views/posts/PostUpdate.vue';
import Login from '../views/forms/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/users/add',
      name: 'users-add',
      component: UsersAdd
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/users:id',
      name: 'update-user',
      component: UserUpdate,
      props: true,
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/categories/add',
      name: 'categories-add',
      component: CategoriesAdd
    },
    {
      path: '/categories:id',
      name: 'update-categories',
      component: CategoriesUpdate,
      props: true,
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts,
    },
    {
      path: '/posts/add',
      name: 'posts-add',
      component: PostsAdd,
    },
    {
      path: '/posts:id',
      name: 'update-post',
      component: PostUpdate,
      props: true
    },
  ]
})

export default router
