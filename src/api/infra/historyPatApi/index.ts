import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL

interface historyParams {
  patientId: string
}
// 查询当前患者就诊历史信息
export const getHistoryData = (data: historyParams) => {
  return request.post({ url: ADMIN_API_URL + '/infra/info/tList', data })
}
