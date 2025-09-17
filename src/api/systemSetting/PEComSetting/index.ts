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
// 体检项目组合信息保存（组合代码有值则修改，为空则新增）
export const savePeItemAssembled = (data) => {
  return request.post({ url: '/health-api/health/itemAssembled/savePeItemAssembled', data })
}
// 体检项目组合查询
export const getPeItemAssemList = (data) => {
  return request.post({ url: '/health-api/health/itemAssembled/getPeItemAssembledList', data })
}
// 项目设置-项目查询
export const getPeItemList = (data) => {
  return request.post({ url: '/health-api/health/item/getPeItemList', data })
}
// 体检项目组合删除
export const delPeItemAssembled = (data) => {
  return request.post({ url: '/health-api/health/itemAssembled/delPeItemAssembled', data })
}
// 体检科室查询
export const getPeDeptList = (data) => {
  return request.post({ url: '/health-api/health/doctor/getPeDeptList', data })
}
// 体检套餐待选项目组合查询
export const getPeSetItemUnselectList = (data) => {
  return request.post({ url: '/health-api/health/itemAssembled/getPeAssemItemUnselectList', data })
}
// 体检套餐已选项目组合查询
export const getPeSetItemSelectedList = (data) => {
  return request.post({ url: '/health-api/health/itemAssembled/getPeAssemItemSelectedList', data })
}
// 体检项目组合移除项目
export const removePeSetVsItem = (data) => {
  return request.post({ url: '/health-api/health/itemAssembled/removePeItemVsAssem', data })
}
// 体检项目组合添加项目
export const addPeSetVsItem = (data) => {
  return request.post({ url: '/health-api/health/itemAssembled/addPeAssemVsItem', data })
}

// 组合项目类别查询
export const getPeItemAssemClassList = (data = 'application/x-www-form-urlencoded') => {
  return request.post({ url: '/health-api/health/itemAssembled/getPeItemAssemClassList', data })
}
// 检验试管查询
export const getPeTestTubeDictList = (data) => {
  return request.post({ url: '/health-api/health/dict/getPeTestTubeDictList', data })
}
// 检验试管查询
export const getPeChartDictList = (data) => {
  return request.post({ url: '/health-api/health/dict/getPeChartDictList', data })
}
// 组合项目类别保存
export const savePeItemAssemClass = (data) => {
  return request.post({ url: '/health-api/health/itemAssembled/savePeItemAssemClass', data })
}
// 组合项目类别删除
export const delPeItemAssemClass = (data) => {
  return request.post({ url: '/health-api/health/itemAssembled/delPeItemAssemClass', data })
}
// 项目组合划价对照-对应的价表项目查询
export const getPeAssemVsPrice = (data) => {
  return request.post({ url: '/health-api/health/itemHis/getPeAssemVsPrice', data })
}
// 项目组合划价对照-同步His价表查询
export const getHisItemPrice = (data) => {
  return request.post({ url: '/health-api/health/itemHis/getHisItemPrice', data })
}
// 项目组合划价对照-保存
export const savePeAssemVsPrice = (data) => {
  return request.post({ url: '/health-api/health/itemHis/savePeAssemVsPrice', data })
}
// 导入HIS检查检验项目-体检分类查询
export const getPeItemHisClassList = (data) => {
  return request.post({ url: '/health-api/health/itemHis/getPeItemHisClassList', data })
}
// 导入HIS检查检验项目-His项目查询
export const getPeClinicItemHisPage = (data) => {
  return request.post({ url: '/health-api/health/itemHis/getPeClinicItemHisPage', data })
}
// 导入HIS检查检验项目-确认导入（取消导入调用体检项目组合删除接口）
export const importPeClinicItemHis = (data) => {
  return request.post({ url: '/health-api/health/itemHis/importPeClinicItemHis', data })
}

// 项目组合与诊疗项目对照-保存
export const savePeAssemVsClinic = (data) => {
  return request.post({ url: '/health-api/health/itemHis/savePeAssemVsClinic', data })
}

// 项目组合与诊疗项目对照-查询
export const getPeAssemVsClinic = (data) => {
  return request.post({ url: '/health-api/health/itemHis/getPeAssemVsClinic', data })
}

// 项目组合划价对照-对应的诊疗项目查询
export const getPeAssemVsPriceClinic = (data) => {
  return request.post({ url: '/health-api/health/itemHis/getPeAssemVsPriceClinic', data })
}

// 项目组合划价对照-对应的诊疗项目查询
export const getPeItemAssembledNo = (data) => {
  return request.post({ url: '/health-api/health/itemAssembled/getPeItemAssembledNo', data })
}

// export const getPeItemAssembledNo = (data: string) => {
//   return request.get({ url: '/admin-api/system/auth/sysName-menus?sysName=' + data })
// }
