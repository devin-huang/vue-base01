/**
 * 1.权限控制常用两种方式（1.前端Router得meta配置 2.通过后端配置分别返回角色菜单API/操作API；addRouters更新菜单）
 * 2.本实现基于方法2，返回得菜单API与项目router相比较，能匹配得则有权限访问（操作API在src/permission.js设置）
 **/
// admin role
// 目前显示 [Home, API, Component, Route, RequiresAuth, Webpack, Table]
export const listPoMenu = () => {
  return {
    code: '200',
    message: 'Successful operation',
    data: {
      user: {
        id: null,
        loginName: 'admin',
        name: 'admin'
      },
      menuList: [
        {
          id: 6001,
          parentId: 6552,
          name: 'Home',
          sort: 20,
          href: null,
          target: null,
          icon: null,
          childrenList: []
        },
        {
          id: 6003,
          parentId: 6552,
          name: 'Component',
          sort: 60,
          href: '/component',
          target: null,
          icon: null,
          childrenList: []
        },
        {
          id: 6002,
          parentId: 6552,
          name: 'API',
          sort: 90,
          href: '/api',
          target: null,
          icon: null,
          childrenList: []
        },
        {
          id: 6004,
          parentId: 6552,
          name: 'Route',
          sort: 120,
          href: '/route',
          target: null,
          icon: null,
          childrenList: [
            {
              id: 6101,
              parentId: 6004,
              name: 'RequiresAuth',
              sort: 20,
              href: null,
              target: null,
              icon: null,
              childrenList: []
            }
          ]
        },
        {
          id: 6005,
          parentId: 6552,
          name: 'Webpack',
          sort: 130,
          href: '/webpack',
          target: null,
          icon: null
        }
      ]
    }
  }
}
