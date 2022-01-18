import { RouteRecordRaw } from 'vue-router'
// createWebHashHistory  hash模式
const routes: RouteRecordRaw = {
  path: '/media',
  name: 'media',
  component: () => import('@/views/media/index.vue')
}

export default routes
