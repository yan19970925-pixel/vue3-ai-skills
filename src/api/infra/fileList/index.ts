import request from '@/config/axios'
const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL
export interface FilePageReqVO extends PageParam {
  path?: string
  type?: string
  createTime?: Date[]
}

// 查询文件列表
export const getFilePage = (params: FilePageReqVO) => {
  return request.get({ url: ADMIN_API_URL + '/infra/file/page', params })
}

// 删除文件
export const deleteFile = (id: number) => {
  return request.delete({ url: ADMIN_API_URL + '/infra/file/delete?id=' + id })
}
