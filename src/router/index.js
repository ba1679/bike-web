import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

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
  },
  {
    path: '/bulletin',
    name: 'Bulletin',
    component: () => import('@/views/Bulletin.vue')
  },
  {
    path: '/activities',
    name: 'Activities',
    component: () => import('@/views/Activities.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})
router.beforeEach((to, from, next) => {
  store.commit('CLOSE_NAV_BAR')
  next()
})

export default router
