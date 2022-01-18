import { RouteRecordRaw, RouterView } from 'vue-router'
// createWebHashHistory  hash模式
const routes: RouteRecordRaw = {
  path: '/order',
  name: 'order',
  component: RouterView,
  children: [
    {
      path: 'list',
      name: 'order_list',
      component: () => import('@/views/order/list/index.vue')
    },
    {
      path: 'offline',
      name: 'order-offline',
      component: () => import('@/views/order/offline/index.vue')
    }
  ]
}

export default routes
