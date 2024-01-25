import type { RouteRecordRaw } from 'vue-router'

import MainLayout from '@/layouts/Index.vue'

export const constRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Layout',
    component: MainLayout,
    redirect: { name: 'IPv6' },
    meta: { title: '首页', isNavMenu: false /* , permissions: ['admin'] */ },
    children: [
      {
        path: '/ipv6',
        name: 'IPv6',
        component: () =>
          import(/* webpackChunkName: "search" */ '@/pages/IPv6.vue'),
        meta: {
          title: 'IPv6 Scan',
          isNavMenu: false /* , permissions: ['admin'] */,
        },
      },
    ],
  },
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'Layout',
    component: MainLayout,
    redirect: { name: 'IPv6' },
    meta: { title: '首页', isNavMenu: false /* , permissions: ['admin'] */ },
    children: [
      {
        path: '/ipv6',
        name: 'IPv6',
        component: () =>
          import(/* webpackChunkName: "search" */ '@/pages/IPv6.vue'),
        meta: {
          title: 'IPv6 Scan',
          isNavMenu: false /* , permissions: ['admin'] */,
        },
      },
    ],
  },
]
