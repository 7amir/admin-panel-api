<script>
import axios from 'axios';
import { token } from '../../components/store';
import { VDataTable } from 'vuetify/labs/VDataTable'

export default {
  name: 'categories',
  components: { VDataTable },
  data() {
    return {
      userDataList: '',
      selected: [],
      snackbar: false,
      text: ``,
      dialogDelete: false,
      headers: [
        { title: 'نام', align: 'start', sortable: false, key: 'name' },
        { title: 'نامک', align: 'center', key: 'slug' },
        { title: 'توضیح', align: 'center', key: 'description' },
        { title: 'تعداد', align: 'center', key: 'number' },
        { title: 'عملیات', align: 'center', key: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
    }
  },
  mounted() {
    this.getCategories() 
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  methods: {
    getCategories() {
      axios.get('http://localhost/wordpress/wp-json/wp/v2/categories', {
        headers: {
          'Authorization': `Bearer ${token()}`,
        }
      }).then((response) => {
        this.userDataList = response.data;

        // اضافه کردن دیتا به this.desserts
        this.desserts = this.userDataList.map(user => {
          return {
            name: user.name,
            slug: user.slug,
            number: user.number ? user.role : "-",
            description: user.description,
            id: user.id,
          };
        });
      }).catch(error => console.log(error));
    },
    /**
     * حذف کاربر 
     * @param {number} id - ایدی کاربر
     */
    userDelete(id) {
      axios.delete(`http://localhost/wordpress/wp-json/wp/v2/categories/${id}?force=true&reassign=1`, {
        headers: {
          'Authorization': `Bearer ${token()}`,
        }
      }).then((response) => {
        this.desserts = this.desserts.filter(user => user.id !== id);
      }).catch(error => console.log(error));
    },
    /**
     * انتخاب چند کاربر و حذف آنها
     */
    deleteSelectedUsers() {
      if (this.selected.length === 0) {
        this.snackbar = true
        this.text = `دسته‌ای را برای حذف انتخاب نکردید`
      }
      this.selected.forEach(userId => {
        this.userDelete(userId) 
        this.snackbar = true;
        this.text = `دسته با شناسه ${userId} حذف شد`;
      });
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const userId = this.userDataList[this.editedIndex].id;
      this.$router.push({ name: 'update-categories', params: { id: userId } });
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    /**
     * api wordpress حذف کاربر از 
     */
    deleteItemConfirm() {
      const userId = this.userDataList[this.editedIndex].id;
      const deletedUserName = this.desserts[this.editedIndex].name

      this.closeDelete()
      axios.delete(`http://localhost/wordpress/wp-json/wp/v2/categories/${userId}?force=true&reassign=1`, {
        headers: {
          'Authorization': `Bearer ${token()}`,
        }
      }).then((response) => {
        this.userDataList = this.userDataList.filter(user => user.id !== userId);
        this.snackbar = true;
        this.text = `دسته با عنوان ${deletedUserName} با موفقیت حذف شد`
        this.getCategories()
      }).catch(error => console.log(error));
    },

    close() {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<template> 
  <v-container>
    <div class="header-information">
      <v-row class="align-center">
        <v-col cols="6">
          <h1 class="subject">لیست دسته‌ها</h1>
          <div class="router-address">
            <RouterLink to="/" class="link-to-list">خانه</RouterLink>
            <v-icon>mdi-menu-left</v-icon>
            دسته‌ها
            <v-icon>mdi-menu-left</v-icon>
            لیست دسته‌ها
          </div>
        </v-col>
        <v-col cols="6" class="d-flex flex-row-reverse btn-list">
          <RouterLink :to="{ name: 'categories-add' }" class="router-link">
            <v-btn class="btn__custom-add-list">
              <v-icon>mdi-plus</v-icon>
              افزودن دسته
            </v-btn>
          </RouterLink>

          <v-btn @click="deleteSelectedUsers()" class="ml-3 btn__custom-delete ml-3">
            حذف همگانی
          </v-btn>
        </v-col>
      </v-row>
    </div> 

    <v-data-table
      :headers="headers" 
      :items="desserts" 
      :sort-by="[{ key: 'calories', order: 'asc' }]" 
      v-model="selected"
      show-select 
      itemsPerPageText=" تعداد موارد در هر صفحه"
      :items-per-page="5"
      :pageText="`{0} از ${userDataList.length}`"
      items-per-page-all
      >
      <template v-slot:top>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h6">
                آیا مطمئن هستید که میخواهید این مورد را حذف کنید؟
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">
                  لغو
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">
                  ذخیره
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="action-dropdown" v-bind="props"> 
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="deleteItem(item.raw)">
              <v-list-item-title class="action-dropdown-title">
                <v-icon class="ml-1">
                  mdi-trash-can-outline 
                </v-icon>
                حذف
              </v-list-item-title>
            </v-list-item>
            
            <v-list-item @click="editItem(item.raw)">
              <v-list-item-title class="action-dropdown-title">
                <v-icon class="ml-1">
                  mdi-square-edit-outline
                </v-icon>
                ویرایش
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <v-snackbar v-model="snackbar" multi-line>
      {{ text }}

      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="snackbar = false">
          بستن
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<style scoped>
.v-card-title {
  text-align: center;
}

.text-h6 {
  font-family: Vazir-re !important;
}
</style>