import request from '@/config/axios'

/**
 *
 * @param data 字典维护--项目对应疾病诊断
 * @returns
 */

// 体检科室查询
export const getPeDeptList = (data) => {
  return request.post({ url: '/health-api/health/doctor/getPeDeptList', data })
}
//查询科室的所有项目
export const getPeDeptItemList = (data) => {
  return request.post({ url: '/health-api/health/peItemDiag/getPeDeptItemList', data })
}
//查询自动诊断
export const getPeAutoDiagnoseList = (data) => {
  return request.post({ url: '/health-api/health/peItemDiag/getPeAutoDiagnoseList', data })
}
//疾病模版-体检疾病查询
export const getPeDisease = (data) => {
  return request.post({ url: '/health-api/health/disease/getPeDisease', data })
}
//项目属性-属性查询
export const getPeItemReportWriteList = (data) => {
  return request.post({ url: '/health-api/health/itemDict/getPeItemReportWriteList', data })
}
//保存自动诊断
export const savePeAutoDiagnose = (data) => {
  return request.post({ url: '/health-api/health/peItemDiag/savePeAutoDiagnose', data })
}
//删除自动诊断
export const delPeAutoDiagnose = (data) => {
  return request.post({ url: '/health-api/health/peItemDiag/delPeAutoDiagnose', data })
}
