/**
 * Created By Devin on 2018/12/19
 */
import * as types from '../mutation-type'
import Address from '../actions/Address'

const address = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    deleteAddress: Address.deleteAddress
  }
}

export default address
