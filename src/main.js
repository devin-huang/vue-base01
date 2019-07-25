import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import directive from './directive'
import Mixins from '@/utils/mixins'
import './plugins'
// import './registerServiceWorker'
import './permission'
import permission from '@/utils/permission'

Vue.config.productionTip = false
Vue.use(api)
Vue.use(directive)
Vue.use(permission)
Vue.mixin(Mixins)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
