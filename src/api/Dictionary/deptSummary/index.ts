import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 字典维护--科室小结
 * @returns
 */

// 科室小结-查询
export const getPeDeptConclusion = (data) => {
  return request.post({ url: '/health-api/health/advice/getPeDeptConclusion', data })
}
// 疾病模版-体检疾病保存
export const savePeDisease = (data) => {
  return request.post({ url: '/health-api/health/disease/savePeDisease', data })
}
// 疾病模版-体检疾病删除
export const delPeDisease = (data) => {
  return request.post({ url: '/health-api/health/disease/delPeDisease', data })
}
// 获取科室列表
export const getDeptList = (data = 'application/x-www-form-urlencoded') => {
  return request.post({ url: '/health-api/health/doctor/getPeDeptList', data })
}
// 科室小结-保存
export const savePeDeptConclusion = (data) => {
  return request.post({
    url: '/health-api/health/advice/savePeDeptConclusion',
    data
  })
}
