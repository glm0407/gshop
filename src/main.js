
import Vue from 'vue'
import App from './App'
import router from './router/index'
import Header from './components/Header/Header'
import store from './store/index'
import Start from './components/Start/Start'
/*注册全局组件*/
Vue.component('Header', Header)
Vue.component('Start', Start)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
