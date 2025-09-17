import request from '@/config/axios'

/**
 *
 * @param data 个人体检-打印条形码
 * @returns
 */

// 个人体检-条码-查询
export const selectBarCode = (data) => {
  return request.post({ url: '/health-api/health/personChart/selectBarCode', data })
}
// 个人体检-检验申请单条码-打印
export const printLabSheet = (data) => {
  return request.post({ url: '/health-api/health/personChart/printLabSheet', data })
}
// 个人体检-检验申请单条码-打印
export const printBarCode = (data) => {
  return request.post({ url: '/health-api/health/personChart/printBarCode', data })
}
