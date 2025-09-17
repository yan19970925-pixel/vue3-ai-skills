import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 系统设置--体检项目组合
 * @returns
 */
// 项目设置-项目组合保存
export const savePeItemDict = (data) => {
  return request.post({ url: '/health-api/health/item/savePeItemDict', data })
}
// 项目设置-项目组合查询（分配有项目的组合），入参科室编码
export const getPeItemAssemList = (data) => {
  return request.post({ url: '/health-api/health/item/getPeItemAssemList', data })
}

// 项目设置-获取最大的项目代码
export const getMaxPeItemDictNo = (data) => {
  return request.post({ url: '/health-api/health/item/getMaxPeItemDictNo', data })
}
// 项目设置-项目查询
export const getPeItemList = (data) => {
  return request.post({ url: '/health-api/health/item/getPeItemList', data })
}
// 项目设置-项目删除
export const delPeItemDict = (data) => {
  return request.post({ url: '/health-api/health/item/delPeItemDict', data })
}
// 体检科室查询
export const getPeDeptList = (data) => {
  return request.post({ url: '/health-api/health/doctor/getPeDeptList', data })
}
