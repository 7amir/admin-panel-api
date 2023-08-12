<script>
import { RouterView } from 'vue-router'
import AdminPanel from './components/admin-panel/AdminPanel.vue';
import Admin from './components/admin-info/Admin.vue';
import Login from './views/login-form/Login.vue';

export default {
  components: { RouterView, AdminPanel, Admin, Login },
  data() {
    return {
      loginTo: false
    }
  },
}
</script>

<template>
  <div>
    <div class="admin-panels" v-if="loginTo">
      <AdminPanel />
      <RouterView />
      <Admin />
    </div>

    <div v-else>
      <Login :loginTo.sync="loginTo" @update:loginTo="loginTo = $event" />
    </div>
  </div>
</template>

<style>
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
