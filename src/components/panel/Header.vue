<script>
import Login from '../../views/forms/Login.vue';

export default {
  components: { Login },
  data() {
    return {
      loaded: false,
      loading: false,
      fav: true,
      menu: false,
      message: false,
      dialog: false,
      hints: true,
      darkMode: false,
      items: [
        { type: 'subheader', title: 'امروز' },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'برانچ این آخر هفته',
          subtitle: `<span class="text-primary">علی مرادی</span> &mdash; من این آخر هفته در محله شما خواهم بود و کارها را انجام می دهم. میخوای بگردی؟`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'باربیکیو تابستانی',
          subtitle: `<span class="text-primary">رضا ندایی</span> &mdash; کاش می توانستم بیایم، اما این آخر هفته خارج از شهر هستم`,
        },
        { type: 'divider', inset: true },
        {
          prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'سفر به پاریس',
          subtitle:
            '<span class="text-primary">پارمیدا حاتمی</span> &mdash; آیا توصیه های پاریس دارید؟ آیا تا به حال بوده اید؟',
        },
      ],
    }
  },
  methods: {
    onClick() {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },
    logout() {
      this.dialog = false
      this.$emit('update:loginTo', false); // اطلاع‌رسانی به کامپوننت والد با تغییر وضعیت
      this.$router.push('/login');
    },
    lightMode() {
      if (this.darkMode) {
        this.darkMode = false
        document.documentElement.style.setProperty('--body-bk', '#f9fafa');
        document.documentElement.style.setProperty('--white', '#fff');
        document.documentElement.style.setProperty('--icon-color', '#757269');
        document.documentElement.style.setProperty('--search-box', '#fff');
        document.documentElement.style.setProperty('--black', '#333');
        document.documentElement.style.setProperty('--form__user', '#fff');
        document.documentElement.style.setProperty('--white-e', '#eee');
      } else {
        this.darkMode = true
        document.documentElement.style.setProperty('--body-bk', '#262f3a');
        document.documentElement.style.setProperty('--white', '#262f3a');
        document.documentElement.style.setProperty('--icon-color', '#ddd');
        document.documentElement.style.setProperty('--search-box', '#39424c');
        document.documentElement.style.setProperty('--black', '#ddd');
        document.documentElement.style.setProperty('--form__user', '#313b49');
        document.documentElement.style.setProperty('--white-e', '#262f39');
        
      }
      console.log(this.darkMode);
    },
  },
}
</script>

<template>
  <div class="header">
    <v-container>
      <v-row class="align-center flex-row-reverse">
        <v-col cols="6" class="justify-end d-flex">

          <div class="menus d-flex">
  
            <!-- انتخاب تم سایت -->
            <v-icon @click="lightMode()" class="header-icon">mdi-theme-light-dark</v-icon>
            <!-- <v-menu transition="slide-x-transition"  @click="lightMode()">
              <template v-slot:activator="{ props }">
                <v-icon class="header-icon" v-bind="props" color="#757269">mdi-theme-light-dark</v-icon>
              </template>
    
              <v-list class="dropdown">
                <v-list-item>
                  <v-list-item-title class="dropdown-list">
                    <v-icon>mdi-white-balance-sunny</v-icon>
                    تم روشن
                  </v-list-item-title>
                </v-list-item>
  
                <v-list-item>
                  <v-list-item-title class="dropdown-list">
                    <v-icon>mdi-moon-waning-crescent</v-icon>
                    تم تاریک
                  </v-list-item-title>
                </v-list-item>
  
                <v-list-item>
                  <v-list-item-title class="dropdown-list">
                    <v-icon>mdi-weather-night</v-icon>
                    تم پیش فرض 
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu> -->

            <!-- خروج از حساب -->
            <v-dialog v-model="dialog" persistent width="400">
              <template v-slot:activator="{ props }">
                <v-icon color="#757269" v-bind="props" class="header-icon"> mdi-logout </v-icon>
              </template>
              <v-card>
                <v-card-title class="text-h6">
                  برای خروج از حساب مطمئن هستید؟
                </v-card-title>

                <v-card-actions>
                  <v-btn color="blue-darken-2" variant="text" @click="dialog = false">
                    انصراف
                  </v-btn>
                  <v-btn color="red-darken-3" variant="text"  @click="logout()">
                    خروج
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>  
  
            <v-menu transition="slide-x-transition">
              <template v-slot:activator="{ props }">
                <v-badge :content="3" color="red-darken-1" dot>
                  <v-icon class="header-icon" v-bind="props" color="#757269">mdi-bell-outline</v-icon>
                </v-badge>
              </template>
    
              <v-card card class="mx-auto" max-width="350">
                <v-toolbar color="cyan-lighten-1">
                  <v-btn variant="text" icon="mdi-menu"></v-btn>
  
                  <v-toolbar-title>صندوق ورودی</v-toolbar-title>
  
                  <v-spacer></v-spacer>
  
                  <v-btn variant="text" icon="mdi-magnify"></v-btn>
                </v-toolbar>
  
                <v-list :items="items" item-props lines="three">
                  <template v-slot:subtitle="{ subtitle }">
                    <div v-html="subtitle"></div>
                  </template>
                </v-list>
              </v-card>
            </v-menu>

            <!-- <v-divider vertical></v-divider> -->
            <v-btn>اطلاعات بیشتر
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            
            <!-- آواتار ادمین -->
            <v-menu v-model="menu" :close-on-content-click="false" location="end">
              <template v-slot:activator="{ props }">
                <div class="user-account" v-bind="props">
                  <v-avatar image="../../../public/img/me.jpg" size="36"></v-avatar>
               </div>
              </template>
  
              <v-card min-width="300">
                <v-list>
                  <v-list-item
                    prepend-avatar="../../../public/img/me.jpg"
                    title="امیر"
                    subtitle="Front-end"
                  >
                    <template v-slot:append>
                      <v-btn
                        variant="text"
                        :class="fav ? 'text-red' : ''"
                        icon="mdi-heart"
                        @click="fav = !fav"
                      ></v-btn>
                    </template>
                  </v-list-item>
                </v-list>
  
                <v-divider></v-divider>
  
                <v-list>
                  <v-list-item>
                    <v-switch
                      v-model="message"
                      color="purple"
                      label="پیام‌ها را فعال کنید"
                      hide-details
                    ></v-switch>
                  </v-list-item>
  
                  <v-list-item>
                    <v-switch
                      v-model="hints"
                      color="purple"
                      label="نکات را فعال کنید"
                      hide-details
                    ></v-switch>
                  </v-list-item>
                </v-list>
  
                <v-card-actions>
                  <v-spacer></v-spacer>
  
                  <v-btn variant="text" @click="menu = false"> انصراف </v-btn>
                  <v-btn color="primary" variant="text" @click="menu = false">
                    ذخیره
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </div>
        </v-col>
        
        <!-- فرم جستجو -->
        <v-col cols="6" class="justify-start d-flex align-center search-box">
          ‍ <v-card width="300">
            <v-text-field 
              :loading="loading"
              density="compact"
              variant="solo"
              label="جستجو یا تایپ (Ctrl + G)"
              append-inner-icon="mdi-magnify"
              single-line
              hide-details
              @click:append-inner="onClick">
            </v-text-field>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<style scoped>
.text-h6 {
  font-family: Vazir-re !important;
  text-align: center;
}

.header {
  background: var(--white);
  box-shadow: 0px 1px 2px rgba(25, 39, 52, .05), 0px 0px 4px rgba(25, 39, 52, .1);
  display: flex;
  /* box-shadow: 0px 1px 2px rgb(255 255 255 / 5%), 0px 0px 4px rgb(255 255 255 / 20%); */
}

.user-account {
  display: flex;
  cursor: pointer;
  align-items: center;
}

.user-account-name {
  margin: auto .8rem;
}

.user-account-info {
  padding-right: 1rem;
}

.user-account-info span {
  font-size: 11px;
  color: #757269;
}

a {
  color: #fff;
}

.header-icon {
  margin-left: .4rem;
  padding: 20px;
  border-radius: 50%;
  position: relative;
  color: var(--icon-color) !important;
}

.header-icon:hover {
  background: #eeeeee;
}

.dropdown {
  margin: 4px 0;
}

.dropdown-list {
  font-size: .9rem;
  min-height: 0;
  cursor: pointer;
}
</style>