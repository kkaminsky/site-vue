<template>
<v-app>
    
    <!-- color="blue darken-3" dark -->
    <v-toolbar
      class="nav-main"
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title class="nav-toolbar flex-align-center">
         <img :src="require(`@/assets/articles/Logo`.concat('.png'))" class="logo-img">
         <img>
        <!-- <span class="hidden-sm-and-down">EventsMakers</span> -->
      </v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down" >
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          
          <v-list-tile :key="item.text" :to="item.route" > 
            <v-icon class="mx-2">{{ item.icon }}</v-icon>
            <span> {{ item.text }} </span>
          </v-list-tile>
      </template>
    </v-toolbar>
    
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Create contact
        </v-card-title>
       
        <v-card-actions>
          <v-btn flat color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dialog = false">Отмена</v-btn>
          <v-btn flat @click="dialog = false">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import '../assets/styles/main.css';
export default {
  data() {
    return {
      dialog: false,
      drawer: false, 
      items: [
        { icon: 'home', text: 'События', route: '/events' },
        { icon: 'arrow_forward', text: 'Войти', route: '/login' },
        { icon: 'group_add', text: 'Регистрация', route: '/register' }
      ]
    }
  },
   methods: {
    changeRoute(routeName, selectedIndex) {
      const vm = this;

      vm.selectedIndex = selectedIndex;

      return vm.$router.push({ name: routeName });
    },
  },
  props: {
      source: String
  }
}
</script>