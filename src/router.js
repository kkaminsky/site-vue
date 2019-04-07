import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Events from './views/Events.vue'
import Cabinet from './views/Cabinet.vue'




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
    },
    {
      path:'/cabinet',
      name:'cabinet',
      meta: { requiresAuth: true, roles: ['user'] },
      component: Cabinet
    },
  ],
  mode:'history'
})




export default router