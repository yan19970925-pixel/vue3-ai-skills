import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL

export type OperateLogVO = {
  id: number
  userNickname: string
  traceId: string
  userId: number
  module: string
  name: string
  type: number
  content: string
  exts: Map<String, Object>
  requestMethod: string
  requestUrl: string
  userIp: string
  userAgent: string
  javaMethod: string
  javaMethodArgs: string
  startTime: Date
  duration: number
  resultCode: number
  resultMsg: string
  resultData: string
}

// 查询操作日志列表
export const getOperateLogPage = (params: PageParam) => {
  return request.get({ url: ADMIN_API_URL + '/system/operate-log/page', params })
}
// 导出操作日志
export const exportOperateLog = (params) => {
  return request.download({ url: ADMIN_API_URL + '/system/operate-log/export', params })
}
