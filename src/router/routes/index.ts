import type { RouteRecordRaw } from 'vue-router'

export const constRoutes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: { name: 'dashboard' },
    meta: { title: '首页', isNavMenu: false /* , permissions: ['admin'] */ },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () =>
          import(/* webpackChunkName: "search" */ '@/pages/dashboard.vue'),
        meta: {
          title: 'Global IPv6 Network Asset Distribution Dashboard',
          isNavMenu: false /* , permissions: ['admin'] */,
        },
      },
    ],
  },
  // {
  //   path: '/ipv6dashboard',
  //   name: 'dashboard',
  //   component: () =>
  //     import(/* webpackChunkName: "search" */ '@/pages/dashboard.vue'),
  //   meta: {
  //     title: 'Global IPv6 Network Asset Distribution Dashboard',
  //     isNavMenu: false /* , permissions: ['admin'] */,
  //   },
  // },
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '',
    redirect: { name: 'dashboard' },
    meta: { title: '首页', isNavMenu: false /* , permissions: ['admin'] */ },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () =>
          import(/* webpackChunkName: "search" */ '@/pages/dashboard.vue'),
        meta: {
          title: 'Global IPv6 Network Asset Distribution Dashboard',
          isNavMenu: false /* , permissions: ['admin'] */,
        },
      },
    ],
  },
]
