import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Events from './views/Events.vue'
import Cabinet from './views/Cabinet.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'




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
  ],
  mode:'history'
})




export default router