import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL
export interface FileClientConfig {
  basePath: string
  host?: string
  port?: number
  username?: string
  password?: string
  mode?: string
  endpoint?: string
  bucket?: string
  accessKey?: string
  accessSecret?: string
  domain: string
}

export interface FileConfigVO {
  id: number
  name: string
  storage: number
  master: boolean
  visible: boolean
  config: FileClientConfig
  remark: string
  createTime: Date
}

// 查询文件配置列表
export const getFileConfigPage = (params: PageParam) => {
  return request.get({ url: ADMIN_API_URL + '/infra/file-config/page', params })
}

// 查询文件配置详情
export const getFileConfig = (id: number) => {
  return request.get({ url: ADMIN_API_URL + '/infra/file-config/get?id=' + id })
}

// 更新文件配置为主配置
export const updateFileConfigMaster = (id: number) => {
  return request.put({ url: ADMIN_API_URL + '/infra/file-config/update-master?id=' + id })
}

// 新增文件配置
export const createFileConfig = (data: FileConfigVO) => {
  return request.post({ url: ADMIN_API_URL + '/infra/file-config/create', data })
}

// 修改文件配置
export const updateFileConfig = (data: FileConfigVO) => {
  return request.put({ url: ADMIN_API_URL + '/infra/file-config/update', data })
}

// 删除文件配置
export const deleteFileConfig = (id: number) => {
  return request.delete({ url: ADMIN_API_URL + '/infra/file-config/delete?id=' + id })
}

// 测试文件配置
export const testFileConfig = (id: number) => {
  return request.get({ url: ADMIN_API_URL + '/infra/file-config/test?id=' + id })
}
