import request from '@/config/axios'

/**
 *
 * @param data 个人体检-打印指引单
 * @returns
 */

// 两癌筛查-记录列表
export const labTestReport = (data) => {
  return request.post({ url: '/health-api/health/audit/labTestReport', data })
}
