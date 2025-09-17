import request from '@/config/axios'

/**
 *
 * @param data 个人体检--体检人员报到
 * @returns
 */

// 获取体检主记录列表
export const selectPeVisitList = (data) => {
  return request.post({ url: '/health-api/health/peVisit/selectPeVisitList', data })
}

// 个人体检-签到-获取体检详细列表
export const selectPeVisitDetailList = (data) => {
  return request.post({ url: '/health-api/health/peVisit/selectPeVisitDetailList', data })
}

// 体检签到
export const peCheckIn = (data) => {
  return request.post({ url: '/health-api/health/peVisit/peCheckIn', data })
}

// 体检取消签到
export const canclePeCheckIn = (data) => {
  return request.post({ url: '/health-api/health/peVisit/canclePeCheckIn', data })
}

// 删除预约
export const deleteAppoint = (data) => {
  return request.post({ url: '/health-api/health/peVisit/deleteAppoint', data })
}
