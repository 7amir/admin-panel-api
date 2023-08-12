<script>
import axios from 'axios';
import { token } from '../../components/store';
export default {
  data() {
    return {
      userName: '',
      name: '',
      email: '',
      password: '',
      result: '',
      userAdd: false,
      addMessage: 'کاربر به لیست اضافه شد'
    };
  },
  methods: {
    formData() {
      const newUser = {
        username: this.userName,
        name: this.name,  
        email: this.email,
        password: this.password,
      };
      axios.post('http://localhost/wordpress/wp-json/wp/v2/users',
        newUser,
        {
          headers: {
            'Authorization': `Bearer ${token()}`,
            'content-Type': 'application/json',
          }
        })
        .then((result) => {
          this.userAdd = true,

          // خالی کردن اینپوت
          this.userName = '',
          this.name = '',
          this.email = '',
          this.password = '',

          setTimeout(() => {
            this.userAdd = false;
          }, 3000);

        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<template>
  <div class="add-user">
    <h2>افزودن کاربر جدید</h2>
    <p>کاربر جدیدی بسازید و آن را به این سایت اضافه کنید</p>

    <form action="/" @submit.prevent="formData">
      <label>
        نام کاربری
        <input type="text" v-model="userName" required>
      </label>
      <label>
        نام
        <input type="text" v-model="name" required>
      </label>
      <label>
        ایمیل
        <input type="email" v-model="email" required>
      </label>
      <label>
        پسورد
        <input type="password" v-model="password" required>
      </label>

      <button>افزودن کاربر جدید</button>
    </form>
    <v-alert v-if="userAdd" text='کاربر به لیست اضافه شد'>
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

form {
  margin-top: 2rem;
}

input {
  width: 250px;
  border: 1px solid;
  border-radius: 2px;
  background: #fff;
  margin-right: .7rem;
}

label {
  display: block;
  text-align: left;
  width: 100%;
  margin-top: 1rem;
}

button {
  margin: 2rem 2rem;
  border: none;
  background: #cd6133;
  color: #fff;
  padding: 5px 11px;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
}
</style>