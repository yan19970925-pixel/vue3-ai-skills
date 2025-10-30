import request from '@/config/axios'
// 获取系统时间
export const getSystemDateTime = () => {
  return request.get({ url: '/admin-api/infra/config/getSystemDateTime' })
}
// 单位体检-单位登记-获取最大单位编码
export const getMaxUnitCode = (data: any) => {
  return request.post({ url: '/health-api/health/peUnitVisit/getMaxUnitCode', data })
}
// 单位体检-单位登记-获取最大组号
export const getMaxGroupNo = (data: any) => {
  return request.post({ url: '/health-api/health/peUnitVisit/getMaxGroupNo', data })
}
// 单位体检-单位登记-获取单位信息
export const getUnitInfo = (data: any) => {
  return request.post({ url: '/health-api/health/peUnitVisit/getUnitPeInfoList', data })
}
// 单位体检-单位登记-单位和分组保存
export const updateUnitAndUnitGroup = (data: any) => {
  return request.post({ url: '/health-api/health/peUnitVisit/updateUnitAndUnitGroup', data })
}
// 单位体检-单位登记-删除分组
export const deleteGroup = (data: any) => {
  return request.post({ url: '/health-api/health/peUnitVisit/deleteGroup', data })
}
// 单位体检-单位登记-删除预约
export const deleteAppointment = (data: any) => {
  return request.post({ url: '/health-api/health/peUnitVisit/deleteAppointment', data })
}
// 单位体检-单位登记-预约体检
export const appointmentExam = (data: any) => {
  return request.post({ url: '/health-api/health/peUnitVisit/appointmentExam', data })
}
// 单位体检-单位登记-保存
export const appointSaveAll = (data: any) => {
  return request.post({ url: '/health-api/health/peUnitVisit/saveAll', data })
}

//批量登记
// 资格调整
export const updatePePersonalUnit = (data: any) => {
  return request.post({ url: '/health-api/health/pePersonalBatchVisit/updatePePersonalUnit', data })
}
// 保存
export const savePeUnitPersonal = (data: any) => {
  return request.post({ url: '/health-api/health/pePersonalBatchVisit/savePeUnitPersonal', data })
}
// 导入
export const importPePersonal = (data: any) => {
  return request.post({ url: '/health-api/health/pePersonalBatchVisit/importPePersonal', data })
}
// 查询单位人员列表
export const getPeUnitPersonalList = (data: any) => {
  return request.post({
    url: '/health-api/health/pePersonalBatchVisit/getPeUnitPersonalList',
    data
  })
}
// 单位选择查询
export const getPeUnitList = (data: any) => {
  return request.post({ url: '/health-api/health/pePersonalBatchVisit/getPeUnitList', data })
}
// 根据单位编码查询单位
export const getPeUnitDict = (data: any) => {
  return request.post({ url: '/health-api/health/pePersonalBatchVisit/getPeUnitDict', data })
}
// 导出
export const exportPePersonal = (data: any) => {
  return request.downloadByPOST({
    url: '/health-api/health/pePersonalBatchVisit/exportPePersonal',
    data
  })
}

//单位体检-单位登记-获取单位信息
export const getBatchAppointUnitInfo = (data: any) => {
  return request.post({
    url: '/health-api/health/peUnitBatchAppoint/getBatchAppointUnitInfo',
    data
  })
}
//单位体检-单位登记-预约
export const batchAppoint = (data: any) => {
  return request.post({
    url: '/health-api/health/peUnitBatchAppoint/batchAppoint',
    data
  })
}
//单位体检-单位登记-批量增加项目
export const batchAddItems = (data: any) => {
  return request.post({
    url: '/health-api/health/peUnitBatchAppoint/batchAddItems',
    data
  })
}
//单位体检-单位登记-批量删除项目
export const batchDelItems = (data: any) => {
  return request.post({
    url: '/health-api/health/peUnitBatchAppoint/batchDelItems',
    data
  })
}
//单位体检-单位登记-过滤查询
export const peUnitVisitFilter = (data: any) => {
  return request.post({
    url: '/health-api/health/peUnitBatchAppoint/peUnitVisitFilter',
    data
  })
}
//单位体检-查询套餐内包含的项目
export const getPeSetItemSelectedList = (data: any) => {
  return request.post({
    url: '/health-api/health/itemAssemSet/getPeSetItemSelectedList',
    data
  })
}
// 单位体检-单位登记-导出
export const exportPeUnitPersonal = (data: any) => {
  return request.downloadByPOST({
    url: '/health-api/health/peUnitBatchAppoint/exportPeUnitPersonal',
    data
  })
}

// 体检单位本次体检人员列表
export const getPeUnitVisitPersonalList = (data: any) => {
  return request.post({
    url: '/health-api/health/peUnitInfoQuery/getPeUnitVisitPersonalList',
    data
  })
}
// 按体检单位体检项目查询
export const getPeUnitItemCountList = (data: any) => {
  return request.post({
    url: '/health-api/health/peUnitInfoQuery/getPeUnitItemCountList',
    data
  })
}
// 按体检单位个人查询体检项目
export const getPeUnitPersonalItemCountList = (data: any) => {
  return request.post({
    url: '/health-api/health/peUnitInfoQuery/getPeUnitPersonalItemCountList',
    data
  })
}
// 按项目查询体检费用
export const getPeUnitItemBillCountList = (data: any) => {
  return request.post({
    url: '/health-api/health/peUnitInfoQuery/getPeUnitItemBillCountList',
    data
  })
}
// 按个人查询体检费用
export const getPeUnitPersonalBillCountList = (data: any) => {
  return request.post({
    url: '/health-api/health/peUnitInfoQuery/getPeUnitPersonalBillCountList',
    data
  })
}
// 导出体检单位本次体检人员列表
export const exportPeUnitVisitPersonalList = (data: any) => {
  return request.downloadByPOST({
    url: '/health-api/health/peUnitInfoQuery/exportPeUnitVisitPersonalList',
    data
  })
}
// 导出按体检单位体检项目查询
export const exportPeUnitItemCountList = (data: any) => {
  return request.downloadByPOST({
    url: '/health-api/health/peUnitInfoQuery/exportPeUnitItemCountList',
    data
  })
}
// 导出按体检单位个人查询体检项目
export const exportPeUnitPersonalItemCountList = (data: any) => {
  return request.downloadByPOST({
    url: '/health-api/health/peUnitInfoQuery/exportPeUnitPersonalItemCountList',
    data
  })
}
// 导出按项目查询体检费用
export const exportPeUnitItemBillCountList = (data: any) => {
  return request.downloadByPOST({
    url: '/health-api/health/peUnitInfoQuery/exportPeUnitItemBillCountList',
    data
  })
}
// 导出按个人查询体检费用
export const exportPeUnitPersonalBillCountList = (data: any) => {
  return request.downloadByPOST({
    url: '/health-api/health/peUnitInfoQuery/exportPeUnitPersonalBillCountList',
    data
  })
}
// 导出按个人查询体检费用
export const peUnitBillUploadHis = (data: any) => {
  return request.post({
    url: '/health-api/health/peUnitBill/peUnitBillUploadHis',
    data
  })
}
//单位体检-费用明细list
export const getPeUnitBill = (data: any) => {
  return request.post({
    url: '/health-api/health/peUnitBill/getPeUnitBill',
    data
  })
}
//单位体检-费用明细修改
export const updateUnitBillDetail = (data: any) => {
  return request.post({
    url: '/health-api/health/peUnitBill/updateUnitBillDetail',
    data
  })
}
