<script>
import axios from 'axios';
import { token } from '../../components/store';
import JalaliMoment from 'jalali-moment';
import { VDataTable } from 'vuetify/labs/VDataTable'

export default {
  name: 'posts',
  components: { VDataTable },
  data() {
    return {
      userData: '',
      categories: [],
      snackbar: false,
      text: ``,
      selected: [],
      dialogDelete: false,
      headers: [
        { title: 'نام دسته', align: 'start', sortable: false, key: 'name' },
        { title: 'نامک', align: 'center', key: 'slug' },
        { title: 'توضیح', align: 'center', key: 'description' },
        { title: 'دسته', align: 'center', key: 'category' },
        { title: 'تاریخ', align: 'center', key: 'date' },
        { title: 'عملیات', align: 'center', key: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
    }
  },
  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  mounted() {
    this.getApi()
  },
  methods: {
    getApi() {
      axios.get('http://localhost/wordpress/wp-json/wp/v2/posts', {
        headers: {
          'Authorization': `Bearer ${token()}`,
        }
      }).then((result) => {
        this.userData = result.data;

        // اضافه کردن دیتا به this.desserts
        this.desserts = this.userData.map(user => {
          return {
            name: user.title.rendered,
            slug: user.slug,
            category: user.number ? user.role : "-",
            description: this.removeHtmlTags(user.content.rendered),
            date: this.convertToJalali(user.date),
            id: user.id,
          };
        });
      }).catch(error => console.log(error))
    },

    /**
     * حذف ست با کلیک
     * @param {number} id - آیدی پست
     */
    postsDelete(id) {
      axios.delete(`http://localhost/wordpress/wp-json/wp/v2/posts/${id}?force=true&reassign=1`, {
        headers: {
          'Authorization': `Bearer ${token()}`,
        }
      }).then((response) => {
        this.userData = this.userData.filter(user => user.id !== id);
        this.getApi()
      }).catch(error => console.log(error));
    },
    /**
     * حذف چندین پست 
     */
    deleteSelectedPosts() {
      if (this.selected.length === 0) {
        this.snackbar = true
        this.text = `پستی را برای حذف انتخاب نکردید`
      }
      this.selected.forEach(id => {
        this.postsDelete(id) 
        this.snackbar = true;
        this.text = `پست با شناسه ${id} حذف شد`;
      });
    },
    getCategoryName(categoryId) {
      console.log(this.categories.parent);
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : '-';
    },


    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)

      const userId = this.userData[this.editedIndex].id;
      this.$router.push({ name: 'update-post', params: { id: userId } });
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
      const userId = this.userData[this.editedIndex].id;
      const deletedUserName = this.desserts[this.editedIndex].name

      this.closeDelete()

      axios.delete(`http://localhost/wordpress/wp-json/wp/v2/posts/${userId}?force=true&reassign=1`, {
        headers: {
          'Authorization': `Bearer ${token()}`,
        }
      }).then((response) => {
        console.log(response);
        this.userData = this.userData.filter(user => user.id !== userId);
        this.snackbar = true;
        this.text = `نوشته با عنوان ${deletedUserName} با موفقیت حذف شد`
        this.getApi()
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
    
    /**
     * حذف تگ‌های <p> و </p> از محتوا
     * @param {*} html 
     */
    removeHtmlTags(html) {
      return html.replace(/<\/?p[^>]*>/g, "");
    },
  },
  computed: {
    /**
     * تبدیل تاریخ Gregorian به تاریخ شمسی
     * @param {string} gregorianDate - تاریخ Gregorian
     * @returns {string} - تاریخ شمسی
     */
    convertToJalali() {
      return function (gregorianDate) {
        const jalaliDate = JalaliMoment(gregorianDate, 'YYYY-MM-DD').format('jYYYY/jMM/jDD');
        return jalaliDate;
      };
    },
  },
}
</script>

<template>
  <v-container>
    <div class="header-information">
      <v-row class="align-center">
        <v-col cols="6">
          <h1 class="subject">لیست پست‌ها</h1>
          <div class="router-address">
            <RouterLink to="/" class="link-to-list">خانه</RouterLink>
            <v-icon>mdi-menu-left</v-icon>
            پست‌ها
            <v-icon>mdi-menu-left</v-icon>
            لیست پست‌ها
          </div>
        </v-col>
        <v-col cols="6" class="d-flex flex-row-reverse btn-list">
          <RouterLink :to="{ name: 'posts-add' }" class="router-link">
            <v-btn class="btn__custom-add-list">
              <v-icon>mdi-plus</v-icon>
              افزودن پست
            </v-btn>
          </RouterLink>

          <v-btn @click="deleteSelectedPosts()" class="ml-3 btn__custom-delete">
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
      :pageText="`{0} از ${userData.length}`"
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