// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/reset.css'
import Api from './api/axiosProperties.js'
import CONST from './assets/style/const'

Vue.config.productionTip = false
// 引入axios的封装库
Vue.prototype.$api = Api
// 引入字符串常量库
Vue.prototype.$CONST = CONST

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
