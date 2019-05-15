
import Vue from 'vue'
import App from './App'
import router from './router/index'
import Header from './components/Header/Header'
import store from './store/index'
import Start from './components/Start/Start'
import Split from './components/Split/Split'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { Button } from 'mint-ui'
import './validate'
import './mock/mockSever'
import CartControl from './components/CartControl/CartControl'
Vue.use(MintUI)
/*注册全局组件*/
Vue.component('Header', Header)
Vue.component('Start', Start)
Vue.component('Split', Split)

Vue.component(Button.name,Button)
Vue.component('CartControl',CartControl)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
