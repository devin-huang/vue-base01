/**
 * Created By devin on 2018/12/19
 */

import { get, post, Delete } from '../utils/https'

/**
 * Get Device Series List By Brand Id
 */
export const getAddress = () => {
  return get(`http://localhost:4009/**`)
}

export const postAddress = () => {
  return post(`http://localhost:4009/**`)
}

export const deleteAddress = ({ addrId }) => {
  return Delete(`http://localhost:4009/admin/po/deleteAddress/${addrId}`)
}
