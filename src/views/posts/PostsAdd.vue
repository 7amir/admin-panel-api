<script>
import axios from 'axios';
import { token } from '../../components/store';
export default {
  name: 'posts-add',
  data() {
    return {
      title: '',
      slug: '',
      content: '',
      userData: '',
      userAdd: false,
      addMessage: 'نوشته به لیست اضافه شد',
      select: null,
      items: [],
      item: '',
      snackbar: false,
      textErrorMessage: 'تمام فیلدها را پر کنید',
      timeout: 3000,
      tab: null,
    };
  },
  mounted() {
    /**
     * گرفتن ایتم دسته مادر از دسته‌هایی که وجود دارد
     */
    axios.get('http://localhost/wordpress/wp-json/wp/v2/categories', {
      headers: {
        'Authorization': `Bearer ${token()}`,
      }
    }).then((result) => {
      // اضافه کردن اسم دسته ها به دسته مادر
      this.item = result.data;
      this.item.forEach((item) => {
        this.items.push(item.name);
      })
    }).catch(error => console.log(error));
  },
  methods: {
    /**
     * دادن اطلاعات از قبیل نام، نامک و محتوا به فرم
     * api wordpress ارسال فرم به
     */
    formData() {
      const newPost = {
        title: this.title,
        slug: this.slug,
        content: this.content,
        parent: this.select,
      };
      axios.post('http://localhost/wordpress/wp-json/wp/v2/posts?status=publish', newPost, {
        headers: {
          'Authorization': `Bearer ${token()}`,
        }
      }).then((result) => {
        this.userData = result.data;
        this.snackbar = true;
        this.textErrorMessage = 'نوشته به لیست نوشته‌ها اضافه شد';
      }).catch(error => this.snackbar = true);
    },
  },
  computed: {
    requiredRule() {
      return value => !!value || 'الزامی است.';
    },
    minThreeCharactersRule() {
      return value => (value && value.length > 3) || 'حداقل 4 کاراکتر';
    },
  }
}
</script>

<template>
  <v-container>
    <div class="header-information">
      <v-row class="align-center">
        <v-col cols="6">
          <h1 class="subject">افزودن پست‌ها</h1>
          <div class="router-address">
            <RouterLink to="/" class="link-to-list">خانه</RouterLink>
            <v-icon>mdi-menu-left</v-icon>
            پست‌ها
            <v-icon>mdi-menu-left</v-icon>
            افزودن پست‌ها
          </div>
        </v-col>
        <v-col cols="6" class="d-flex flex-row-reverse btn-list">
          <RouterLink :to="{ name: 'posts' }" class="router-link">
            <v-btn class="btn__custom-list elevation-0">
              نمایش پست‌ها
            </v-btn>
          </RouterLink>
          <v-btn @click="formData()" color="blue-accent-4 elevation-0" class="ml-3">
            ذخیره
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <form action="/" @submit.prevent="formData()" class="form__user">
      <v-row class="row-form">
        <v-col cols="12" sm="6" class="pl-5">
          <label>نام کاربر</label>
          <v-text-field
            variant="solo"
            hide-details="auto">
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pr-5">
          <label>عنوان <span>*</span></label>
          <v-text-field
            variant="solo"
            v-model="title"
            :rules="[minThreeCharactersRule, requiredRule]"
            hide-details="auto">
          </v-text-field>
        </v-col>
        
        <v-col cols=" 12" sm="6" class="pl-5">
          <label>نامک <span>*</span></label>
          <v-text-field variant="solo"
            v-model="slug" 
            :rules="[minThreeCharactersRule, requiredRule]" 
            hide-details="auto">
        </v-text-field>
        </v-col>
        
        <v-col cols="12" sm="6" class="pr-5">
          <label>دسته مادر</label>
          <v-select
            v-model="select"
            :items="items"
            variant="solo">
          </v-select>
        </v-col>

        <v-col cols="12" sm="12">
          <label>توضیح <span>*</span></label>
          <v-textarea 
            variant="solo"
            v-model="content" 
            :rules="[minThreeCharactersRule, requiredRule]"
            hide-details="auto">
          </v-textarea>
        </v-col>
      </v-row>

      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ textErrorMessage }}

        <template v-slot:actions>
          <v-btn color="blue" variant="text" @click="snackbar = false">
            بستن
          </v-btn>
        </template>
      </v-snackbar>
    </form>
  </v-container>
</template>


<style scoped>

</style>