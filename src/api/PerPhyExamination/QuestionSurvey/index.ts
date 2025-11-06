import request from '@/config/axios'

/**
 *
 * @param data 问卷保存
 * @returns
 */

// 问卷查询
export const getQuestionnaireList = (data) => {
  return request.post({ url: '/health-api/health/questionnaire/getQuestionnaireList', data })
}

// 问卷保存
export const updateQuestionnaire = (data) => {
  return request.post({ url: '/health-api/health/questionnaire/updateQuestionnaire', data })
}
// 统计报表-科室工作量统计
export const deptWorkLoadCount = (data) => {
  return request.post({ url: '/health-api/health/countReport/deptWorkLoadCount', data })
}
// 统计报表-心理问卷统计
export const getQuestionnairePercent = (data) => {
  return request.post({ url: '/health-api/health/countReport/getQuestionnairePercent', data })
}
// 统计报表-总项目数统计
export const getTimeItemCount = (data) => {
  return request.post({ url: '/health-api/health/countReport/getTimeItemCount', data })
}
// 统计报表-包含指定项目人员信息
export const getTimeItemPerson = (data) => {
  return request.post({ url: '/health-api/health/countReport/getTimeItemPerson', data })
}
