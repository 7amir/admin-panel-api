<template>
  <div class="logout">
    <span>برای خروج از حساب کلیک کنید</span>
    <v-btn class="btn__logout" @click="logout">خروج</v-btn>
  </div>
</template>

<script>
import Login from './Login.vue';

export default {
  components: { Login },
  data() {
    return {
    }
  },
  methods: {
    logout() {
      this.$emit('update:loginTo', false); // اطلاع‌رسانی به کامپوننت والد با تغییر وضعیت
      this.$router.push('/login');
    }
  }
}
</script>


<style scoped>
.logout {
  display: flex;
  align-items: center;
  margin: 20rem auto;
  color: aliceblue;
  background: #ddd;
  color: #000;
  border-radius: 5px;
  flex-direction: column;
  padding: 15px 0;
  width: 400px;
}

span {
  display: block;
}

.btn__logout {
  margin-top: 0.8rem;
  border: 0;
  background: red;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}
</style>