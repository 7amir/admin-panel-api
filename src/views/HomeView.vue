<script>
import axios from 'axios';
import { RouterLink, RouterView } from 'vue-router';
import { token } from '../components/store';

export default {
  name: 'home',
  components: { RouterLink, RouterView, token },
  data() {
    return {
      usersCount: '',
      categoriesCount: '',
      postsCount: '',
    }
  },
  mounted() {
    this.getUsers();
    this.getPosts();
    this.getCategories();
  },
  methods: {
    getUsers() {
      /**
       * api wordpress گرفتن لیست کاربر از 
       */
      axios.get('http://localhost/wordpress/wp-json/wp/v2/users?per_page=100', {
        headers: {
          'Authorization': `Bearer ${token()}`,
        }
      }).then((response) => {
        this.usersCount = response.data.length;
      }).catch(error => console.log(error));
    },
    /**
     * تعداد پست‌ها
     */
    getPosts() {
      axios.get('http://localhost/wordpress/wp-json/wp/v2/posts', {
        headers: {
          'Authorization': `Bearer ${token()}`,
        }
      }).then((response) => {
        this.postsCount = response.data.length;
      }).catch(error => console.log(error))
    },
    /**
     * تعداد دسته‌ها
     */
    getCategories() {
      axios.get('http://localhost/wordpress/wp-json/wp/v2/categories', {
        headers: {
          'Authorization': `Bearer ${token()}`,
        }
      }).then((response) => {
        this.categoriesCount = response.data.length;
      }).catch(error => console.log(error));
    },
  }
}
</script>

<template>
  <v-container>
    <div class="header-information">
      <v-row class="align-center">
        <v-col cols="6">
          <h1 class="subject">نمایه کلی</h1>
          <p class="router-address">
            خانه
          </p>
        </v-col>
      </v-row>
    </div>

    <div class="form__user">
      <div class="img-home">
        <v-img aspect-ratio="16/9" cover src="../../public/img/profilebg.jpg">
        </v-img>
      </div>

      <v-container class="header-info">
        <v-row class="row-center">
          <v-col class="d-flex align-center justify-lg-space-between">
            <RouterLink :to="{ name: 'categories' }" class="router-link">
              <v-btn class="btn__lists">
                نمایش دسته‌ها
              </v-btn>
            </RouterLink>

            <RouterLink :to="{ name: 'users' }" class="router-link">
              <v-btn class="btn__lists">
                نمایش کاربران
              </v-btn>
            </RouterLink>

            <RouterLink :to="{ name: 'posts' }" class="router-link">
              <v-btn class="btn__lists">
                نمایش پست‌ها
              </v-btn>
            </RouterLink>
          </v-col>

          <v-col cols="5" class="col-position">
            <v-menu location="end">
              <template v-slot:activator="{ props }">
                <div class="user-account" v-bind="props">
                  <v-avatar image="../../../public/img/me.jpg" size="85"></v-avatar>
                </div>
              </template>
            </v-menu>
            <div class="text-box">
              <h3 class="text-3">امیر رجب زاده</h3>
              <h5 class="text-5">Front-end</h5>
            </div>
          </v-col>

          <v-col>
            <v-row>
              <v-col class="pl-0 pr-0">
                <v-icon class="icon-info">mdi-format-list-bulleted</v-icon>
                <h3 class="text-3">{{ categoriesCount }}</h3>
                <h5 class="text-5">دسته‌ها</h5>
              </v-col>

              <v-col class="pl-0 pr-0">
                <v-icon class="icon-info">mdi-account-outline</v-icon>
                <h3 class="text-3">{{ usersCount }}</h3>
                <h5 class="text-5">کاربران</h5>
              </v-col>

              <v-col class="pl-0 pr-0">
                <v-icon class="icon-info">mdi-list-box-outline</v-icon>
                <h3 class="text-3">{{ postsCount }}</h3>
                <h5 class="text-5">پست‌ها</h5>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<style scoped>
.row-center {
  text-align: center;
}

.text-box {
  position: relative;
  top: 20px;
}

.text-box .text-3 {
  margin: 1px 0 0 0;
}

.text-3 {
  font-size: 20px;
  font-family: 'Vazir-bold';
  display: block;
  margin: 1px 0 -4px 0;
}

.col-position {
  position: relative;
}

.user-account {
  width: 100%;
  position: absolute;
  top: -63%;
  right: 0%;
  transform: translate(6.7%);
}

.user-account .v-avatar {
  position: absolute;
}

.text-5 {
  font-size: 13px;
}

.icon-info {
  font-size: 21px;
}

.btn__lists {
  font-size: 12.5px;
  color: #263544;
  border: 1px solid #263544;
  transition: all .3s ease-in-out;
}
.btn__lists:hover {
  color: #fff;
  background: #263544;
}
</style>
