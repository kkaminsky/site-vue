<template>
  <v-app>
      <app-header></app-header>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

import AppHeader from './components/AppHeader'
export default {
  components:{
    AppHeader
  }
}
</script>


<style lang="scss">
  @import "./styles/mixins.scss";

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
  }
</style>
