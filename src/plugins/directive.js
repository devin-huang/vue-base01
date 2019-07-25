import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: `${process.env.BASE_URL}/img/lazy.png`,
  loading: `${process.env.BASE_URL}/img/lazy.png`,
  attempt: 1
})
