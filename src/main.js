import Vue from "vue";
import App from "./App.vue";
import Layout from "./components/Layout";
import router from "./router";
import store from "./store";
import api from "@/api";
import filters from "./utils/filters";
import directive from "./directive";
import ElementUI from "element-ui";
import "./styles.scss";
import "@/style/index.scss"; // global css
import Page from "@/components/Page";
import "./permission";
import permission from "@/utils/permission";
import Mixins from "@/utils/mixins";

// fontawesome START
import fontawesome from "@fortawesome/fontawesome";
import solid from "@fortawesome/fontawesome-free-solid";
import regular from "@fortawesome/fontawesome-free-regular";
import brands from "@fortawesome/fontawesome-free-brands";

console.log(process.env.NODE_ENV, "环境");
console.log(process.env.BASE_URL, "路径");
console.error('Error111111111111111111')

fontawesome.library.add(solid)
fontawesome.library.add(regular)
fontawesome.library.add(brands)

// fontawesome END

Vue.use(ElementUI, {
  size: 'mini'
})
Vue.config.productionTip = false

Vue.use(api)
Vue.use(filters)
Vue.use(directive)
Vue.use(permission)

Vue.mixin(Mixins)

Vue.component('page', Page)

new Vue({
  router,
  store,
  render: h => h(Layout)
}).$mount('#app')
