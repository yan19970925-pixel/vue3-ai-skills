import request from '@/config/axios'

/**
 *
 * @param data 个人体检-打印指引单
 * @returns
 */

// 个人体检-指引单-查询
export const selectPeGuidSheetList = (data) => {
  return request.post({ url: '/health-api/health/personChart/selectPeGuidSheetList', data })
}
// 个人体检-指引单-打印
export const selectPeGuidSheetPrint = (data) => {
  return request.post({ url: '/health-api/health/personChart/selectPeGuidSheetPrint', data })
}
// 个人体检-检验申请单-打印
export const printLabSheet = (data) => {
  return request.post({ url: '/health-api/health/personChart/printLabSheet', data })
}
// 个人体检-个人条码-打印
export const printPersonalBar = (data) => {
  return request.post({ url: '/health-api/health/personChart/printPersonalBar', data })
}
// 个人体检-检验条码-打印
export const printBarCode = (data) => {
  return request.post({ url: '/health-api/health/personChart/printBarCode', data })
}
// 个人体检-检查申请单-打印
export const printExamSheet = (data) => {
  return request.post({ url: '/health-api/health/personChart/printExamSheet', data })
}
//查询健康证明信息
export const healthCertificateInfo = (data) => {
  return request.post({ url: '/health-api/health/healthCertificate/healthCertificateInfo', data })
}
//健康证明信息上传
export const healthCertificateInfoUpload = (data) => {
  return request.post({
    url: '/health-api/health/healthCertificate/healthCertificateInfoUpload',
    data
  })
}
//个人体检-报道-删除预约
export const peSign = (data) => {
  return request.post({
    url: '/health-api/health/personChart/peSign',
    data
  })
}
//健康证明pdf上传
export const upPdfEmployees = (data) => {
  return request.upload({
    url: '/health-api/health/healthCertificate/upPdfEmployees',
    data
  })
}
// 个人体检-主检医生审核-查询完成状态列表
export const updateFinishedSignList = (data) => {
  return request.post({ url: '/health-api/health/audit/updateFinishedSignList', data })
}
//回收指引单
export const recyclePeGuidSheet = (data) => {
  return request.post({ url: '/health-api/health/personChart/recyclePeGuidSheet', data })
}
//回收指引单
export const getUnitInfo = (data) => {
  return request.post({ url: '/health-api/health/peUnitVisit/getUnitInfo', data })
}
