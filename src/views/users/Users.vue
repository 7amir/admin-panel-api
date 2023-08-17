<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';
import { token } from '../../components/store';

export default {
  components: { RouterLink, token },
  data() {
    return {
      userDataList: '',
      showUserList: false,
      selectedUsers: []
    }
  },
  mounted() {
    /**
     * api wordpress گرفتن لیست کاربر از 
     */
    axios.get('http://localhost/wordpress/wp-json/wp/v2/users', {
      headers: {
        'Authorization': `Bearer ${token()}`,
      }
    })
      .then((response) => {
        this.userDataList = response.data;
        this.showUserList = true;
      })
      .catch(error => console.log(error));
  },

  methods: {
    /**
     * حذف کاربر 
     * @param {user id} id - ایدی کاربر
     */
    userDelete(id) {
      axios.delete(`http://localhost/wordpress/wp-json/wp/v2/users/${id}?force=true&reassign=1`, {
        headers: {
          'Authorization': `Bearer ${token()}`,
        }
      }).then((response) => {
        this.userDataList = this.userDataList.filter(user => user.id !== id);
      }).catch(error => console.log(error));
    },

    /**
     * انتخاب چمد کاربر و حذف آنها
     */
    deleteSelectedUsers() {
      this.selectedUsers.forEach(userId => {
        this.userDelete(userId);
      });
    },
  }
}
</script>


<template>
  <div class="users">
    <h2>کاربران</h2>
    <router-link to="/user-add" class="btn-add">
      افزودن
    </router-link>

    <table>
      <thead>
        <tr>
          <th></th>
          <th>شناسه</th>
          <th>نام کاربری</th>
          <th>حذف</th>
        </tr>
      </thead>
      <tbody v-if="showUserList">
        <tr v-for="data in userDataList" :key="data.id">
          <td>
            <input type="checkbox" v-model="selectedUsers" :value="data.id">
          </td>
          <td>{{ data.id }}</td>
          <td>{{ data.name }}</td>
          <td>
            <div @click="userDelete(data.id)">
              <span class="fa fa-close">x</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="btn-show">
      <v-btn class="btn-show-users" @click="deleteSelectedUsers()">حذف کاربران</v-btn>
    </div>
  </div>
</template>

<style scoped>
.users {
  margin: 2rem 1rem;
}

h2 {
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 23px;
  font-family: 'Vazir-bold';
}

.btn-add,
.btn-show-users {
  margin: 0rem 2rem;
  border: 1px solid #cd6133;
  padding: 6px 30px;
  border-radius: 5px;
  font-size: 13px;
  color: #cd6133;
  background: none;
  cursor: pointer;
  transition: all .2s ease-in-out;
  text-decoration: none;
  float: left;
}

.btn-add {
  color: #fff;
  background: #cd6133;
}

.btn-add:hover {
  color: #cd6133;
  background: #fff;
}

.btn-show-users:hover {
  background: #cd6133;
  color: #fff;
}

table {
  margin: 2rem 5rem;
  width: 1150px;
}

th {
  background: #ccc1be;
  padding: 5px;
}

td {
  display: table-cell;
  width: 230px;
  text-align: center;
  padding: 10px;
}

td svg {
  padding: 2px;
  font-size: 17px;
  cursor: pointer;
}

.btn-show-users {
  float: none;
}

input[type=checkbox] {
  width: 15px;
  height: 15px;
  accent-color: #a98b8b;
}
</style>