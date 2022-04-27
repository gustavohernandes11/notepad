import VueRouter from 'vue-router'

import AdminView from '@/components/AdminView.vue'
import AuthView from '@/components/AuthView.vue'
import Content from '@/components/template/Content.vue'




const routes = [
    { path: '/', component: Content },
    { path: '/admin', component: AdminView },
    { path: '/login', component: AuthView },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})

export default router