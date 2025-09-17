import request from '@/config/axios'

/**
 *
 * @param data 系统设置--科室疾病分组
 * @returns
 */

// 体检科室查询
export const getPeDeptList = (data) => {
  return request.post({ url: '/health-api/health/doctor/getPeDeptList', data })
}
//科室疾病分组-科室对应疾病分组查询
export const getPeDeptVSDiagGroupList = (data) => {
  return request.post({ url: '/health-api/health/disease/getPeDeptVSDiagGroupList', data })
}
// /疾病分类-诊断分组列表查询
export const getPeDiagGroupList = (data) => {
  return request.post({ url: '/health-api/health/disease/getPeDiagGroupList', data })
}
//科室疾病分组-科室对应疾病分组保存
export const savePeDeptVSDiagGroup = (data) => {
  return request.post({ url: '/health-api/health/disease/savePeDeptVSDiagGroup', data })
}
//常见疾病-科室常见疾病查询
export const getPeDeptNormalDiagList = (data) => {
  return request.post({ url: '/health-api/health/disease/getPeDeptNormalDiagList', data })
}
//常见疾病-查询分组对应的疾病
export const getPeDiagList = (data) => {
  return request.post({ url: '/health-api/health/disease/getPeDiagList', data })
}
//常见疾病-科室常见疾病移入
export const addPeDeptNormalDiag = (data) => {
  return request.post({ url: '/health-api/health/disease/addPeDeptNormalDiag', data })
}
// /常见疾病-科室常见疾病移出
export const delPeDeptNormalDiag = (data) => {
  return request.post({ url: '/health-api/health/disease/delPeDeptNormalDiag', data })
}
