import Vue from 'vue'
import Router from 'vue-router'
import Layout from './components/Layout'

Vue.use(Router)

export const constantRouterMap = [
  { path: '*', component: () => import('./views/PageNotFound'), hidden: true }
]

export const asyncRouterMap = {
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/component'
    },
    {
      path: '/component',
      name: 'Component',
      component: Layout,
      children: [
        {
          path: '',
          name: 'componentModule',
          meta: { requiresAuth: true },
          component: () => import('@/views/componentModule/')
          // meta: { title: 'home', icon: 'example' }
        }
      ]
    },
    {
      path: '/api',
      name: 'API',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Layout,
      children: [
        {
          path: '',
          name: 'index',
          meta: { requiresAuth: true },
          component: () => import('./views/apiModule/index.vue')
        }
      ]
    },
    {
      path: '/route',
      name: 'Route',
      component: Layout,
      children: [
        {
          path: 'requiresAuth',
          name: 'RequiresAuth',
          component: () => import('./views/routeModule'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/webpack',
      name: 'Webpack',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Layout,
      children: [
        {
          path: '',
          name: 'index',
          meta: { requiresAuth: true },
          component: () => import('./views/webpackModule/index.vue')
        }
      ]
    }
  ]
}

const router = new Router({
  routes: asyncRouterMap.routes
})

export default router
