import request from '@/config/axios'

/**
 *
 * @param data 团检数据导出查询
 * @returns
 */

// 查询单位
export const getPeUnitResultList = (data) => {
  return request.post({ url: '/health-api/health/peUnitResult/getPeUnitResultList', data })
}
//单位报告打印预览
export const peUnitReportPreview = (data) => {
  return request.post({ url: '/health-api/health/peUnitResult/peUnitReportPreview', data })
}
