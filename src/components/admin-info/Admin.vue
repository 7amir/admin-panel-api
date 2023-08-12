<template>
  <div class="admin">
    <div class="logo-user">
      <img src="../../assets/img/me.jpg" alt="">
    </div>
    <div class="user-info">
      <span>امیر رجب زاده</span>
      <span class="job">front-end</span>
    </div>
  </div>
</template>

<style>
  .admin {
    width: 150px;
    position: fixed;
    left: 0;
    text-align: center;
    height: 100vh;
    border-right: 1px solid #e6e2de;
  }

  .logo-user img{
    width: 30%;
    border-radius: 50%;
    margin: 2rem 0 1rem;
  }
  span {
    display: block;
  }

  .job {
    color: #c5c5c5;
  }
</style>

<script setup>

</script>