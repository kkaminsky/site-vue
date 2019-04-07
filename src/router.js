import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Events from './views/Events.vue'
import Cabinet from './views/Cabinet.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import Event from './views/Event.vue'




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
    {
      path:'/login',
      name:'login',
      meta: { requiresAuth: true, roles: ['user'] },
      component: Login
    },
    {
      path:'/register',
      name:'register',
      meta: { requiresAuth: true, roles: ['user'] },
      component: Register
    },

    {
      path:'/events/:id',
      name:'event',
      meta: { requiresAuth: true, roles: ['user'] },
      component: Event
    },
    {
      path:'/event',
      name:'event',
      meta: { requiresAuth: true, roles: ['user'] },
      component: Event
    }
  ],
  mode:'history'
})




export default router