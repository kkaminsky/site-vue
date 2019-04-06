<template>
<div>
  <parallax></parallax>
  <v-container grid-list-md>
      <h2 class="text-xs-center display-2 mb-2 afterTag">Title</h2>
      <v-flex class="text-xs-center headline">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </v-flex>
      <v-layout wrap>
        <v-flex
          v-for="item in items"
          :key="item.heading"
          xs12
          md4
        >
          <v-item>
            <v-card
              class="d-flex align-center"
              height="250"
            >
            <div
                  class="text-xs-center"
            >
            <img v-bind:src="item.url">
            <h4 class="font-weight-bold display-1">
            {{ item.header }} 
            </h4>
            <p class="text-center mt-2">
            {{ item.text }}
            </p>
            </div>
            </v-card>
          </v-item>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container>
      <h2 class="text-xs-center display-2 mb-2 afterTag">Остались вопросы?</h2>
      <v-flex class="text-xs-center headline">
            <p>Напишите нам, и мы ответим вам!</p>
      </v-flex>
    </v-container>

</div>
</template>

<script>
import Parallax from '../components/Parallax.vue'
export default {
    data(){
        return{
            items: [
                { header: 'contacts', url: require('@/assets/img/wifi.png') , text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum augue ut mauris facilisis, ut efficitur magna congue. Aenean facilisis tincidunt felis, quis facilisis ipsum pharetra vel. '},
                { header: 'history', url: require('@/assets/img/wifi.png'), text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum augue ut mauris facilisis, ut efficitur magna congue. Aenean facilisis tincidunt felis, quis facilisis ipsum pharetra vel. '},
                { header: 'settings', url: require('@/assets/img/wifi.png'), text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum augue ut mauris facilisis, ut efficitur magna congue. Aenean facilisis tincidunt felis, quis facilisis ipsum pharetra vel. '},
            ]
        }
    },
    name: "HomePage",
    components:{
        Parallax
    }
}
</script>

<style scoped>

</style>