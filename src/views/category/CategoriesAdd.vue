<script>
import axios from 'axios';
import { token } from '../../components/store';
export default {
  name: 'categories-add',
  data() {
    return {
      name: '',
      slug: '',
      description: '',
      userData: '',
      userAdd: false,
      addMessage: 'کاربر به لیست اضافه شد',
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
    formData() {
      const newCategory = {
        name: this.name,
        slug: this.slug,
        description: this.description,
      };
      axios.post('http://localhost/wordpress/wp-json/wp/v2/categories', newCategory, {
        headers: {
          'Authorization': `Bearer ${token()}`,
        }
      }).then((result) => {
        this.userData = result.data
        this.snackbar = true;
        this.textErrorMessage = 'شاخه به لیست دسته‌ها اضافه شد';

        // خالی کردن اینپوت
        this.name = '';
        this.select = '';
        this.slug = '';
        this.description = '';
      }).catch(error => this.snackbar = true)
    },
  },
  computed: {
    requiredRule() {
      return value => !!value || 'الزامی است.';
    },
    minThreeCharactersRule() {
      return value => (value && value.length > 3) || 'حداقل 4 کاراکتر.';
    },
  }
}
</script>


<template>
  <v-container>
    <div class="header-information">
      <v-row class="align-center">
        <v-col cols="6">
          <h1 class="subject">افزودن دسته</h1>
          <div class="router-address">
            <RouterLink to="/" class="link-to-list">خانه</RouterLink>
            <v-icon>mdi-menu-left</v-icon>
            دسته‌ها
            <v-icon>mdi-menu-left</v-icon>
            افزودن دسته
          </div>
        </v-col>
        <v-col cols="6" class="d-flex flex-row-reverse btn-list">
          <RouterLink :to="{ name: 'categories' }" class="router-link">
            <v-btn class="btn__custom-list">
              نمایش دسته‌ها
            </v-btn>
          </RouterLink>
          <v-btn @click="formData()" color="blue-accent-4" class="ml-3">
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
            v-model="name"
            :rules="[minThreeCharactersRule, requiredRule]"
            hide-details="auto">
          </v-text-field>
        </v-col>
        
        <v-col cols=" 12" sm="6" class="pl-5">
          <label>نامک <span>*</span></label>
          <v-text-field variant="solo"
            v-model="slug" 
            :rules="[minThreeCharactersRule, requiredRule]" 
            hide-details="auto"
            required>
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
            v-model="description" 
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
.v-input {
  margin-bottom: 1.2rem;
}

</style>