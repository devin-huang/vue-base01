/**
 * For table column element permission
 * Created By Devin on 2019/1/23
 */
import store from '@/store'

// 默认设置false为无权操作
async function permission (config) {
  let permission = store.state.Permission.permission
  let permissionObj = {
    error: null,
    data: permission
  }
  const {error, data} = permission.length > 0 ? permissionObj : {error: true}
  const permissionList = error ? [] : data
  return permissionList.some(item => item === config)
}

export default {
  install (Vue) {
    Vue.prototype.$permission = permission
  }
}
