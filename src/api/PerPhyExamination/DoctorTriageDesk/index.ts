import request from '@/config/axios'

/**
 *
 * @param data 个人体检-医生分诊台
 * @returns
 */

// 体检医生已选科室
export const getSelectedDept = (data) => {
  return request.post({ url: '/health-api/health/doctor/getSelectedDept', data })
}
// 个人体检-分科医生检查-检查科室
export const getPePersonalDept = (data) => {
  return request.post({ url: '/health-api/health/peDoctorCheck/getPePersonalDept', data })
}
// 个人体检-分科医生检查-选择人员
export const getPePersonalList = (data) => {
  return request.post({ url: '/health-api/health/peDoctorCheck/getPePersonalList', data })
}
// 个人体检-分科医生检查-体检医生
export const getPeDoctorByPeDeptCode = (data) => {
  return request.post({ url: '/health-api/health/doctor/getPeDoctorByPeDeptCode', data })
}
//个人体检-分科医生检查-查询项目和分科结果
export const getPePersonalItem = (data) => {
  return request.post({ url: '/health-api/health/peDoctorCheck/getPePersonalItem', data })
}
//个人体检-分科医生检查-根据体检号查询人员信息
export const getPePersonalInfo = (data) => {
  return request.post({ url: '/health-api/health/peDoctorCheck/getPePersonalInfo', data })
}
//个人体检-分科医生检查-报到的体检人员
export const toDayCheckIn = (data) => {
  return request.post({ url: '/health-api/health/peDoctorCheck/toDayCheckIn', data })
}
//个人体检-分科医生检查-保存
export const savePatientExam = (data) => {
  return request.post({ url: '/health-api/health/peDoctorCheck/savePatientExam', data })
}
//个人体检-分科医生检查-拒检
export const refusePatientExam = (data) => {
  return request.post({ url: '/health-api/health/peDoctorCheck/refusePatientExam', data })
}
//根据科室查询常见病史
export const getPeDeptDiseaseList = (data) => {
  return request.post({ url: '/health-api/health/deptDisease/getPeDeptDiseaseList', data })
}
//根据科室查询分组
export const getPeDeptVSDiagGroupList = (data) => {
  return request.post({ url: '/health-api/health/disease/getPeDeptVSDiagGroupList', data })
}
//根据科室查询常见疾病
export const getPeDeptNormalDiagList = (data) => {
  return request.post({ url: '/health-api/health/disease/getPeDeptNormalDiagList', data })
}
//根据分组查询对应疾病
export const getPeDiagList = (data) => {
  return request.post({ url: '/health-api/health/disease/getPeDiagList', data })
}
//根据科室查询建议列表
export const getPeDeptSuggestList = (data) => {
  return request.post({ url: '/health-api/health/advice/getPeDeptSuggestList', data })
}
//根据科室查询小结列表
export const getPeDeptConclusion = (data) => {
  return request.post({ url: '/health-api/health/advice/getPeDeptConclusion', data })
}
