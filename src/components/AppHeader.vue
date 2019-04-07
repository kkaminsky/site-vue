<template>
<v-app>
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
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
          <!-- LIST-GROUP -->
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i" :to="child.route"
            >
            <!--  @click="" -->
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content >
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <!-- END LIST-GROUP -->
          <v-list-tile v-else :key="item.text" :to="item.route" > 
            <v-list-tile-action >
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <!-- color="blue darken-3" dark -->
    <v-toolbar
      class="nav-main"
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer" style="color: #fff"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">EventsMakers</span>
      </v-toolbar-title>


      <v-text-field v-if="this.$route.name == 'events'"
        flat
        solo-inverted
        prepend-icon="search"
        label="Найти мероприятие"
        class="hidden-sm-and-down"
        backgroundColor="#fafafa"
      ></v-text-field>
      <v-toolbar-items class="hidden-sm-and-down" v-else>
        <!-- <v-btn flat to="#test">Link One</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn> -->
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn icon style="color: #fff">
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon style="color: #fff">
        <v-icon>notifications</v-icon>
      </v-btn>
      <!-- <v-btn icon large style="color: #fff">
        <v-avatar size="32px" tile>
          <img
            
          >
        </v-avatar>
      </v-btn> -->
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
          <v-btn flat color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import '../assets/styles/header.css';
export default {
  data() {
    return {
      dialog: false,
      drawer: false, 
      items: [
        { icon: 'home', text: 'Главная', route: '/' },
        { icon: 'history', text: 'Новости',  route: '/events' },
        { icon: 'arrow_forward', text: 'Авторизация', route: '/login' },
        { icon: 'group_add', text: 'Регистрация', route: '/register' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'События',
          model: false,  
          children: [
            { icon: 'event_available', text: 'Добавить событие', route: '/events' },
            { icon: 'event_note', text: 'Управление событиями', route: '/' }
          ]
        },
        
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