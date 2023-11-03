import Vue from 'vue'
import VueRouter from 'vue-router'
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('@/pages/HomeBlog.vue')
        },
        {
            path: '/Home',
            component: () => import('@/pages/HomeBlog.vue')
        },
        {
            path: '/Article',
            component: () => import('@/pages/MainList.vue')
        },
        {
            path: '/About',
            component: () => import('@/pages/AboutMine.vue')
        },
        {
            path: '/Project',
            component: () => import('@/pages/ProjectList.vue')
        },
        {
            path: '/PicCat',
            component: () => import('@/pages/PicCat.vue')
        },
        {
            path: '/ToolList',
            component: () => import('@/pages/ToolList.vue')
        },
        {
            path: '/Design',
            component: () => import('@/pages/EchartDesign.vue')
        },
        {
            path: '/Movie',
            component: () => import('@/pages/MovieList.vue')
        },
        {
            path: '/Test',
            component: () => import('@/pages/TestMain.vue')
        }
    ]
})
Vue.use(VueRouter)

export default router
