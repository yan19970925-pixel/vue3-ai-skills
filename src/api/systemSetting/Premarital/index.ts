import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 系统设置--体检套餐设置
 * @returns
 */
// 婚检-婚检列表
export const selectPremaritalList = (data) => {
  return request.post({ url: '/health-api/health/premarital/selectPremaritalList', data })
}
// 修改教师健康证年度
export const updatePatVisitYear = (data) => {
  return request.post({ url: '/health-api/health/premarital/updatePatVisitYear', data })
}
