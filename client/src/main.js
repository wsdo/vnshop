// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/css/app'
import VueLazyLoad from 'vue-lazyload'

import apiConfig from '../config/api.config'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)

Vue.use(VueAxios, Axios);
Axios.defaults.baseURL = apiConfig.baseUrl;


Vue.use(VueLazyLoad, {
    loading: '/static/img/ok-2.png'
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})