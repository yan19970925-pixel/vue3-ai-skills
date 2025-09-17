import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import remainingRouter from './modules/remaining'
import homeRouter from '@/router/modules/home'

const routerList = [...remainingRouter, ...homeRouter]
// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(), // createWebHashHistory URL带#，createWebHistory URL不带#
  strict: true,
  routes: routerList as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const resetRouter = (): void => {
  const resetWhiteNameList = ['Redirect', 'Login', 'NoFind', 'Root']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router
