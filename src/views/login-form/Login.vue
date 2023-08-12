<script>
import { RouterLink } from 'vue-router';

export default {
  components: { RouterLink },
  data() {
    return {
      userLogin: [
        { id: 1, name: 'amir', password: '123' }
      ],
      userName: '',
      userPassword: '',
      loginTo: false,
      showEmptyError: false
    }
  },

  methods: {
    checkLogin(user) {
      if (this.userName && this.userPassword) {
        if (this.userName === user.name && this.userPassword === user.password) {
          this.$emit('update:loginTo', true);
        } else {
          this.$emit('update:loginTo', false);
        }
      } else {
        this.showEmptyError = true
        setTimeout(() => {
          this.showEmptyError = false
        }, 3000);
      }
    },
    showFocus(event) {
      const parent = event.target.parentNode.parentNode;
      parent.classList.add("focus");
    },
    removeFocus(event) {
      const parent = event.target.parentNode.parentNode;
      if (this.userName === "") {
        parent.classList.remove("focus");
      }
    },
  }
}
</script>

<template>
  <img class="wave" src="../../assets/img/wave.png">
  <div class="container">
    <div class="login-content">
      <form action="/" @submit.prevent>
        <img src="../../assets/img/avatar.svg">
        <h2 class="title">خوش آمدید</h2>
        <div class="input-div one">
          <i class="fas fa-user"></i>
          <div class="div">
            <input type="text" class="input" placeholder="نام کاربر" v-model="userName" @focus="showFocus"
              @blur="removeFocus">
          </div>
        </div>
        <div class="input-div pass">
          <i class="fas fa-lock"></i>
          <div class="div">
            <input type="password" class="input" placeholder="رمز کاربر" v-model="userPassword" @focus="showFocus"
              @blur="removeFocus">
          </div>
        </div>
        <a href="#">رمز خود را فراموش کرده‌اید؟</a>
        <button v-for="user in userLogin" :key="user.id" class="btn" @click="checkLogin(user)">
          <router-link v-if="loginTo" to="/">ورود</router-link>
          <span v-else>ورود</span>
        </button>
        <v-alert variant="outlined" type="error" border="bottom" v-if="showEmptyError">
          نام کاربری و رمز خود را وارد کنید
        </v-alert>
      </form>

    </div>
    <div class="img">
      <img src="../../assets/img/bg.svg">
    </div>

  </div>
</template>

<style scoped>
.v-alert>>>.v-alert__prepend {
  display: none;
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

.login-content .input-div {
  position: relative;
  display: grid;
  grid-template-columns: 7% 93%;
  margin: 25px 0;
  padding: 5px 0;
  border-bottom: 2px solid #d9d9d9;
}

.login-content .input-div.one {
  margin-top: 0;
}

i,
.input-div svg {
  transition: 0.3s;
  color: #d9d9d9;
  position: relative;
  top: 12px;
  right: 12px;
}

.input-div:before,
.input-div:after {
  content: "";
  position: absolute;
  bottom: -2px;
  width: 0%;
  height: 2px;
  background-color: #38d39f;
  transition: 0.4s;
}

.input-div:before {
  right: 50%;
}

.input-div:after {
  left: 50%;
}

.input-div.focus:before,
.input-div.focus:after {
  width: 50%;
}

.input-div.focus>svg {
  color: #38d39f;
}

.input-div>div>input {
  width: 100%;
  border: none;
  outline: none;
  background: none;
  padding: 0.5rem 0.7rem 0.2rem;
  font-size: 1rem;
  color: #555;
}

.input-div.pass {
  margin-bottom: 4px;
}

a {
  display: block;
  text-align: right;
  text-decoration: none;
  color: #999;
  font-size: 0.9rem;
  transition: 0.3s;
}

a:hover {
  color: #38d39f;
}

.btn {
  display: block;
  width: 100%;
  height: 50px;
  border-radius: 25px;
  outline: none;
  border: none;
  background-image: linear-gradient(to right, #32be8f, #38d39f, #32be8f);
  background-size: 200%;
  font-size: 1.2rem;
  color: #fff;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  margin: 1rem 0;
  cursor: pointer;
  transition: 0.5s;
}

.btn:hover {
  background-position: right;
}
</style>