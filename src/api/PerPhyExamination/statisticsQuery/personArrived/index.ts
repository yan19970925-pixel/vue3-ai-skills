import request from '@/config/axios'

/**
 *
 * @param data 查询统计--查询复检计划列表
 * @returns
 */

// 个人体检-指引单-查询
export const getReCheckPlanList = (data) => {
  return request.post({ url: '/health-api/health/reCheck/getReCheckPlanList', data })
}
