import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

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
router.beforeEach((to, from, next) => {
    //每次切换页面时，调用进度条
    NProgress.start()
    // 这个一定要加，没有next()页面不会跳转的。这部分还不清楚的去翻一下官网就明白了
    next()
})
router.afterEach(() => {
    // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()
})
Vue.use(VueRouter)

export default router
