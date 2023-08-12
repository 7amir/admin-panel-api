<template>
  <div class="exit">
    <span>برای خروج از حساب کلیک کنید</span>
    <button>خروج</button>
  </div>
</template>

<script setup>

</script>

<style scoped>
.exit {
  display: flex;
  align-items: center;
  margin: 20rem 31rem;
  color: aliceblue;
  background: #ddd;
  color: #000;
  border-radius: 5px;
  flex-direction: column;
  padding: 11px 40px;
}

span {
  display: block;
}

button {
  margin-top: 0.8rem;
  border: 0;
  background: red;
  padding: 2px 8px;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
}
</style>