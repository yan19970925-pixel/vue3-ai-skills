import request from '@/config/axios'

/**
 *
 * @param data 个人体检--总监分诊台
 * @returns
 */

// 个人体检-主检医生审核-提取人员
export const getPePatList = (data) => {
  return request.post({ url: '/health-api/health/audit/getPePatList', data })
}
// 个人体检-主检医生审核-提取
export const getExaminePatList = (data) => {
  return request.post({ url: '/health-api/health/audit/getExaminePatList', data })
}

// 个人体检-主检医生审核-分科审核
export const cbAuditDept = (data) => {
  return request.post({ url: '/health-api/health/audit/cbAuditDept', data })
}
// 个人体检-主检医生审核-初步审核
export const firstAudit = (data) => {
  return request.post({ url: '/health-api/health/audit/firstAudit', data })
}
// 个人体检-主检医生审核-最终审核
export const cbLastAuditDept = (data) => {
  return request.post({ url: '/health-api/health/audit/cbLastAuditDept', data })
}
// 个人体检-主检医生审核-保存
export const saveAudit = (data) => {
  return request.post({ url: '/health-api/health/audit/saveAudit', data })
}
// 个人体检-主检医生审核-体检报告
export const finalReport = (data) => {
  return request.post({ url: '/health-api/health/audit/finalReport', data })
}
// 个人体检-主检医生审核-汇总审核-历史记录
export const historyExam = (data) => {
  return request.post({ url: '/health-api/health/audit/historyExam', data })
}
// 科普知识-查询
export const getPeKnowledge = (data) => {
  return request.post({ url: '/health-api/health/advice/getPeKnowledge', data })
}
// 指导建议知识-查询
export const getPeSuggestItem = (data) => {
  return request.post({ url: '/health-api/health/advice/getPeSuggestItem', data })
}

// 个人体检-主检医生审核-修改完成状态
export const updateFinishedSign = (data) => {
  return request.post({ url: '/health-api/health/audit/updateFinishedSign', data })
}
// 个人体检-主检医生审核-修改完成状态列表
export const updateFinishedSignList = (data) => {
  return request.post({ url: '/health-api/health/audit/updateFinishedSignList', data })
}
// 个人体检-主检医生审核-取消分科审核
export const cancleCbAuditDept = (data) => {
  return request.post({ url: '/health-api/health/audit/cancleCbAuditDept', data })
}
//查询患者是否有未做完的体检项目
export const getNoFinishItem = (data) => {
  return request.post({ url: '/health-api/health/audit/getNoFinishItem', data })
}
//查询患者历史体检数据对比
export const pastExamResultList = (data) => {
  return request.post({ url: '/health-api/health/audit/pastExamResultList', data })
}
//撤销终审
export const updateResultStatus = (data) => {
  return request.post({ url: '/health-api/health/audit/updateResultStatus', data })
}
//添加复检计划
export const updateReCheckPlan = (data) => {
  return request.post({ url: '/health-api/health/reCheck/updateReCheckPlan', data })
}
