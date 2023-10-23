import Vue from 'vue'
import App from './App.vue'
import router from './router/index';

import '../styles/main.css'
import '../styles/fonts.css'
import '../styles/hover.scss'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
