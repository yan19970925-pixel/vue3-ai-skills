import request from '@/config/axios'

/**
 *
 * @param data 体检类型字典
 * @returns
 */

// 体检类型字典查询
export const getPeCommDictList = (data) => {
  return request.post({ url: '/health-api/health/peCommDict/getPeCommDictList', data })
}
// 体检类型字典保存
export const savePeCommDict = (data) => {
  return request.post({ url: '/health-api/health/peCommDict/savePeCommDict', data })
}
// 体检类型字典删除
export const delPeCommDict = (data) => {
  return request.post({ url: '/health-api/health/peCommDict/delPeCommDict', data })
}
