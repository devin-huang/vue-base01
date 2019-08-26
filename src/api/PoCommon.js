/**
 * Created By devin on 2018/12/19
 */

import { get, post } from '../utils/https'

// USE OBJECT / SINGLE PARAMETER / NOT PARAMETER METHOD ( 使用对象/ 单一参数/ 无参数方式 )
/**
 * Find Device List
 */
export const findDeviceList = (args = {}) => {
  return post('/admin/po/common/findDeviceList', args)
}

/**
 * Find Admin User List
 */

export const findUserList = () => {
  return get('/admin/po/common/findUserList')
}

/**
 * Get Device Series List By Brand Id
 */
export const getDeviceSeriesListByBrandId = ({ brandId }) => {
  return get(
    `/admin/po/common/getDeviceSeriesListByBrandId?brandId=${brandId}`
  )
}

export const listPoMenu = () => {
  return get('/admin/po/common/listPoMenu')
}

export const listPoPermission = () => {
  return get('/admin/po/common/listPoPermission')
}
