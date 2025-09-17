import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 系统设置--检验组合项目对照
 * @returns
 */

// 检验报告对照-检验类项目查询
export const getPeAssemItemLab = (data) => {
  return request.post({ url: '/health-api/health/assemItem/getPeItemLab', data })
}
// 检验报告对照-检验类项目保存
export const savePeAssemItemLab = (data) => {
  return request.post({ url: '/health-api/health/assemItem/savePeItemLab', data })
}
