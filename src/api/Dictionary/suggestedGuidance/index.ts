import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 字典维护--总检建议和生活指导
 * @returns
 */

// 总检建议和生活指导-查询
export const getPeSuggestItem = (data) => {
  return request.post({ url: '/health-api/health/advice/getPeSuggestItem', data })
}
// 总检建议和生活指导-保存
export const savePeSuggestItem = (data) => {
  return request.post({ url: '/health-api/health/advice/savePeSuggestItem', data })
}
// 总检建议和生活指导-删除
export const delPeSuggestItem = (data) => {
  return request.post({ url: '/health-api/health/advice/delPeSuggestItem', data })
}
