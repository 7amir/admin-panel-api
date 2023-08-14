<script>
import axios from 'axios';
import { token } from '../../components/store';
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      result: '',
      userAdd: false,
      addMessage: 'کاربر به لیست اضافه شد',
    };
  },
  methods: {
    formData() {
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      if (newUser.username && newUser.email && newUser.password) {
        axios.post('http://localhost/wordpress/wp-json/wp/v2/users', newUser, {
          headers: {
            'Authorization': `Bearer ${token()}`,
            'content-Type': 'application/json',
          }
        }).then((result) => {
          this.userAdd = true,
            // خالی کردن اینپوت
            this.username = '',
            this.email = '',
            this.password = '',

            setTimeout(() => {
              this.userAdd = false;
            }, 3000);
        }).catch(error => console.log(error))

      } else {
        this.userAdd = true
        this.addMessage = 'فیلدهای خالی را پر کنید'

        setTimeout(() => {
          this.userAdd = false;
        }, 3000);
      }
    },
  },
  computed: {
    requiredRule() {
      return value => !!value || 'الزامی است.';
    },
    minThreeCharactersRule() {
      return value => (value && value.length > 3) || 'حداقل 4 کاراکتر.';
    },
    emailRule() {
      return value =>
        /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value) || 'فرمت ایمیل نادرست است.';
    },
  }
}
</script>

<template>
  <div class="add-user">
    <h2>افزودن کاربر جدید</h2>
    <p>کاربر جدیدی بسازید و آن را به این سایت اضافه کنید</p>

    <form action="/" @submit.prevent="formData" class="form-user-add">
      <v-text-field
        v-model="username"
        label="نام کاربر" 
        :rules="[minThreeCharactersRule, requiredRule]"
        hide-details="auto">
      </v-text-field>
      <v-text-field 
        v-model="email" 
        label="ایمیل" 
        :rules="[emailRule, requiredRule]"
        hide-details="auto">
      </v-text-field>
      <v-text-field 
        v-model="password" 
        label="پسورد" 
        :rules="[minThreeCharactersRule, requiredRule]"
        hide-details="auto"
        type="password">
      </v-text-field>
      <v-btn type="submit" class="btn-user-add">
        افزودن کاربر جدید
      </v-btn>
    </form>

    <v-alert v-if="userAdd">
      {{ addMessage }}
    </v-alert>
  </div>
</template>

<style scoped>
.add-user {
  margin: 2rem 1rem;
}

h2 {
  margin-bottom: 1rem;
  font-size: 23px;
  font-family: 'Vazir-bold';
}

p {
  font-size: 13px;
  color: #919191;
}

.form-user-add {
  margin-top: 1rem;
  width: 500px;
}

.btn-user-add {
  margin: 1rem 0;
  border: none;
  background: #cd6133;
  color: #fff;
  padding: 5px 11px;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
}

.v-input {
  margin-bottom: 1.2rem;
}
</style>