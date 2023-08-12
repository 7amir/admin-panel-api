<template>
  <div class="admin-panel">
    <div class="admin-panel-logo">
      <img src="../../assets/img/rj.png" alt="">
    </div>
    <div class="list-admin-panels">
      <ul class="list__admin-panel">
        <li>
          <RouterLink to="/" class="link__admin">
            <i class="fa fa-home"></i>
            خانه
          </RouterLink>
        </li>
        <li>
          <RouterLink to="add" class="link__admin">
            <i class="fas fa-user-alt"></i>
            افزودن کاربر
          </RouterLink>
        </li>
        <li>
          <RouterLink to="users" class="link__admin">
            <i class="fas fa-user-friends"></i>
            لیست کاربرها
          </RouterLink>
        </li>   
        <!-- <li>
          <RouterLink to="/about" class="link__admin">
            <i class="fas fa-file"></i>
            افزودن مطالب
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/setting" class="link__admin">
            <i class="fas fa-file-archive"></i>
            لیست مطالب
          </RouterLink>
        </li> -->
      </ul>

      <ul>
        <li>
          <RouterLink to="exit" class="link__admin exit">
            <i class="fa fa-external-link"></i>
            خروج
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.admin-panel {
  text-align: center;
  background: #ccc1be;
}

.admin-panel-logo img {
  width: 26%;
  margin: 2rem 0;
  border-radius: 50%;
  border: 1px solid;
}

.list-admin-panels {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 84vh;
}

ul {
  padding: 0 1.3rem;
}

li {
  list-style: none;
}

ul li .link__admin {
  color: #757269;
  text-decoration: none;
  display: block;
  font-size: 15px;
  padding: 1rem 1rem 1rem 4rem;
  text-align: right;
  border-radius: 13px;
  transition: all 0.3s ease-in-out;
}

ul li .link__admin svg {
  font-size: 14px;
  padding-left: 8px;
}

ul li .link__admin:hover {
  color:#333;
  background: #eee6e1;
}

ul li .exit:hover {
  background: transparent;
  color: red;
}
</style>


<script setup>
import { RouterLink } from 'vue-router'
</script>

