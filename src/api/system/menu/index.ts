import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL

export interface MenuVO {
  id: number
  name: string
  permission: string
  type: number
  sort: number
  parentId: number
  path: string
  icon: string
  component: string
  componentName?: string
  status: number
  visible: boolean
  keepAlive: boolean
  alwaysShow?: boolean
  createTime: Date
}

// 查询菜单（精简）列表
export const getSimpleMenusList = () => {
  return request.get({ url: ADMIN_API_URL + '/system/menu/list-all-simple' })
}

// 查询菜单列表
export const getMenuList = (params) => {
  return request.get({ url: ADMIN_API_URL + '/system/menu/list', params })
}

// 获取菜单详情
export const getMenuApi = (id: number) => {
  return request.get({ url: ADMIN_API_URL + '/system/menu/get?id=' + id })
}

// 新增菜单
export const createMenu = (data: MenuVO) => {
  return request.post({ url: ADMIN_API_URL + '/system/menu/create', data })
}

// 修改菜单
export const updateMenu = (data: MenuVO) => {
  return request.put({ url: ADMIN_API_URL + '/system/menu/update', data })
}

// 删除菜单
export const deleteMenu = (id: number) => {
  return request.delete({ url: ADMIN_API_URL + '/system/menu/delete?id=' + id })
}
