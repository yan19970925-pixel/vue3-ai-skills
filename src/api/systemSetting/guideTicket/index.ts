import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 系统设置--指引单
 * @returns
 */

// 指引单查询
export const getPeChartDictList = (data) => {
  return request.post({ url: '/health-api/health/dict/getPeChartDictList', data })
}

// 保存指引单
export const savePeChartDict = (data) => {
  return request.post({ url: '/health-api/health/dict/savePeChartDict', data })
}

// 删除指引单
export const delPeChartDict = (data) => {
  return request.post({ url: '/health-api/health/dict/delPeChartDict', data })
}
