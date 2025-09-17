import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL

export interface NotifyTemplateVO {
  id: number
  name: string
  code: string
  content: string
  type: number
  params: string
  status: number
  remark: string
}

export interface NotifyTemplatePageReqVO extends PageParam {
  name?: string
  code?: string
  status?: number
  createTime?: Date[]
}

export interface NotifySendReqVO {
  userId: number
  templateCode: string
  templateParams: Map<String, Object>
}

// 查询站内信模板列表
export const getNotifyTemplatePage = async (params: PageParam) => {
  return await request.get({ url: ADMIN_API_URL + '/system/notify-template/page', params })
}

// 查询站内信模板详情
export const getNotifyTemplate = async (id: number) => {
  return await request.get({ url: ADMIN_API_URL + '/system/notify-template/get?id=' + id })
}

// 新增站内信模板
export const createNotifyTemplate = async (data: NotifyTemplateVO) => {
  return await request.post({ url: ADMIN_API_URL + '/system/notify-template/create', data })
}

// 修改站内信模板
export const updateNotifyTemplate = async (data: NotifyTemplateVO) => {
  return await request.put({ url: ADMIN_API_URL + '/system/notify-template/update', data })
}

// 删除站内信模板
export const deleteNotifyTemplate = async (id: number) => {
  return await request.delete({ url: ADMIN_API_URL + '/system/notify-template/delete?id=' + id })
}

// 发送站内信
export const sendNotify = (data: NotifySendReqVO) => {
  return request.post({ url: ADMIN_API_URL + '/system/notify-template/send-notify', data })
}
