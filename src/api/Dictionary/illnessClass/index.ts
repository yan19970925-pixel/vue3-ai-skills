import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 字典维护--疾病分类
 * @returns
 */

// 疾病分类-诊断列表查询
export const getPeDiagList = (data) => {
  return request.post({ url: '/health-api/health/disease/getPeDiagList', data })
}
// 疾病分类-诊断保存
export const savePeDiagnosis = (data) => {
  return request.post({ url: '/health-api/health/disease/savePeDiagnosis', data })
}
// 疾病分类-诊断删除
export const delPeDiagnosis = (data) => {
  return request.post({ url: '/health-api/health/disease/delPeDiagnosis', data })
}
// 疾病分类-诊断分组列表查询
export const getPeDiagGroupList = (data = 'application/x-www-form-urlencoded') => {
  return request.post({ url: '/health-api/health/disease/getPeDiagGroupList', data })
}
// 疾病分类-新增诊断查询疾病
export const getPeDiseaseByDiag = (data) => {
  return request.post({ url: '/health-api/health/disease/getPeDiseaseByDiag', data })
}
