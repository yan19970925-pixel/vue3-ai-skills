import request from '@/config/axios'

/**
 *
 * @param data 系统设置--项目属性
 * @returns
 */

// 体检科室查询
export const getPeDeptList = (data = 'application/x-www-form-urlencoded') => {
  return request.post({ url: '/health-api/health/doctor/getPeDeptList', data })
}

// 体检项目查询
export const getPeItemList = (data) => {
  return request.post({ url: '/health-api/health/item/getPeItemList', data })
}

// 项目属性-属性查询
export const getPeItemReportWriteList = (data) => {
  return request.post({ url: '/health-api/health/itemDict/getPeItemReportWriteList', data })
}

// 项目属性-属性保存
export const savePeItemReportWrite = (data) => {
  return request.post({ url: '/health-api/health/itemDict/savePeItemReportWrite', data })
}
