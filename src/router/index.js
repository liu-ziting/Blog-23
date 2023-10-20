import Vue from 'vue';
import VueRouter from 'vue-router';
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
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
        }
    ]
});
Vue.use(VueRouter);

export default router;
