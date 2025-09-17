import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 系统设置--科室设置
 * @returns
 */

// 体检科室查询
export const getPeDeptList = (data = 'application/x-www-form-urlencoded') => {
  return request.post({ url: '/health-api/health/doctor/getPeDeptList', data })
}

// 体检科室保存
export const savePeDeptDict = (data) => {
  return request.post({ url: '/health-api/health/doctor/savePeDeptDict', data })
}

// 体检科室删除
export const delPeDeptDict = (data) => {
  return request.post({ url: '/health-api/health/doctor/delPeDeptDict', data })
}

// 组合项目类别查询
export const getPeItemAssemClassList = (data = 'application/x-www-form-urlencoded') => {
  return request.post({ url: '/health-api/health/itemAssembled/getPeItemAssemClassList', data })
}

// 组合费用类别查询
export const getPeRcptFeeDictList = (data = 'application/x-www-form-urlencoded') => {
  return request.post({ url: '/health-api/health/dict/getPeRcptFeeDictList', data })
}
// 保存费用类别查询
export const savePeRcptFeeDict = (data = 'application/x-www-form-urlencoded') => {
  return request.post({ url: '/health-api/health/dict/savePeRcptFeeDict', data })
}
// 删除费用类别查询
export const delPeRcptFeeDict = (data) => {
  return request.post({ url: '/health-api/health/dict/delPeRcptFeeDict', data })
}

// 系统合作查询
export const getPeCooperationSystemList = (
  data = {
    sysClass: 'HIS,PEIS',
    sysClassGroup: []
  }
) => {
  return request.post({ url: '/health-api/health/config/getPeCooperationSystemList', data })
}
