import request from '@/config/axios'

// 路由
export const getAsysNameRoutesApi = (data: string) => {
  return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
}
/**
 *
 * @param data 系统设置--体检套餐设置
 * @returns
 */
// 体检套餐查询
export const getPeSetList = (data) => {
  return request.post({ url: '/health-api/health/itemAssemSet/getPeSetList', data })
}
// 体检套餐待选项目组合查询
export const getPeSetItemUnselectList = (data) => {
  return request.post({ url: '/health-api/health/itemAssemSet/getPeSetItemUnselectList', data })
}
// 体检套餐已选项目组合查询
export const getPeSetItemSelectedList = (data) => {
  return request.post({ url: '/health-api/health/itemAssemSet/getPeSetItemSelectedList', data })
}
// 体检套餐移除项目组合
export const removePeSetVsItem = (data) => {
  return request.post({ url: '/health-api/health/itemAssemSet/removePeSetVsItem', data })
}
// 体检套餐移除项目组合
export const addPeSetVsItem = (data) => {
  return request.post({ url: '/health-api/health/itemAssemSet/addPeSetVsItem', data })
}
// 体检套餐，项目组合类别查询
export const getPeItemAssemClass = (data = 'application/x-www-form-urlencoded') => {
  return request.post({ url: '/health-api/health/itemAssemSet/getPeItemAssemClass', data })
}
// 体检套餐信息保存（套餐代码有值则修改，为空则新增）
export const savePeSet = (data) => {
  return request.post({ url: '/health-api/health/itemAssemSet/savePeSet', data })
}
// 体检套餐删除
export const delPeSet = (data) => {
  return request.post({ url: '/health-api/health/itemAssemSet/delPeSet', data })
}
// 生成套餐编码
export const getMaxSetCode = (data = 'application/x-www-form-urlencoded') => {
  return request.post({ url: '/health-api/health/itemAssemSet/getMaxSetCode', data })
}
// 获取体检人员信息
export const getPatInfo = (data) => {
  return request.post({ url: '/health-api/health/patInfo/getPatInfo', data })
}
// 查询字典
export const queryDictByConfig = (data) => {
  return request.post({
    url: '/admin-api/infra/inputSetting/queryDictByConfig',
    data
  })
}
