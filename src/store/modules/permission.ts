import { defineStore } from 'pinia'
import { store } from '../index'
import router from '@/router'
import { cloneDeep } from 'lodash-es'
import remainingRouter from '@/router/modules/remaining'
import { generateRoute, flatMultiLevelRoutes } from '@/utils/routerHelper'
import { getAsyncRoutesApi } from '@/api/login'
import { CACHE_KEY, useCache } from '@/hooks/web/useCache'

const { wsCache } = useCache()

export interface PermissionState {
  routers: AppRouteRecordRaw[]
  tabRouters: AppRouteRecordRaw[]
  addRouters: AppRouteRecordRaw[]
  addTabRouters: AppRouteRecordRaw[]
  menuTabRouters: AppRouteRecordRaw[]
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    routers: [],
    tabRouters: [],
    addRouters: [],
    addTabRouters: [],
    menuTabRouters: []
  }),
  getters: {
    getRouters(): AppRouteRecordRaw[] {
      return this.routers
    },
    getAddRouters(): AppRouteRecordRaw[] {
      return flatMultiLevelRoutes(cloneDeep(this.addRouters))
    },
    getTabRouters(): AppRouteRecordRaw[] {
      return this.addTabRouters
    },
    getAddTabRouters(): AppRouteRecordRaw[] {
      return flatMultiLevelRoutes(cloneDeep(this.addTabRouters))
    },
    getMenuTabRouters(): AppRouteRecordRaw[] {
      return this.menuTabRouters
    }
  },
  actions: {
    async generateRoutes(): Promise<unknown> {
      return new Promise<void>(async (resolve) => {
        let res: AppCustomRouteRecordRaw[]
        if (wsCache.get(CACHE_KEY.ROLE_ROUTERS)) {
          res = wsCache.get(CACHE_KEY.ROLE_ROUTERS) as AppCustomRouteRecordRaw[]
        } else {
          res = await getAsyncRoutesApi()
          wsCache.set(CACHE_KEY.ROLE_ROUTERS, res)
        }
        const routerMap: AppRouteRecordRaw[] = generateRoute(res as AppCustomRouteRecordRaw[])
        // 新生成的路由被添加到 Vue Router 实例中
        routerMap.forEach((route: any) => {
          router.addRoute(route)
        })
        // 动态路由，404一定要放到最后面
        this.addRouters = routerMap.concat([
          {
            path: '/:path(.*)*',
            redirect: '/404',
            name: '404Page',
            meta: {
              hidden: true,
              breadcrumb: false
            }
          }
        ])
        // 渲染菜单的所有路由 todo
        this.routers = cloneDeep(remainingRouter).concat(routerMap)
        resolve()
      })
    },
    async generateTabRoutes(): Promise<unknown> {
      return new Promise<void>(async (resolve) => {
        let res: AppCustomRouteRecordRaw[]
        if (wsCache.get(CACHE_KEY.TAB_ROUTERS)) {
          res = wsCache.get(CACHE_KEY.TAB_ROUTERS) as AppCustomRouteRecordRaw[]
        } else {
          res = await getAsyncRoutesApi()
          wsCache.set(CACHE_KEY.TAB_ROUTERS, res)
        }
        const routerMap: AppRouteRecordRaw[] = generateRoute(
          res as AppCustomRouteRecordRaw[],
          'isTab'
        )
        // 动态路由，404一定要放到最后面
        this.addTabRouters = routerMap.concat([
          {
            path: '/:path(.*)*',
            redirect: '/404',
            name: '404Page',
            meta: {
              hidden: true,
              breadcrumb: false
            }
          }
        ])
        // 渲染菜单的所有路由 todo
        // this.tabRouters = cloneDeep(remainingRouter).concat(routerMap)
        resolve()
      })
    },
    setMenuTabRouters(routers: AppRouteRecordRaw[]): void {
      this.menuTabRouters = routers
    }
  }
})

export const usePermissionStoreWithOut = () => {
  return usePermissionStore(store)
}
