<script>
import axios from 'axios';
import { token } from '../../components/store'

export default {
  name: 'update-user',
  props: ['id'],
  data() {
    return {
      snackbar: false,
      text: 'نام کاربری را وارد کنید',
      timeout: 3000,
      name: '',
      userDataList: '',
      firstNameRules: [
        value => {
          if (value?.length > 3) return true
          return 'نام کاربر باید حداقل 3 کاراکتر داشته باشد.';
        },
      ],
    }
  },
  methods: {
    /**
     * بروز رسانی کاربر
     */
    update() {
      const newName = {
        name: this.name,
      }
      if (newName.name.length > 3) {
        axios.put(`http://localhost/wordpress/wp-json/wp/v2/users/${this.id}`, newName, {
          headers: {
            'Authorization': `Bearer ${token()}`,
          }
        }).then((response) => {
          console.log(response);
          this.snackbar = true;
          this.text = `نام کاربر به ${newName.name} تغییر یافت`;
          this.name = '';
        }).catch(error => console.log(error));
      } else {
        this.snackbar = true;
        this.text = 'نام جدید کاربر باید بیشتر از 3 کاراکتر باشد'
      }
    }
  }
}
</script>


<template>
  <v-container>
    <div class="header-information">
      <v-row class="align-center">
        <v-col cols="6">
          <h1 class="subject">بروزرسانی کاربر</h1>
          <div class="router-address">
            <RouterLink to="/" class="link-to-list">خانه</RouterLink>
            <v-icon>mdi-menu-left</v-icon>
            کاربران
            <v-icon>mdi-menu-left</v-icon>
            <RouterLink to="users" class="link-to-list">لیست کاربران</RouterLink>
            <v-icon>mdi-menu-left</v-icon>
            بروزرسانی کاربر
          </div>
        </v-col>
        <v-col cols="6" class="d-flex flex-row-reverse">
          <RouterLink :to="{ name: 'users-add' }" class="router-link">
            <v-btn class="mr-3 btn__custom-add-list">
              <v-icon>mdi-plus</v-icon>
              افزودن کاربر
            </v-btn>
          </RouterLink>

          <RouterLink :to="{ name: 'users' }" class="router-link">
            <v-btn class="btn__custom-list">
              بازگشت به لیست
            </v-btn>
          </RouterLink>

          <v-btn @click="update()" color="blue-accent-4" class="ml-3">
            ذخیره
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-form v-model="valid" @submit.prevent="update()" class="form__user">
      <div class="title">
        شناسه کاربر: {{ id }}
      </div>
      <v-row class="row-form">
        <v-col cols="12" sm="6">
          <label>نام کاربر جدید</label>
          <v-text-field v-model="name" :rules="firstNameRules" variant="solo">
          </v-text-field>
        </v-col>
      </v-row>

      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ text }}

        <template v-slot:actions>
          <v-btn color="blue" variant="text" @click="snackbar = false">
            بستن
          </v-btn>
        </template>
      </v-snackbar>
    </v-form>
  </v-container>
</template>

<style scoped>
.title {
  padding: 0.7rem 1rem;
}
</style>