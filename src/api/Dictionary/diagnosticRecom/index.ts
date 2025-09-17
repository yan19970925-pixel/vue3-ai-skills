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
//科室建议-查询
export const getPeDeptSuggestList = (data) => {
  return request.post({ url: '/health-api/health/advice/getPeDeptSuggestList', data })
}
//科室建议-保存
export const savePeDeptSuggest = (data) => {
  return request.post({ url: '/health-api/health/advice/savePeDeptSuggest', data })
}
