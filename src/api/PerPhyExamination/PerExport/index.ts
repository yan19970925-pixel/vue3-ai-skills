import request from '@/config/axios'

/**
 *
 * @param data 个人体检报告
 * @returns
 */

// 个人体检报告-体检报告打印
export const peReportPrint = (data) => {
  return request.post({ url: '/health-api/health/peReport/peReportPrint', data })
}
// 个人体检报告-报告人员列表-根据单位查询
export const getPeReportPersonalListByUnit = (data) => {
  return request.post({ url: '/health-api/health/peReport/getPeReportPersonalListByUnit', data })
}
// 个人体检报告-报告人员列表-根据时间查询
export const getPeReportPersonalListByDate = (data) => {
  return request.post({ url: '/health-api/health/peReport/getPeReportPersonalListByDate', data })
}
// 个人体检报告-报告人员列表-根据时间查询
export const getPeReportPersonalListByPeId = (data) => {
  return request.post({ url: '/health-api/health/peReport/getPeReportPersonalListByPeId', data })
}
// 个人体检-主检医生审核-体检报告
export const finalReport = (data) => {
  return request.post({ url: '/health-api/health/audit/finalReport', data })
}
//pdf上传
// export const pdfUpload = (data) => {
//   return request.post({ url: '/health-api/health/uploadReport/pdfUpload', data })
// }
export const minioPdfUpload = (data) => {
  return request.upload({ url: '/health-api/health/uploadReport/minioPdfUpload', data })
}
//体检报告信息上传
export const examReportInfo = (data) => {
  return request.post({
    url: '/health-api/health/uploadReport/examReportInfo',
    data
  })
}
