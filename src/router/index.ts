import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import productRoutes from './modules/product'
import mediaRoutes from './modules/media'
import orderRoutes from './modules/order'
import permissionRoutes from './modules/permission'
import AppLayout from '@/layout/AppLayout.vue'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { store } from '@/store'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayout,
    meta: { title: '首页', requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home/indexHome.vue'),
        meta: { title: '首页' }
      },
      productRoutes,
      mediaRoutes,
      orderRoutes,
      permissionRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/indexLogin.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes // 路由规则
})

router.beforeEach((to, from) => {
  nprogress.start()
  if (to.meta.requiresAuth && !store.state.user) {
    return {
      path: '/login',
      // 保存我们所在的位置，以便返回
      query: { redirect: to.fullPath }
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})

export default router
