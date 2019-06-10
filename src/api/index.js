import * as common from './PoCommon'
import * as address from './PoAddress'

const api = {
  common,
  address
}

Object.defineProperty(api, 'install', {
  writable: false,
  enumerable: false,
  configurable: false,
  value: (Vue, Option) => {
    Vue.$api = api
    Vue.prototype.$api = api
  }
})

export default api
