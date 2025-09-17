import request from '@/config/axios'
// 查询字典
export const queryDictByConfig = (data) => {
  return request.post({
    url: '/admin-api/infra/inputSetting/queryDictByConfig',
    data
  })
}
// 查询消息记录
export const queryMessage = (data) => {
  return request.post({ url: '/admin-api/system/message/queryMessage', data })
}
// 更新消息读取状态
export const updateMessageReadStatus = (data) => {
  return request.post({ url: '/admin-api/system/message/updateMessageReadStatus', data })
}
// 查询会诊主记录
export const queryConsultationMaster = (data) => {
  return request.post({ url: '/outp-api/outpD/consultation/queryConsultationMaster', data })
}
// 查询会诊详细
export const queryConsultationDetail = (data) => {
  return request.post({ url: '/outp-api/outpD/consultation/queryConsultationDetail', data })
}
// 提交会诊意见
export const submitConsultationIdea = (data) => {
  return request.post({ url: '/outp-api/outpD/consultation/submitConsultationIdea', data })
}

// 查询未读消息记录
export const queryMessageNoRead = async (data) => {
  return await request.post({ url: '/admin-api/system/message/queryMessageNoRead', data })
}
// 获取通知公告列表
export const getNoticePage = (params) => {
  return request.get({ url: '/admin-api/system/notice/page', params })
}
// 获取通知公告详情
export const queryNoticeDetail = (params) => {
  return request.get({ url: '/admin-api/system/notice/get', params })
}
