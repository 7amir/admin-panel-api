import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import Setting from '../views/Setting.vue';
import AddUser from '../views/users/AddUser.vue';
import Users from '../views/users/Users.vue';
import Exit from '../views/Exit.vue';
import Login from '../views/login-form/Login.vue';
// import Login from '../components/login-form/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/exit',
      name: 'exit',
      component: Exit
    },
    {
      path: '/add',
      name: 'add',
      component: AddUser
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})

export default router
