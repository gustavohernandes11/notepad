import { createRouter, createWebHistory } from 'vue-router'
import ContentView from '../views/ContentView.vue'
import AuthView from '../views/AuthView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ContentView
  },
  {
    path: '/login',
    name: 'login',
    component: AuthView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
