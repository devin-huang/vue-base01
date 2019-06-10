/**
 * Created By Devin on 2019/02/01
 */
import router from './router';
// import {listPoMenu} from '@/api/PoCommon' // 请求当前角色可访问菜单列表
import { listPoMenu } from '@/api/testMenuData'; // 模拟后端listPoMenu API,只需切换成真是后端API即可实现，不用改代码
import store from './store';
import Cookies from 'js-cookie';

router.beforeEach(async (to, from, next) => {
  // 第一步判断是否已存在token，有则代表已登录
  if (to.query.po_session_key) {
    localStorage.setItem('app_token', to.query.po_session_key)
    Cookies.set('app_token', to.query.po_session_key)
  } else {
    if (
      +store.getters.addRouters !== 0 &&
      +store.state.Permission.permission !== 0
    ) {
      return next()
    } else {
      const { error, data } = await listPoMenu()
      if (error) return next(false)
      // 渲染菜单
      const addRouters = await store.dispatch(
        'Permission/GenerateRouters',
        data,
        { root: true }
      ) // Permission是指store.js的Permission模块
      router.addRoutes(addRouters) // 路由已添加不会更新视图，使用vuex对addRoutes后把新增路由保存store进行渲染及更新
      // 渲染权限操作（btn / 可视区域）
      await store.dispatch('Permission/listPoPermission', { root: true })
      if (to.path === '/') {
        // 自动跳转到当前权限第一个路由
        return next({ path: addRouters[0].path, replace: true })
      }
      return next({ ...to, replace: true })
    }
  }
})
