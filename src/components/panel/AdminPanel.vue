<script>
import { RouterLink } from 'vue-router';

export default {
  components: { RouterLink },
  data() {
    return {
      drawer: true,
      rail: false,
      open: ['Users'],
    }
  },
  methods: {
    /**
     * بستن و باز کردن slidebar
     */
    closeSlidebar() {
      const cardSidebarElement = document.querySelector('.card-sidebar');
      if (this.rail) {
        cardSidebarElement.classList.add('custom-with-56');
      } else {
        cardSidebarElement.classList.remove('custom-with-56');
      }
    }
  }
}
</script>

<template>
  <div class="card-sidebar" @click="closeSlidebar()">
    <v-layout>
      <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
        <v-list-item prepend-avatar="../../../public/img/logo.png" title="پنل مدیریت" nav class="sidebar">

          <!-- باز و بسته شدن slidebar -->
          <template v-slot:append>
            <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail" @click="closeSlidebar()"></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list v-model:opened="open" class="list-sidebar">
          <v-list-group value="Users">
            <v-list-group value="home">
              <template v-slot:activator>
                <router-link ink to="/" class="router-link">
                  <v-list-item prepend-icon="mdi-home-outline" title="خانه" class="title one-item" value="users">
                  </v-list-item>
                </router-link>
              </template>
            </v-list-group>
          </v-list-group>

          <v-list-group value="Users">
            <v-list-group value="user">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="کاربران" class="title"
                  prepend-icon="mdi-account-outline"></v-list-item>
              </template>

              <router-link to="/users" class="router-link">
                <v-list-item prepend-icon="mdi-circle-outline" title="لیست کاربران" value="users">
                </v-list-item>
              </router-link>

              <router-link :to="{ name: 'users-add' }" class="router-link">
                <v-list-item prepend-icon="mdi-circle-outline" title="افزودن کاربر" value="users-add">
                </v-list-item>
              </router-link>

            </v-list-group>
          </v-list-group>

          <v-list-group value="Users">
            <v-list-group value="category">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="دسته‌ها" class="title"
                  prepend-icon="mdi-format-list-bulleted"></v-list-item>
              </template>

              <router-link to="/categories" class="router-link">
                <v-list-item prepend-icon="mdi-circle-outline" title="لیست دسته‌ها" value="categories">
                </v-list-item>
              </router-link>

              <router-link :to="{ name: 'categories-add' }" class="router-link">
                <v-list-item prepend-icon="mdi-circle-outline" title="افزودن دسته‌ها" value="categories-add">
                </v-list-item>
              </router-link>

            </v-list-group>
          </v-list-group>

          <v-list-group value="Users">
            <v-list-group value="post">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="پست‌ها" class="title"
                  prepend-icon="mdi-list-box-outline"></v-list-item>
              </template>

              <router-link to="/posts" class="router-link">
                <v-list-item prepend-icon="mdi-circle-outline" title="لیست پست‌ها" value="posts">
                </v-list-item>
              </router-link>

              <router-link :to="{ name: 'posts-add' }" class="router-link">
                <v-list-item prepend-icon="mdi-circle-outline" title="افزودن پست‌ها" value="posts-add">
                </v-list-item>
              </router-link>

            </v-list-group>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>

    </v-layout>
  </div>
</template>

<style scoped>
.sidebar {
  margin: .6rem 0;
}

.router-link {
  color: #fff;
  display: block;
  font-size: 14.5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.card-sidebar {
  width: 255px;
}
.custom-with-56 {
  width: 56px;
}
</style>