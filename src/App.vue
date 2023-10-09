<script>
import { RouterView } from 'vue-router';
import AdminPanel from './components/panel/AdminPanel.vue';
import Login from './views/forms/Login.vue';
import Header from './components/panel/Header.vue';


export default {
  components: { RouterView, AdminPanel, Login, Header },
  data() {
    return {
      loginTo: false,
      value: true,
    }
  },
  methods: {
    /**
     * انتقال به صفحه لاگین با استفاده از روتر Vue.js
     * @param {*} logoutValue 
     */
    logoutHandler(logoutValue) {
      this.loginTo = logoutValue;
      if (!logoutValue) {
        this.$router.push('/login');
      }
    },
  }
}
</script>

<template>
  <v-locale-provider rtl>
    <div class="admin-panels" v-if="!loginTo">
        <AdminPanel  />
        <div class="content">
          <Header loginTo.sync="loginTo" @update:loginTo="loginTo = $event" />
          <RouterView />
        </div>
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
  flex-direction: row;
  width: 100%;
}

.sidebar-admin-panel {
  width: 256px !important;
}

.content {
  flex: 1; 
}
</style>
