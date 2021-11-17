import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/station',
    name: 'Station',
    component: () => import('@/views/Station.vue')
  },
  {
    path: '/route',
    name: 'Route',
    component: () => import('@/views/Route.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
