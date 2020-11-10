import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueLazyload from 'vue-lazyload'
import router from './router'
import getApi from './api/index'
import './plugins/element.js'
import './assets/globe.css'
import './assets/font/iconfont.css'
import './method/Index'

Vue.use(VueLazyload, {
    error: require('./assets/img/error.jpg'),
    loading: require('./assets/img/loading.gif'),
    attempt: 1
})

Vue.prototype.$api = getApi

Vue.prototype.$store = store

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
