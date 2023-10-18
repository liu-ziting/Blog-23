import Vue from 'vue';
import VueRouter from 'vue-router';
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import('@/pages/MainList.vue')
        },
        {
            path: '/about',
            component: () => import('@/pages/AboutMine.vue')
        }
    ]
});
Vue.use(VueRouter);

export default router;
