import Vue from "vue";
import Vuex from "vuex";
import getters from "@/store/module/getters";
import App from "@/store/module/app";
import Common from "@/store/module/common";
import Address from "@/store/module/address";
import Permission from "@/store/module/permission";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    App,
    Common,
    Address,
    Permission
  },
  getters
})
