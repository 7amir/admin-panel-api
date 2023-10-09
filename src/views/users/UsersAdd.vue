<script>
import axios from 'axios';
import { token } from '../../components/store';
import { VDatePicker } from 'vuetify/labs/vDatePicker';

export default {
  name: 'add-user',
  components: {VDatePicker},
  data() {
    return {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      result: '',
      snackbar: false,
      textErrorMessage: 'تمام فیلدها را پر کنید',
      timeout: 3000,
      tab: null,
      visible: false,
      visible2: false,
      phoneNumber: '98+',

      emailRules: [
        value => {
          if (value) return true;
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true;
          return 'فرمت ایمیل را درست وارد کنید';
        },
      ],
    };
  },
  methods: {
    formData() {
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
      };

      if (newUser.username
        && newUser.email
        && newUser.password === this.repeatPassword
        && newUser.password
        && this.repeatPassword) {
        axios.post('http://localhost/wordpress/wp-json/wp/v2/users', newUser, {
          headers: {
            'Authorization': `Bearer ${token()}`,
            'content-Type': 'application/json',
          }
        }).then((result) => {
          this.snackbar = true;
          this.textErrorMessage = `کاربر ${newUser.username} به لیست کاربران اضافه شد`;

          // خالی کردن اینپوت
          this.username = '';
          this.email = '';
          this.password = '';
          this.repeatPassword = '';
        }).catch(error => console.log(error))

      } else {
        this.snackbar = true;
        if (newUser.password !== this.repeatPassword) {
          this.textErrorMessage = 'رمز نادرست است';
        } else {
          this.textErrorMessage = 'فیلدهای خالی را پر کنید';
        }
      }
    },
    formatPhoneNumber() {
      // حذف هر چیزی که از 10 رقم بیشتر است
      this.phoneNumber = this.phoneNumber.replace(/\D/g, '').slice(0, 12);
    },
  },
  computed: {
    requiredRule() {
      return value => !!value || 'الزامی است.';
    },
    minThreeCharactersRule() {
      return value => (value && value.length > 3) || 'حداقل 4 کاراکتر';
    },
    phoneNumberRule() {
      return [
        (v) => !!v || 'شماره همراه الزامی است',
        (v) =>
          /^[+]?[0-9]*$/.test(v) || 'شماره همراه باید شامل اعداد باشد',
        (v) => v.length === 10 || 'شماره همراه باید 10 رقم باشد',
      ];
    },
  }
}
</script>

<template>
  <v-container>
    <div class="header-information">
      <v-row class="align-center">
        <v-col cols="6">
          <h1 class="subject">افزودن کاربر</h1>
          <div class="router-address">
            <RouterLink to="/" class="linbtn-list">خانه</RouterLink>
            <v-icon>mdi-menu-left</v-icon>
            <span> کاربران </span>
            <v-icon>mdi-menu-left</v-icon>
            <span> افزودن کاربر </span>
          </div>
        </v-col>
        <v-col cols="6" class="d-flex flex-row-reverse">
          <RouterLink :to="{ name: 'users' }" class="router-link">
            <v-btn class="btn__custom-list">
              نمایش کاربران
            </v-btn>
          </RouterLink>
          <v-btn @click="formData()" color="blue-grey-darken-2" class="ml-3">
            ذخیره
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <v-form v-model="valid" @submit.prevent="formData" class="form__user">
      <v-row class="row-form">
        <v-col cols="12" sm="6" class="pl-5">
          <label>نام</label>
          <v-text-field variant="solo">
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pr-5">
          <label>نام کاربری <span>*</span></label>
          <v-text-field variant="solo" v-model="username" :rules="[minThreeCharactersRule, requiredRule]" required>
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pl-5">
          <label>نقش</label>
          <v-select :items="['مشترک', 'مشارکت‌کننده', 'نویسنده', 'ویرایشگر', 'مدیر کل']" class="select-role"
            variant="solo">
          </v-select>
        </v-col>

        <v-col cols="12" sm="6" class="pr-5">
          <label>ایمیل <span>*</span></label>
          <v-text-field variant="solo" v-model="email" :rules="emailRules" type="email">
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pl-5">
          <label>رمز عبور <span>*</span></label>
          <v-text-field variant="solo" v-model="password" :rules="[minThreeCharactersRule, requiredRule]"
            :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off '" :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible">
          </v-text-field>
        </v-col>

        <v-col cols="12" sm="6" class="pr-5">
          <label>تکرار رمز عبور <span>*</span></label>
          <v-text-field variant="solo" v-model="repeatPassword" :rules="[minThreeCharactersRule, requiredRule]"
            :append-inner-icon="visible2 ? 'mdi-eye' : 'mdi-eye-off'" :type="visible2 ? 'text' : 'password'"
            @click:append-inner="visible2 = !visible2">
          </v-text-field>
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

    </v-form>
  </v-container>
</template>

<style scoped>
</style>