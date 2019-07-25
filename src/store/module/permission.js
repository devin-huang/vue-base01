/**
 * Created By Devin on 2019/02/01
 */

import * as types from '../mutation-type'
import { constantRouterMap, asyncRouterMap } from '@/router' // '@/router'指配置得路由
import { toTree } from '@/utils/menuTree'
// import {listPoPermission} from '@/api/PoCommon' // 请求当前角色有权限操作/编辑/删除
import { listPoPermission } from '@/api/operationList' // 模拟后端返回当前角色权限

export default {
  namespaced: true,
  state: {
    routers: constantRouterMap,
    addRouters: [],
    permission: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    [types.GER_PERMISSION_LIST](state, permission) {
      state.permission = permission
    }
  },
  actions: {
    GenerateRouters({ commit, dispatch }, routers) {
      dispatch('App/setUser', routers.user, { root: true }) // App是指store.js的App模块
      const _routers = toTree(routers.menuList, asyncRouterMap.routes) // routers代表后端权限菜单，asyncRouterMap代表前端全菜单
      commit('SET_ROUTERS', _routers)
      return _routers
    },
    async listPoPermission({ commit }) {
      const { code, message, data } = await listPoPermission()
      if (code == 200) {
        commit(types.GER_PERMISSION_LIST, data)
        return Promise.resolve({ error: null, message, code })
      } else {
        commit(types.GER_PERMISSION_LIST, [])
        return Promise.resolve({ error: true, message, code })
      }
    }
  }
}
