/*
 *  * Create By:Devin on  Wednesday December 19th 2018
 */

import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'

Vue.component(Message)
Vue.prototype.$message = Message

let http = axios.create({
  // baseURL: process.env.API_ROOT,
  baseURL: 'http://localhost:4009/',
  headers: {
    app_token: localStorage.getItem('app_token')
      ? localStorage.getItem('app_token')
      : getCookie('sst-vue-po-sessionId'),
    timezone: new Date().getTimezoneOffset()
  }
})

// SET TOKEN
function getCookie (cname) {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1)
    if (c.indexOf(name) != -1) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

// SET AXIOS METHODS
function _h (method) {
  return (
    resPath,
    params,
    loading = false,
    headers = { 'Content-Type': 'application/json;charset=UTF-8' }
  ) => {
    let result = {
      code: 0,
      message: '',
      data: {},
      error: null,
      exception: null
    }
    let loadingInstance = loading
      ? Vue.prototype.$loading({
        lock: true,
        text: 'loading ...',
        target: '.app-main',
        fullscreen: true
      })
      : null

    return http[method](resPath, params, headers)
      .then(response => {
        result.code = response.data.code
        result.data = response.data.data
        result.message = response.data.message
        loadingInstance && loadingInstance.close()
        if (response.data.code === '200') {
          return Promise.resolve(result)
        } else if (response.data.code === '507') {
          Vue.prototype.$message &&
            Vue.prototype.$message.error(result.message)
          top.location.href = process.env.LOGIN_URL
        } else {
          loadingInstance && loadingInstance.close()
          Vue.prototype.$message &&
            Vue.prototype.$message.error(result.message)
          result.error = true
          return Promise.resolve(result)
        }
      })
      .catch(error => {
        console.log('request error:', error)
        result.error = error || new Error('request error')
        result.exception = error.exception || null
        result.message = error.message || 'request error'
        result.code = error.status

        Vue.prototype.$message && Vue.prototype.$message.error(result.message)
        return Promise.resolve(result)
      })
  }
}

export default {
  get: _h('get'),
  post: _h('post'),
  delete: _h('delete')
}
