import { createRouter, createWebHistory } from 'vue-router'
import ContentView from '../views/ContentView.vue'
import AuthView from '../views/AuthView.vue'
import AdminView from '../views/AdminView.vue'
import { userKey } from '@/global'


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
    component: AdminView,
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const json = localStorage.getItem(userKey)

  if (to.matched.some(record => record.meta.requiresAdmin)) {
      const user = JSON.parse(json)
      user && user.admin ? next() : next({ path: '/' })
  } else {
      next()
  }
})

export default router
