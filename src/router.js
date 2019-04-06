import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Events from './views/Events.vue'




Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { requiresAuth: true, roles: ['user'] },
      component: Home
    },
    {
      path:'/events',
      name:'events',
      meta: { requiresAuth: true, roles: ['user'] },
      component: Events
    }
  ],
  mode:'history'
})




export default router