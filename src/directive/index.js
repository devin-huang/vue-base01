/**
 * Created By shli on 2019/01/14
 */
import clickOutSide from './click-out-side'
import lazyRender from './lazy-render'

export default {
  install (Vue, options) {
    Vue.directive('click-out-side', clickOutSide)
    Vue.directive('lazy-render', lazyRender)
  }
}
