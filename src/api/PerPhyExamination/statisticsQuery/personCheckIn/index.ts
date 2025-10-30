import request from '@/config/axios'

/**
 *
 * @param data 查询统计--
 * @returns
 */

// 个人体检-平均完成时间统计
export const getExamFinishTimeCount = (data) => {
  return request.post({ url: '/health-api/health/peVisit/getExamFinishTimeCount', data })
}
