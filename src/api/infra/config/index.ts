import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL
export interface ConfigVO {
  id: number | undefined
  category: string
  name: string
  key: string
  value: string
  type: number
  visible: boolean
  remark: string
  createTime: Date
}

export interface ConfigExportReqVO {
  name?: string
  key?: string
  type?: number
  createTime?: Date[]
}

// 查询参数列表
export const getConfigPage = (params: PageParam) => {
  return request.get({ url: ADMIN_API_URL + '/infra/config/page', params })
}

// 查询参数详情
export const getConfig = (id: number) => {
  return request.get({ url: ADMIN_API_URL + '/infra/config/get?id=' + id })
}

// 根据参数键名查询参数值
export const getConfigKey = (configKey: string) => {
  return request.get({ url: ADMIN_API_URL + '/infra/config/get-value-by-key?key=' + configKey })
}

// 新增参数
export const createConfig = (data: ConfigVO) => {
  return request.post({ url: ADMIN_API_URL + '/infra/config/create', data })
}

// 修改参数
export const updateConfig = (data: ConfigVO) => {
  return request.put({ url: ADMIN_API_URL + '/infra/config/update', data })
}

// 删除参数
export const deleteConfig = (id: number) => {
  return request.delete({ url: ADMIN_API_URL + '/infra/config/delete?id=' + id })
}

// 导出参数
export const exportConfig = (params: ConfigExportReqVO) => {
  return request.download({ url: ADMIN_API_URL + '/infra/config/export', params })
}
