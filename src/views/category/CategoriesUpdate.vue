<script>
import axios from 'axios';
import { token } from '../../components/store';
export default {
  name: 'update-category',
  props: ['id'],
  data() {
    return {
      snackbar: false,
      text: 'نام کاربری را وارد کنید',
      timeout: 3000,
      name: '',
      slug: '',
      description: '',
      nameRules: [
        value => {
          if (value?.length > 3) return true

          return 'باید حداقل 4 کاراکتر داشته باشد.'
        },
      ],
      descriptionRules: [
      value => {
          if (value?.length > 6) return true

          return 'باید حداقل 7 کاراکتر داشته باشد.'
        },
      ]
    }
  },
  methods: {
    /**
     * بروزرسانی دسته جدید
     */
    update() {
      const newCategory = {
        name: this.name,
        slug: this.slug,
        description: this.description,
      }
      if (newCategory.name.length > 3 && newCategory.description.length > 7) {
        axios.put(`http://localhost/wordpress/wp-json/wp/v2/categories/${this.id}`, newCategory, {
          headers: {
            'Authorization': `Bearer ${token()}`,
          }
        }).then((response) => {
          console.log(response);
          this.snackbar = true;
          this.text = `دسته جدید با نام ${newCategory.name} تغییر یافت`;

          // خالی کردن انپوت ها
          this.name = '';
          this.slug = '';
          this.description = '';
        }).catch(error => console.log(error));
      } else {
        this.snackbar = true;
        this.text = 'تمام فیلدها را پر کنید'
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
          <h1 class="subject">بروزرسانی دسته</h1>
          <div class="router-address">
            <RouterLink to="/" class="link-to-list">خانه</RouterLink>
            <v-icon>mdi-menu-left</v-icon>
            دسته‌ها
            <v-icon>mdi-menu-left</v-icon>
            <RouterLink to="categories" class="link-to-list">لیست دسته‌ها</RouterLink>
            <v-icon>mdi-menu-left</v-icon>
            بروزرسانی دسته
          </div>
        </v-col>
        <v-col cols="6" class="d-flex flex-row-reverse">
          <RouterLink :to="{ name: 'categories-add' }" class="router-link">
            <v-btn class="mr-3 btn__custom-add-list">
              <v-icon>mdi-plus</v-icon>
              افزودن دسته
            </v-btn>
          </RouterLink>

          <RouterLink :to="{ name: 'categories' }" class="router-link">
            <v-btn class="btn__custom-list mr-3">
              بازگشت به لیست
            </v-btn>
          </RouterLink>

          <v-btn @click="update()" color="blue-accent-4">
            ذخیره
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-form v-model="valid" @submit.prevent="update()" class="form__user">
      <div class="title">
        شناسه دسته: {{ id }}
      </div>
      <v-row class="row-form">
        <v-col cols="12" sm="6">
          <label>نام جدید</label>
          <v-text-field 
            v-model="name" 
            :rules="nameRules"
            variant="solo">
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6">
          <label>نامک جدید</label>
          <v-text-field 
            v-model="slug" 
            :rules="nameRules"
            variant="solo">
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="12">
          <label>توضیح جدید</label>
          <v-textarea 
            v-model="description" 
            :rules="descriptionRules"
            variant="solo">
          </v-textarea>
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