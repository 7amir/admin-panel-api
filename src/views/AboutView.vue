<template>
  <div class="search">
    <!-- <form action="/">
      <input type="text" placeholder="جستوجو...">
      <svg class="fa fa-close">
      </svg>
    </form> -->

    <h2 v-for="data in apiName" :key="data">
      {{ data.name }}
    </h2>
  </div>
</template>

<style scoped>

.search {
  color: #ddd;
}
.search form {
  position: absolute;
  right: 6.7%;
}

.search form input {
  width: 300px;
  padding: 0.8rem;

}

svg {
  position: relative;
  left: 8%;
  color: #7e7e7e;
}
</style>


<script>
import axios from 'axios';
  export default {
    data() {
      return {
        age: 21,
        apiName: '',
      }
    },
    created() {
      axios 
      .get('http://localhost/test-wordpress/wordpress/wp-json/wp/v2/users')
      .then((result )=> {
        this.apiName = result.data
      })
    }
  }
</script>