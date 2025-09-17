import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL
export interface ApiAccessLogVO {
  id: number
  traceId: string
  userId: number
  userType: number
  applicationName: string
  requestMethod: string
  requestParams: string
  requestUrl: string
  userIp: string
  userAgent: string
  beginTime: Date
  endTIme: Date
  duration: number
  resultCode: number
  resultMsg: string
  createTime: Date
}

// 查询列表API 访问日志
export const getApiAccessLogPage = (params: PageParam) => {
  return request.get({ url: ADMIN_API_URL + '/infra/api-access-log/page', params })
}

// 导出API 访问日志
export const exportApiAccessLog = (params) => {
  return request.download({ url: ADMIN_API_URL + '/infra/api-access-log/export-excel', params })
}
