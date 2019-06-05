/**
 * Created By Devin on 2018/12/19
 */
import * as types from '../mutation-type';
import * as PoAddress from '../../api/PoAddress';

export default {
  async deleteAddress({ commit, dispatch }, params) {
    const { code, error, data, message } = await PoAddress.deleteAddress({
      addrId: params
    })
    console.log('deleteAddress', message)

    if (!error && code == 200) {
      return Promise.resolve({ error: null, message, data })
    } else {
      return Promise.resolve({ error: true, message })
    }
  }
}
