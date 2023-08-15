<script>
import { RouterView } from 'vue-router'
import AdminPanel from './components/panel/AdminPanel.vue';
import Admin from './components/panel/Admin.vue';
import Login from './views/forms/Login.vue';
import Logout from './views/forms/Logout.vue';

export default {
  components: { RouterView, AdminPanel, Admin, Login, Logout },
  data() {
    return {
      loginTo: false
    }
  },
  methods: {
    logoutHandler(logoutValue) {
      this.loginTo = logoutValue;
      if (!logoutValue) {
        this.$router.push('/login'); // انتقال به صفحه لاگین با استفاده از روتر Vue.js
      }
    }
  }
}
</script>

<template>
  <v-locale-provider rtl>
    <div class="admin-panels" v-if="loginTo">
      <AdminPanel />
      <RouterView loginTo.sync="loginTo" @update:loginTo="loginTo = $event"/>
      <Admin /> 
    </div>

    <div v-else>
      <Login loginTo.sync="loginTo" @update:loginTo="loginTo = $event" />
    </div>
  </v-locale-provider>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
  direction: rtl;
  background: #fbf7f3;
}

.admin-panels {
  display: flex;
  align-items: self-start;
}
</style>
