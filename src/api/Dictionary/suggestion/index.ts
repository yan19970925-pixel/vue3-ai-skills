import request from '@/config/axios'

/**
 *
 * @param data 字典维护--常用建议
 * @returns
 */

// 总检常用建议-分类查询
export const getPeChiefGuideClass = (data) => {
  return request.post({ url: '/health-api/health/advice/getPeChiefGuideClass', data })
}
// 总检常用建议-查询
export const getPeChiefGuideList = (data) => {
  return request.post({ url: '/health-api/health/advice/getPeChiefGuideList', data })
}
// 总检常用建议-保存
export const savePeChiefGuide = (data) => {
  return request.post({ url: '/health-api/health/advice/savePeChiefGuide', data })
}
