<script>
import { RouterLink } from 'vue-router';
import axios from 'axios';
import '../../assets/login-style.css'
import { token } from '../../components/store';
// import { mdiAccount } from "@mdi/js";
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount, mdiEyeOutline, mdiEyeOffOutline  } from '@mdi/js';
 
export default {
  components: { RouterLink, SvgIcon},
  data() {
    return {
      username: '',
      password: '',
      newUsername: '',
      newPassword: '',
      newEmail: '',
      isEmptyError: false,
      showErrorMessage: 'نام کاربری و رمز خود را وارد کنید',
      signIn: false,
      valid: false,
      revealPassword: false,
      path: mdiAccount,mdiEyeOutline, mdiEyeOffOutline,

      nameRules: [
        value => {
          if (value) return true
        },
        value => {
          if (value?.length <= 10) return true

          return 'Name must be less than 10 characters.'
        },
      ],
      email: '',
      emailRules: [
        value => {
          if (value) return true
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true

          return 'فرمت ایمیل را درست وارد کنید'
        },
      ],
    };
  },
  icons: {
    mdiAccount
  },
  methods: {
    formData() {
      const newUser = {
        username: this.newUsername,
        email: this.newEmail,
        password: this.newPassword,
      };
      if (newUser.username && newUser.email && newUser.password) {
        axios.post('http://localhost/wordpress/wp-json/wp/v2/users', newUser, {
          headers: {
            'Authorization': `Bearer ${token()}`,
            'content-Type': 'application/json',
          }
        }).then((result) => {
          console.log(result);
          this.$emit('update:loginTo', true);
        }).catch(error => console.log(error))

      } else {
        this.isEmptyError = true
        setTimeout(() => {
          this.isEmptyError = false;
        }, 3000);
      }
    },
    async checkLogin() {
      if (this.username && this.password) {
        try {
          const response = await axios.post(
            'http://localhost/wordpress/wp-json/jwt-auth/v1/token',
            {
              username: this.username,
              password: this.password,
            }
          );

          const authToken = response.data.token;

          this.$emit('update:loginTo', true);
          this.$router.push('/'); // تغییر به صفحه ادمین پنل
          this.isEmptyError = false;
        } catch (error) {
          this.isEmptyError = true;
          this.showErrorMessage = 'ورود ناموفق: نام کاربری یا رمز اشتباه می‌باشد';
        }
      } else {
        this.isEmptyError = true;
        setTimeout(() => {
          this.isEmptyError = false;
        }, 3000);
      }
    },
    showFocus(event) {
      const parent = event.target.parentNode;
      parent.classList.add("focus");
    },
    removeFocus(event) {
      const parent = event.target.parentNode;
      if (this.username === "") {
        parent.classList.remove("focus");
      }
    },
    login() {
      this.signIn = !this.signIn
    },
    changePass() {
      this.revealPassword = !this.revealPassword;
    }
  },

};
</script>

<template>
  <img class="wave" src="../../../public/img/wave.png" alt="">

  <v-container class="container">
    <div class="login-content">
      <form action="/" @submit.prevent="submit" v-if="signIn">
        <img src="../../../public/img/avatar.svg" alt="">
        <h2 class="title">خوش آمدید</h2>

        <div class="input__login user">
          <i class="fas fa-user"></i>
          <input
            type="text"
            class="input" 
            placeholder="نام کاربر" 
            v-model="username" 
            @focus="showFocus"
            @blur="removeFocus"
            >
        </div>
        <div class="input__login pass">
          <i class="fas fa-lock"></i>
          <input 
            :type="revealPassword ? 'text' : 'password'"
            class="input" 
            placeholder="رمز کاربر" 
            v-model="password"
            @focus="showFocus" 
            @blur="removeFocus"
            >
          <div class="icon-eye" @click="changePass()">
            <svg-icon type="mdi" 
              :path="revealPassword ? mdiEyeOutline : mdiEyeOffOutline" 
              class="icon"
              >
            </svg-icon>
          </div>
        </div>
        <a href="#" class="link__sing-in" @click="login()">برای ثبت نام کلیک کنید</a>
        <v-btn class="btn" @click="checkLogin()">
          ورود
        </v-btn>
        <v-alert variant="outlined" type="error" border="bottom" v-if="isEmptyError">
          {{ showErrorMessage }}
        </v-alert>
      </form>

      <v-form v-model="valid" v-if="!signIn" @submit.prevent="formData">
        <img src="../../../public/img/avatar.svg" alt="">
        <h2 class="title">فرم ثبت نام</h2>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="newUsername" 
                :rules="nameRules" 
                :counter="10" 
                label="نام کاربر" 
                required
                class="input__form"
                >
              </v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="newEmail" 
                :rules="emailRules" 
                label="ایمیل"
                required
                class="input__form"
                >
              </v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                :type="revealPassword ? 'text' : 'password'"
                v-model="newPassword"
                :rules="nameRules"
                :counter="10"
                label="رمز عبور"
                required
                class="input__form"
                >
                <div class="icon-eye" @click="changePass()">
                  <svg-icon type="mdi" :path="revealPassword ? mdiEyeOutline : mdiEyeOffOutline" class="icon"></svg-icon>
                </div>
              </v-text-field>
            </v-col>
            <a href="#" @click="login()">از قبل اکانت دارید؟</a>
            <v-btn type="submit" class="btn">
              ثبت نام
            </v-btn>
            <v-alert variant="outlined" type="error" border="bottom" v-if="isEmptyError">
              {{ showErrorMessage }}
            </v-alert>
          </v-row>
        </v-container>
      </v-form>

    </div>
    <div class="img">
      <img src="../../../public/img/bg.svg" alt="">
    </div>

  </v-container>
</template>

<style scoped>
.v-col {
  margin: -9px 0;
}

.wave {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  z-index: -1;
}

.container {
  height: 100vh;
  display: flex;
  justify-content: center;
}

.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 8rem;
}

.login-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}

.img img {
  width: 500px;
}

form {
  width: 370px;
}

.login-content img {
  height: 100px;
}

.login-content h2 {
  margin: 15px 0;
  color: #333;
  text-transform: uppercase;
  font-size: 2.9rem;
}

.login-content .input__login {
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
}

.login-content .input__login.user {
  margin-top: 0;
}

i,
.input__login svg {
  transition: 0.3s;
  color: #d9d9d9;
  position: relative;
  top: 12px;
  right: 12px;
}

.input__login:before,
.input__login:after {
  content: "";
  position: absolute;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: #38d39f;
  transition: 0.4s;
}

.input__login:before {
  right: 50%;
}

.input__login:after {
  left: 50%;
}

.input__login.focus:before,
.input__login.focus:after {
  width: 50%;
}

.input__login.focus>svg {
  color: #38d39f;
}

.input__login input {
  width: 100%;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem 0.2rem;
  font-size: 1rem;
  color: #555;
}

.input__login.pass {
  margin-bottom: 4px;
}

a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
  margin-right: 12px;
}

.link__sing-in {
  margin-top: 1rem;
  margin-right: 0;
}

a:hover {
  color: #38d39f;
}

.btn {
  display: block;
  width: 100%;
  padding: 25px 0;
  line-height: 0;
  border-radius: 25px;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
  background-size: 200%;
  font-size: 1.2rem;
  color: #fff;
  text-transform: uppercase;
  margin: 1rem 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-position: right;
}

.icon-eye {
  position: absolute;
  left: 2%;
}

.icon {
  cursor: pointer;
  color: #d9d9d9;

}
</style>