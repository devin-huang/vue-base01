/**
 * Created By Devin on 2018/12/25
 */
import Cookies from 'js-cookie'
import * as types from '../mutation-type'

const app = {
  namespaced: true,
  state: {
    clientHeight: 0,
    tableHeight: 0,
    user: Cookies.get('po-admin-user-name') || null
  },
  mutations: {
    SET_CLIENT_HEIGHT: (state, height) => {
      // console.log(height, 'Client Height')
      state.clientHeight = height
    },
    SET_TABLE_HEIGHT: (state, height) => {
      // console.log(height, 'Table Height')
      state.tableHeight = height
    },
    SET_USER: (state, user) => {
      state.user = user
    }
  },
  actions: {
    setClientHeight ({ commit }, height) {
      commit('SET_CLIENT_HEIGHT', height)
    },
    setTableHeight ({ commit }, height) {
      commit('SET_TABLE_HEIGHT', height)
    },
    setUser ({ commit }, user) {
      Cookies.set('po-admin-user-name', user.name)
      commit('SET_USER', user)
    }
  }
}

export default app
