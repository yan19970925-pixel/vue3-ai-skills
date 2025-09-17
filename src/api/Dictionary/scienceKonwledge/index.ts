import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 字典维护--科普知识
 * @returns
 */

// 科普知识-查询
export const getPeKnowledge = (data) => {
  return request.post({ url: '/health-api/health/advice/getPeKnowledge', data })
}
// 科普知识-保存
export const savePeKnowledge = (data) => {
  return request.post({
    url: '/health-api/health/advice/savePeKnowledge',
    data
  })
}
// 科普知识-删除
export const delPeKnowledge = (data) => {
  return request.post({
    url: '/health-api/health/advice/delPeKnowledge',
    data
  })
}
