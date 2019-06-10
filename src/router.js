import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router)

export const constantRouterMap = [
  { path: '*', component: () => import('./views/PageNotFound'), hidden: true }
]

export const asyncRouterMap = {
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // { path: "*", component: PageNotFound },  // 404
    {
      path: '/',
      // name: 'Home',
      component: Home,
      redirect: '/component'
      // meta: { title: 'home', icon: 'example' }
    },
    {
      path: '/component',
      name: 'Component',
      component: () => import('./views/componentModule')
    },
    {
      path: '/api',
      name: 'API',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/apiModule/index.vue')
    },
    {
      path: '/route',
      name: 'Route',
      component: () => import('./views/routeModule'),
      children: [
        {
          path: 'requiresAuth',
          name: 'RequiresAuth',
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/webpack',
      name: 'Webpack',
      component: () => import('./views/webpackModule')
    }
  ]
}

const router = new Router({
  routes: constantRouterMap
})

export default router
