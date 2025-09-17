import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}

// 体检中心基本信息保存
export const saveCenterConfig = (data) => {
  return request.post({ url: '/health-api/health/config/saveCenterConfig', data })
}
// 外部协作系统信息查询
export const getPeCooperationSystemList = (data) => {
  return request.post({ url: '/health-api/health/config/getPeCooperationSystemList', data })
}
// 体检中心基本信息查询
export const getCenterConfig = (data) => {
  return request.post({ url: '/health-api/health/config/getCenterConfig', data })
}
