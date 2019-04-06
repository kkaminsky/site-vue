import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import './plugins/base'
import Axios from 'axios'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.prototype.$http = Axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
