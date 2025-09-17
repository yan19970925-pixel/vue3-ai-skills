import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 系统设置--检验试管设置
 * @returns
 */

// 检验子项目查询
export const getPeItemLab = (data) => {
  return request.post({ url: '/health-api/health/itemRelate/getPeItemLab', data })
}
// LIS项目查询
export const getPeLisItem = (data) => {
  return request.post({ url: '/health-api/health/itemRelate/getPeLisItem', data })
}

// 检验项目自动对照
export const peItemListRelateAuto = (data) => {
  return request.post({ url: '/health-api/health/itemRelate/peItemListRelateAuto', data })
}

// 检验项目对照和取消对照
export const peItemListRelate = (data) => {
  return request.post({ url: '/health-api/health/itemRelate/peItemListRelate', data })
}
