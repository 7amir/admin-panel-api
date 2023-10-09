<script>
import { RouterLink } from 'vue-router';
import axios from 'axios';
import { token } from '../../components/store';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount, mdiEyeOutline, mdiEyeOffOutline, mdiLock, mdiEmail } from '@mdi/js';

export default {
  name: 'login',
  components: { RouterLink, SvgIcon },
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
      path: mdiAccount, mdiEyeOutline, mdiEyeOffOutline, mdiLock, mdiEmail,
      iconVisible: true,
      passIconVisible: true,
      emailIconVisible: true,
      nameRules: [
        value => {
          if (value) return true;
        },
        value => {
          if (value?.length <= 10) return true;
          return 'نام  و رمز کاربر باید زیر 10 کاراکتر باشد';
        },
      ],
      email: '',
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
          this.$emit('update:loginTo', true);
          this.$router.push('/');
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
          this.snackbar = false
        } catch (error) {
          this.snackbar = true
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
      <v-form v-model="valid" @submit.prevent="submit" v-if="signIn">
        <img src="../../../public/img/avatar.svg" alt="">
        <h2>خوش آمدید</h2>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="نام کاربر" variant="underlined" :counter="10" :rules="nameRules" v-model="username">
                <template v-slot:prepend-inner>
                  <v-icon size="small">mdi-account</v-icon>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field label="رمز عبور" variant="underlined" :counter="10" :rules="nameRules" v-model="password"
                :type="revealPassword ? 'text' : 'password'">
                <template v-slot:prepend-inner>
                  <v-icon size="small">mdi-lock</v-icon>
                </template>
                <div class="icon-eye" @click="changePass()">
                  <svg-icon type="mdi" :path="revealPassword ? mdiEyeOutline : mdiEyeOffOutline"></svg-icon>
                </div>
              </v-text-field>
            </v-col>

            <a href="#" @click="login()">برای ثبت نام کلیک کنید</a>
            <v-btn type="submit" class="btn" @click="checkLogin()">
              ورود
            </v-btn>
            <v-alert variant="outlined" type="error" border="bottom" v-if="isEmptyError">
              {{ showErrorMessage }}
            </v-alert>
          </v-row>
        </v-container>
      </v-form>

      <v-form v-model="valid" v-if="!signIn" @submit.prevent="formData">
        <img src="../../../public/img/avatar.svg" alt="">
        <h2>فرم ثبت نام</h2>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field label="نام کاربر" variant="underlined" :counter="10" :rules="nameRules" v-model="newUsername">
                <template v-slot:prepend-inner>
                  <v-icon size="small">mdi-account</v-icon>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field label="ایمیل" variant="underlined" v-model="newEmail" :rules="emailRules" type="email"
                required>
                <template v-slot:prepend-inner>
                  <v-icon size="small">mdi-email</v-icon>
                </template>
              </v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field label="رمز عبور" variant="underlined" :counter="10"
                :type="revealPassword ? 'text' : 'password'" v-model="newPassword" :rules="nameRules" required>
                <template v-slot:prepend-inner>
                  <v-icon size="small">mdi-lock</v-icon>
                </template>
                <div class="icon-eye" @click="changePass()">
                  <svg-icon type="mdi" :path="revealPassword ? mdiEyeOutline : mdiEyeOffOutline"></svg-icon>
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

i,
.input__login svg {
  transition: 0.3s;
  color: #d9d9d9;
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
  cursor: pointer;
  color: #d9d9d9;
  left: 2%;
}

.v-alert .v-alert__prepend {
  display: none;
}

.input__form .v-field__field {
  background: #fff;
}

.v-messages__message {
  text-align: right;
}
</style>