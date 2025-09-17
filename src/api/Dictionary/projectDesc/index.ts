import request from '@/config/axios'

/**
 *
 * @param data 系统设置--项目属性描述
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
// 体检项目详情查询
export const getPeItemDescList = (data) => {
  return request.post({ url: '/health-api/health/itemDict/getPeItemDescList', data })
}

// 项目属性-属性列表查询
export const getPeItemReportWriteList = (data) => {
  return request.post({ url: '/health-api/health/itemDict/getPeItemReportWriteList', data })
}

// 项目属性-属性保存
export const savePeItemDesc = (data) => {
  return request.post({ url: '/health-api/health/itemDict/savePeItemDesc', data })
}
