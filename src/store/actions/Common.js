/**
 * Created By Devin on 2018/12/19
 */
import * as types from '../mutation-type';
import * as PoCommon from '../../api/PoCommon';

export default {
  async findUserList({ commit, dispatch }, params) {
    const { code, error, data, message } = await PoCommon.findUserList(params)
    console.log('findUserList', message, data)

    if (!error && code == 200) {
      // dispatch('findDeviceList') // -- CALL CURRENT MODULE API METHOD (调用当前模块的API方法) --
      // dispatch('Common/findDeviceList', null, {root: true}) // -- CALL NOT CURRENT MODULE API METHOD (调用非当前模块的API方法) --
      commit(types.SET_USER_LIST, data) // -- commit: PUT API DATA  TO SET_USER_LIST ( commit:意思把API获取data赋给commit ) --
      return Promise.resolve({ error: null, message, data }) // -- Async RETURN API DATA AND FRONT-END USE {error,message,data} GET  ( 异步返回数据,前端使用{error,message,data}获取 ) --
    } else {
      commit(types.SET_USER_LIST, {})
      return Promise.resolve({ error: true, message })
    }
  },
  async findDeviceList({ commit }, params) {
    const { code, error, data, message } = await PoCommon.findDeviceList(
      params
    )
    console.log('findDeviceList', message, data)
    if (!error && code == 200) {
      commit(types.SET_DEVICE_LIST, data)
      return Promise.resolve({ error: null, message, data })
    } else {
      commit(types.SET_DEVICE_LIST, {})
      return Promise.resolve({ error: true, message })
    }
  },
  async getDeviceSeriesListByBrandId({ commit }, params) {
    const {
      code,
      error,
      data,
      message
    } = await PoCommon.getDeviceSeriesListByBrandId({ brandId: params })
    console.log('getDeviceSeriesListByBrandId', message, data)
    if (!error && code == 200) {
      commit(types.SET_DEVICE_SERIES_LIST, data)
      return Promise.resolve({ error: null, message, data })
    } else {
      commit(types.SET_DEVICE_SERIES_LIST, {})
      return Promise.resolve({ error: true, message })
    }
  }
}
