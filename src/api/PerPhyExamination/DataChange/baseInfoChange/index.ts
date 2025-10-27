import request from '@/config/axios'

/**
 *
 * @param data 人员项目编辑
 * @returns
 */

// 个人体检-获取登记信息供修改
export const getPePatInfo = (data) => {
  return request.post({ url: '/health-api/health/patInfo/getPePatInfo', data })
}
// 个人体检-修改登记信息
export const updatePePatIentInfo = (data) => {
  return request.post({ url: '/health-api/health/patInfo/updatePePatientInfo', data })
}
