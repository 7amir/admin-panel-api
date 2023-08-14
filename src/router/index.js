import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AddUser from '../views/users/AddUser.vue';
import Users from '../views/users/Users.vue';
import Logout from '../views/forms/Logout.vue';
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
      path: '/user-add',
      name: 'add',
      component: AddUser
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
  ]
})

export default router
