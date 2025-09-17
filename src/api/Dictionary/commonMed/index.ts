import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 字典维护--常见病史
 * @returns
 */

// 常见病史-查询
export const getPeDeptConclusion = (data) => {
  return request.post({ url: '/health-api/health/deptDisease/getPeDeptDiseaseList', data })
}
// 获取科室列表
export const getDeptList = (data = 'application/x-www-form-urlencoded') => {
  return request.post({ url: '/health-api/health/doctor/getPeDeptList', data })
}
// 常见病史-保存
export const savePeDeptConclusion = (data) => {
  return request.post({
    url: '/health-api/health/deptDisease/savePeDeptDisease',
    data
  })
}
