/**
 * Created By Devin on 2018/12/19
 */
import * as types from '../mutation-type'
import Common from '../actions/Common'

const common = {
  namespaced: true,
  state: {
    userList: [],
    deviceList: {},
    deviceSeriesList: []
  },
  mutations: {
    [types.SET_USER_LIST] (state, userList) {
      state.userList = userList
    },
    [types.SET_DEVICE_LIST] (state, deviceList) {
      state.deviceList = deviceList
    },
    [types.SET_DEVICE_SERIES_LIST] (state, deviceSeriesList) {
      state.deviceSeriesList = deviceSeriesList
    }
  },
  actions: {
    findUserList: Common.findUserList,
    findDeviceList: Common.findDeviceList,
    getDeviceSeriesListByBrandId: Common.getDeviceSeriesListByBrandId
  }
}

export default common
