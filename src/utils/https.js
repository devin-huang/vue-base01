/*
 *  * Create By:Devin on  Wednesday December 19th 2018
 */

import axios from 'axios';
import QS from 'qs';
import { Message } from 'element-ui';
import router from '@/router';
import store from '@/store';

// 请求超时时间
axios.defaults.timeout = 10000

// API 根路径
axios.defaults.baseURL = process.env.ROOT_API

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// Token配置
axios.defaults.headers['Authorization'] = 'token'
// axios.defaults.headers = {
//   'app_token': localStorage.getItem('app_token') ? localStorage.getItem('app_token') : 'getCookie',
//   'timezone': new Date().getTimezoneOffset()
// }

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      // response 具体返回HTTP状态码请查看后端
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码非200的情况
  error => {
    if (error.response.status) {
      // error 具体返回HTTP状态码请查看后端
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message.error('登录过期，请重新登录');
          // 清除token
          localStorage.removeItem('token');
          store.commit('loginSuccess', null)
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
          break;
        // 404请求不存在
        case 404:
          Message.error('网络请求不存在');
          break
        // 其他错误，直接抛出错误提示
        default:
          Message.error(error.response.data.message)
      }
      return Promise.reject(error.response)
    } else {
      Message.error('Network error');
    }
  }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        // console.log(err.response.data) // 每个API返回错误信息
        reject(err.data)
      });
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    // axios.post(url, QS.stringify(params))
    axios
      .post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      });
  })
}
/**
 * delete，delete
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function Delete (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      });
  })
}
