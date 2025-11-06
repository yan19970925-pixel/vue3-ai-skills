import request from '@/config/axios'

/**
 *
 * @param data 个人体检
 * @returns
 */
// 单位列表选择查询
export const getPeUnitList = (data: any) => {
  return request.post({ url: '/health-api/health/pePersonalBatchVisit/getPeUnitList', data })
}
// 单位选择查询（）
export const getUnitInfo = (data: any) => {
  return request.post({ url: '/health-api/health/patInfo/getUnitInfo', data })
}
// 根据单位编码查询单位
export const getPeUnitDict = (data: any) => {
  return request.post({ url: '/health-api/health/pePersonalBatchVisit/getPeUnitDict', data })
}
// 上传用户个人头像
export const updatePeAvatar = (data) => {
  return request.post({ url: '/health-api/health/patInfo/updatePeAvatar', data })
}
// 获取体检主记录列表
export const selectPeVisitList = (data) => {
  return request.post({ url: '/health-api/health/peVisit/selectPeVisitList', data })
}
// 获取最大peId
export const getMaxPeId = (data) => {
  return request.post({ url: '/health-api/health/patInfo/getMaxPeId', data })
}
// 查询费用分类字典
export const getPeRcptFeeDictList = (data) => {
  return request.post({ url: '/health-api/health/dict/getPeRcptFeeDictList', data })
}
// 查询字典
export const queryDictByConfig = (data) => {
  return request.post({
    url: '/admin-api/infra/inputSetting/queryDictByConfig',
    data
  })
}
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
// 体检项目组合查询
export const getPeItemAssembledList = (data) => {
  return request.post({ url: '/health-api/health/itemAssembled/getPeItemAssembledList', data })
}
//个人登记保存
export const createPePatInfo = (data) => {
  return request.post({ url: '/health-api/health/patInfo/createPePatInfo', data })
}
//个人检登记-上传用户个人头像
//根据体检号获取患者基本信息
export const getPePatInfo = (data) => {
  return request.post({ url: '/health-api/health/patInfo/getPePatInfo', data })
}
//个人体检登记-首页统计信息信息
export const homePageCountInfo = (data) => {
  return request.post({ url: '/health-api/health/homePage/homePageCountInfo', data })
}
//个人体检-分科医生检查-查询异常项目名称
export const getPeAbnormalItemList = (data) => {
  return request.post({ url: '/health-api/health/peDoctorCheck/getPeAbnormalItemList', data })
}
//首页未完成项目统计
export const nofinishedItemCount = (data) => {
  return request.post({ url: '/health-api/health/countReport/nofinishedItemCount', data })
}
